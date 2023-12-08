module GMachine exposing
  ( createMachine, step, runMachine
  , RuntimeResult(..), RuntimeError(..), GMachine
  , GNode(..), GGraph, HeapAddr
  , getChildren
  , getStack, getCodePtr
  )

import Basics.Extra exposing (flip)
import Dict as Dict exposing (Dict)
import Result exposing (Result(..))
import Funcs as F
import List.Extra
import Backend exposing (..)
import Result.Extra
import Set exposing (Set)
import Maybe.Extra
import ZipList exposing (ZipList)
import Monocle.Lens as Lens exposing (Lens)
import Shape exposing (stack)
import List.Nonempty exposing (Nonempty(..))

{-| this module implements the runtime behavior of the G-Machine

Augustsson, Lennart. "A compiler for lazy ML." 1984.

A great short tutorial on G-Machine implementation: https://amelia.how/posts/the-gmachine-in-detail.html

A longer tutorial: Peyton Jones, S. L. (1987). The implementation of Functional Programming Languages. Prentice-Hall.
-}

type alias HeapAddr = Int

{-| type of nodes that can exist in the graph
-}
type GNode
  = GApp HeapAddr HeapAddr
  | GFunc Global
  | GInt Int
  | GHole


type alias GGraph = Dict HeapAddr GNode

type alias GStack = List HeapAddr

type alias CodePtr = ZipList GCode

type alias Frame = { stack : GStack, codePtr : CodePtr, function : Global }

type GContext
  = StackFrame Frame
  | Unwinding GStack

type alias GDump = List Frame

type alias GMachine =
  { ctx : GContext
  , graph : GGraph
  , dump  : GDump
  , builtins : Env
  , env   : Env
  , nodeCounter : Int -- used for uniquely identifying nodes
  }

isUnwinding : GMachine -> Bool
isUnwinding gmachine = case gmachine.ctx of
  Unwinding _ -> True
  _ -> False

{-| access the stack from gmachine context
-}
accessStack : Lens GContext GStack
accessStack = Lens
  (\ctx -> case ctx of
    StackFrame frame -> frame.stack
    Unwinding stack -> stack
  ) 
  (\stack ctx -> case ctx of
    StackFrame frame -> StackFrame {frame | stack=stack}
    Unwinding _ -> Unwinding stack
  )

{-| access the codePtr from current stack frame
or return constant UNWIND instruction if machine is unwinding
-}
accessCode : Lens GContext CodePtr
accessCode = Lens
  (\ctx -> case ctx of
    StackFrame frame -> frame.codePtr
    Unwinding _ -> ZipList.singleton UNWIND
  )
  (\codePtr ctx -> case ctx of
    StackFrame frame -> StackFrame {frame | codePtr=codePtr}
    Unwinding _ -> ctx
  )

accessCtx : Lens GMachine GContext
accessCtx = Lens .ctx (\ctx machine -> {machine | ctx=ctx})

codePtrLens : Lens GMachine CodePtr
codePtrLens = Lens.compose accessCtx accessCode

stackLens : Lens GMachine GStack
stackLens = Lens.compose accessCtx accessStack

getStack : GMachine -> GStack
getStack = stackLens.get

getCodePtr : GMachine -> CodePtr
getCodePtr = codePtrLens.get

type RuntimeError
  = UnknownName String
  | NodeDoesNotExist HeapAddr
  | EmptyStack
  | OutOfBoundsStack
  | MissingArgument
  | UnexpectedNode HeapAddr GNode
  | CannotSaveFrameWhileUnwinding

{-| push a node reference to the stack
-}
push : HeapAddr -> GMachine -> GMachine
push node = Lens.modify stackLens ((::) node)

{-| pop k items from the stack
-}
pop : Int -> GMachine -> GMachine
pop num = Lens.modify stackLens (List.drop num)

popDump : GMachine -> GMachine
popDump gmachine = {gmachine | dump=List.drop 1 gmachine.dump}

incCodePtr : GMachine -> GMachine
incCodePtr = Lens.modify codePtrLens ZipList.forward 

currentInstruction : GMachine -> GCode
currentInstruction = getCodePtr >> ZipList.current

{-| save the current context to the dump to be restored later
-}
saveFrame : GMachine -> Result RuntimeError GMachine
saveFrame gmachine = case gmachine.ctx of
  Unwinding _ -> Err CannotSaveFrameWhileUnwinding
  StackFrame frame -> Ok {gmachine | dump=frame::gmachine.dump}

{-| save the current context and clear the stack except for the top value
-}
pushContext : GMachine -> Result RuntimeError GMachine
pushContext gmachine = Result.map2 push (getTopVal gmachine) (gmachine |> pop 1 |> saveFrame)


{-| restore the stack frame from the dump
-}
restore : GMachine -> Maybe GMachine
restore gmachine = case gmachine.dump of
  (frame :: _) -> gmachine
    |> accessCtx.set (StackFrame frame)
    |> popDump
    |> Just
  [] -> Nothing

{-| return to the previous context saved on the dump
with some value pushed to the top of the stack
-}
return : HeapAddr -> GMachine -> RuntimeResult
return retVal gmachine = restore gmachine
  |> Maybe.map (push retVal >> Running)
  |> Maybe.withDefault (Terminated retVal gmachine.graph)

{-| start process of unwinding gmachine
-}
startUnwind : GMachine -> GMachine
startUnwind = Lens.modify accessCtx (accessStack.get >> Unwinding)

{-| jump to the supercombinator's code
-}
enter : Global -> GMachine -> GMachine
enter global gmachine = case global.code of
  Nonempty first rest ->
    accessCtx.set
    (StackFrame {stack=getStack gmachine, codePtr=ZipList.new first rest, function=global})
    gmachine


incNodeCounter : GMachine -> GMachine
incNodeCounter gmachine = {gmachine | nodeCounter=gmachine.nodeCounter + 1}

{-| instantiate a new node into the graph and push a reference to it onto the stack
-}
mkNodeAndPush : GNode -> GMachine -> GMachine
mkNodeAndPush node gmachine =
  let nodeId = gmachine.nodeCounter
  in gmachine
    |> updatePointer nodeId node
    |> incNodeCounter
    |> push nodeId

{-| retrieve the data given by an address -}
retrieveNode : GMachine -> HeapAddr -> Result RuntimeError GNode
retrieveNode gmachine node = Result.fromMaybe (NodeDoesNotExist node) (Dict.get node gmachine.graph)

{-| replace a node in the graph
-}
updatePointer : HeapAddr -> GNode -> GMachine -> GMachine
updatePointer id node gmachine = {gmachine | graph=Dict.insert id node gmachine.graph}

{-| retrieve the value from the stack at some offset from the top
-}
getFromStack : GMachine -> Int -> Result RuntimeError HeapAddr
getFromStack gmachine offset =
  Result.fromMaybe OutOfBoundsStack
  <| List.Extra.getAt offset
  <| getStack gmachine

{-| retrieve the value at the top of the stack
-}
getTopVal : GMachine -> Result RuntimeError HeapAddr
getTopVal stack = getFromStack stack 0

{-| given an application node, return the argument (right hand side)
-}
getArg : GNode -> Result RuntimeError HeapAddr
getArg node = case node of
  GApp _ arg -> Ok arg
  _ -> Err MissingArgument

{-| retrieve the global function from the environment given a name
-}
retrieveGlobal : String -> GMachine -> Result RuntimeError Global
retrieveGlobal name {env, builtins} = name
  |> Maybe.Extra.oneOf [flip getGlobal env, flip getGlobal builtins]
  |> Result.fromMaybe (UnknownName name)

runtimeResult : Result RuntimeError GMachine -> RuntimeResult
runtimeResult = Result.Extra.unpack Crash Running


{-| given the next GCode instruction, perform the state transition for the G-Machine
-}
stateTransition : GCode -> GMachine -> RuntimeResult
stateTransition instruction gmachine =
  let topMostNode = Result.andThen (retrieveNode gmachine) (getTopVal gmachine)
      sndTopMostNode = Result.andThen (retrieveNode gmachine) (getFromStack gmachine 1)

  in case (instruction, topMostNode, sndTopMostNode) of
    -- create the node for the supercombinator and push it to the stack
    (PUSHGLOBAL name, _, _) -> retrieveGlobal name gmachine
      |> Result.map (\global -> mkNodeAndPush (GFunc global) gmachine)
      |> runtimeResult

    -- allocate and push hole nodes to be filled in later
    (ALLOC num, _, _) -> Running <| F.applyN (mkNodeAndPush GHole) num gmachine

    -- evaluate according to the node on the top of the stack
    (EVAL, Ok (GApp _ _), _) -> gmachine
      |> pushContext
      |> Result.map startUnwind
      |> runtimeResult
    
    -- only perform the eval if the node is CAF (constant, no params)
    (EVAL, Ok (GFunc global), _) ->
      if global.numFormals == 0
      then gmachine
        |> pushContext
        |> Result.map (enter global)
        |> runtimeResult
      else Running gmachine

    (EVAL, Ok (GInt _), _) -> Running gmachine

    -- travel down the spine of the graph to figure out what to do next
    (UNWIND, Ok (GApp n1 n2), _) -> Running (push n1 gmachine)

    (UNWIND, Ok (GFunc global), _) ->
      let stackLength = List.length (getStack gmachine)
          enoughArguments = stackLength > global.numFormals
      in
      if enoughArguments
      -- given that enough arguments are present on the stack,
      -- jump to the global function's code for evaluation
      then Running (enter global gmachine)

      -- not enough arguments are on the stack,
      -- so we restore the saved context with the root of the current redex
      -- on the top of the stack
      else case List.head <| List.reverse <| getStack gmachine of
        Just redexRoot -> return redexRoot gmachine
        Nothing -> Crash EmptyStack

    (UNWIND, Ok (GInt _), _) -> Result.Extra.unpack
        Crash (flip return gmachine)
        (getTopVal gmachine)

    -- replace the node referenced by the given offset in the stack
    -- with a copy of the node on the top of the stack
    (UPDATE k, Ok nodeOnTop, _) ->
      Result.Extra.unpack
      Crash
      (\addr -> gmachine
        |> updatePointer addr nodeOnTop
        |> pop 1
        |> Running
      )
      (getFromStack gmachine k)

    (POP k, _, _) -> Running <| pop k gmachine 

    -- push a local value that is referenced at offset k in the stack
    (PUSHLOCAL k, _, _) -> getFromStack gmachine k
      |> Result.map (flip push gmachine)
      |> runtimeResult

    (PUSHINT x, _, _) -> Running (mkNodeAndPush (GInt x) gmachine)
    
    -- push a function argument onto the top of the stack
    -- by following the right child pointer of the application node at offset k
    (PUSHARG k, _, _) -> getFromStack gmachine k
      |> Result.andThen (retrieveNode gmachine)
      |> Result.andThen getArg
      |> Result.map (flip push gmachine)
      |> runtimeResult

    -- push an application node combining the two elements on the top of the stack
    (MKAP, _, _) -> runtimeResult <|
      Result.map2
      (\n1 n2 -> gmachine
        |> pop 2
        |> mkNodeAndPush (GApp n1 n2)
      )
      (getFromStack gmachine 0)
      (getFromStack gmachine 1)
    
    -- perform a math operation on the operands located in the top 2 stack cells
    (ADD, Ok (GInt x), Ok (GInt y)) -> gmachine
        |> pop 2
        |> mkNodeAndPush (GInt (x + y))
        |> Running
    
    (SUB, Ok (GInt x), Ok (GInt y)) -> gmachine
        |> pop 2
        |> mkNodeAndPush (GInt (x - y))
        |> Running

    (MUL, Ok (GInt x), Ok (GInt y)) -> gmachine
        |> pop 2
        |> mkNodeAndPush (GInt (x * y))
        |> Running
    
    (DIV, Ok (GInt x), Ok (GInt y)) -> gmachine
        |> pop 2
        |> mkNodeAndPush (GInt (x // y))
        |> Running

    (EQU, Ok (GInt x), Ok (GInt y)) -> gmachine
        |> pop 2
        |> mkNodeAndPush (GInt (if x == y then 1 else 0))
        |> Running

    -- pop and save the value on the top of the stack
    -- pop k more elements
    -- restore the saved value to the top of the stack
    (SLIDE k, _, _) -> getTopVal gmachine
      |> Result.map (\topVal -> gmachine |> pop (k + 1) >> push topVal)
      |> runtimeResult

    -- if we don't know what to do next, then fail returning the node on the top of the stack
    (_, node, _) ->
      Result.map2 UnexpectedNode (getTopVal gmachine) node
      |> Result.Extra.unpack Crash Crash


setup : Env -> Global -> GMachine
setup env mainFunction =
  { ctx=Unwinding []
  , dump=[]
  , graph=Dict.empty
  , builtins=stdLib
  , env=env
  , nodeCounter=0
  }
  |> mkNodeAndPush (GFunc mainFunction)
  |> enter mainFunction


{-| compile source code and set up the G-Machine
-}
createMachine : String -> Result CompilerError GMachine
createMachine source = compile source
  |> Result.andThen (\env -> case Dict.get "main" env of
    -- set up the stack and heap with a node for the main function for evaluation
    Just mainFunction ->
      if mainFunction.numFormals /= 0
      then Err MainFunctionCannotHaveFormals
      else Ok (setup env mainFunction)
    Nothing -> Err CannotFindMainFunction
  )

{-| retrieve the children from the node
-}
getChildren : GNode -> Maybe (HeapAddr, HeapAddr)
getChildren node = case node of
  GApp left right -> Just (left, right)
  _ -> Nothing

{-| perform full search from starting node, returning all reachable nodes
-}
reachableNodes : HeapAddr -> GGraph -> Set HeapAddr -> Set HeapAddr
reachableNodes root graph visited =
  if Set.member root visited then visited
  else
  let newVisitedSet = Set.insert root visited
  in case Maybe.andThen getChildren (Dict.get root graph) of
    Just (leftChild, rightChild) -> reachableNodes rightChild graph
      (reachableNodes leftChild graph newVisitedSet)
    Nothing -> newVisitedSet

{-| simple mark-scan, traverse the heap graph to find reachable cells
starting with the stack pointers (as well as in the dump) 
-}
garbageCollection : GMachine -> GMachine
garbageCollection ({dump, graph} as gmachine) =
  let stackPointers = List.concat
        (getStack gmachine :: List.map .stack dump)
      reachableCells = List.foldl
        (\ref visited -> reachableNodes ref graph visited)
        Set.empty
        stackPointers

      cleanedGraph = Dict.filter
        (\ref data -> Set.member ref reachableCells)
        graph
  
  in { gmachine | graph=cleanedGraph }

type RuntimeResult
  = Running GMachine
  | Terminated HeapAddr GGraph 
  | Crash RuntimeError



{-| perform the next state transition of the g-machine
-}
step : GMachine -> RuntimeResult
step machine =
  if isUnwinding machine
  then stateTransition UNWIND machine
  else case currentInstruction machine of
    UNWIND -> (startUnwind >> step) machine
    instruction -> machine
      |> incCodePtr
      |> stateTransition instruction

{-| run the machine to completion
-}
runMachine : GMachine -> Result RuntimeError (HeapAddr, GGraph)
runMachine machine =
  let run state = case state of
        Terminated node graph -> Ok (node, graph)
        Crash err -> Err err
        Running machine_ -> run <| step machine_
  in run (Running machine)
