module GMachine exposing
  ( createMachine, step, runMachine
  , RuntimeResult(..), RuntimeError(..), GMachine
  , GNode(..), GGraph, NodeId
  , getChildren
  )

import Basics.Extra exposing (flip)
import Dict as Dict
import Dict exposing (Dict)
import Result exposing (Result(..))
import Funcs as F
import List.Extra
import Backend exposing (..)
import Result.Extra
import Set exposing (Set)
import Maybe.Extra

{-| this module implements the runtime behavior of the G-Machine

Augustsson, Lennart. "A compiler for lazy ML." 1984.

A great short tutorial on G-Machine implementation: https://amelia.how/posts/the-gmachine-in-detail.html

A longer tutorial: Peyton Jones, S. L. (1987). The implementation of Functional Programming Languages. Prentice-Hall.
-}

type alias NodeId = Int

{-| type of nodes that can exist in the graph
-}
type GNode
  = GApp NodeId NodeId
  | GFunc Global
  | GInt Int
  | GHole

type alias GGraph = Dict NodeId GNode

type alias GStack = List NodeId

type alias GDump = List (GStack, List GCode)

type alias GMachine =
  { stack : GStack
  , graph : GGraph
  , code  : List GCode
  , dump  : GDump
  , builtins : Env
  , env   : Env
  , nodeCounter : Int -- used for uniquely identifying nodes
  , unwinding : Bool
  }

type RuntimeError
  = UnknownName String
  | NodeDoesNotExist NodeId
  | EmptyStack
  | OutOfBoundsStack
  | EmptyDump
  | MissingArgument
  | UnexpectedNode NodeId GNode

{-| push a node reference to the stack
-}
push : NodeId -> GMachine -> GMachine
push node gmachine = {gmachine | stack = node :: gmachine.stack}

{-| pop k items from the stack
-}
pop : Int -> GMachine -> GMachine
pop num gmachine = {gmachine | stack=List.drop num gmachine.stack}

setStack : GStack -> GMachine -> GMachine
setStack stack gmachine = {gmachine | stack=stack}

setCode : List GCode -> GMachine -> GMachine
setCode code gmachine = {gmachine | code=code}

setDump : GDump -> GMachine -> GMachine
setDump dump gmachine = {gmachine | dump=dump}

setEnv : Env -> GMachine -> GMachine
setEnv env gmachine = {gmachine | env=env}

setUnwinding : Bool -> GMachine -> GMachine
setUnwinding flag gmachine = {gmachine | unwinding=flag}

{-| save some state to the dump to be restored later
-}
pushContextToDump : GStack -> List GCode -> GMachine -> GMachine
pushContextToDump stack code gmachine = {gmachine | dump= (stack, code) :: gmachine.dump}

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
retrieveNode : GMachine -> NodeId -> Result RuntimeError GNode
retrieveNode gmachine node = Result.fromMaybe (NodeDoesNotExist node) (Dict.get node gmachine.graph)

{-| replace a node in the graph
-}
updatePointer : NodeId -> GNode -> GMachine -> GMachine
updatePointer id node gmachine = {gmachine | graph=Dict.insert id node gmachine.graph}

{-| retrieve the value from the stack at some offset from the top
-}
getFromStack : GStack -> Int -> Result RuntimeError NodeId
getFromStack stack offset = Result.fromMaybe OutOfBoundsStack
  <| List.Extra.getAt offset stack

{-| retrieve the value at the top of the stack
-}
getTopVal : GStack -> Result RuntimeError NodeId
getTopVal stack = getFromStack stack 0

{-| given an application node, return the argument (right hand side)
-}
getArg : GNode -> Result RuntimeError NodeId
getArg node = case node of
  GApp _ arg -> Ok arg
  _ -> Err MissingArgument

{-| retrieve the global function from the environment given a name
-}
retrieveGlobal : String -> GMachine -> Result RuntimeError Global
retrieveGlobal name {env, builtins} = name
  |> Maybe.Extra.oneOf [flip getGlobal env, flip getGlobal builtins]
  |> Result.fromMaybe (UnknownName name)

{-| return to the previous context saved on the dump
with some value pushed to the top of the stack
-}
return : NodeId -> GMachine -> Result RuntimeError GMachine
return retVal gmachine =
  let ((oldStack, oldCode), dump) =
        Maybe.withDefault (([],[]), [])
        (List.Extra.uncons gmachine.dump)
  in gmachine
    |> setStack oldStack
    |> setCode oldCode
    |> setDump dump
    |> push retVal
    |> Ok

runtimeResult : Result RuntimeError GMachine -> RuntimeResult
runtimeResult = Result.Extra.unpack Crash Running


{-| given the next GCode instruction, perform the state transition for the G-Machine
-}
stateTransition : GCode -> GMachine -> RuntimeResult
stateTransition instruction ({stack, code, dump} as gmachine) =
  let topMostNode = Result.andThen (retrieveNode gmachine) (getTopVal stack)
      sndTopMostNode = Result.andThen (retrieveNode gmachine) (getFromStack stack 1)
  in case (instruction, topMostNode, sndTopMostNode) of
    -- create the node for the supercombinator and push it to the stack
    (PUSHGLOBAL name, _, _) -> retrieveGlobal name gmachine
      |> Result.map (\global -> mkNodeAndPush (GFunc global) gmachine)
      |> runtimeResult

    -- allocate and push hole nodes to be filled in later
    (ALLOC num, _, _) -> Running <| F.applyN (mkNodeAndPush GHole) num gmachine

    -- evaluate according to the node on the top of the stack
    (EVAL, Ok (GApp _ _), _) -> gmachine
      |> setStack (List.take 1 stack)
      |> setCode [UNWIND]
      |> pushContextToDump (List.drop 1 stack) code
      |> Running
    
    -- only perform the eval if the node is CAF (constant, no params)
    (EVAL, Ok (GFunc global), _) ->
      if global.numFormals == 0
      then gmachine
        |> setStack (List.take 1 stack)
        |> setCode global.code
        |> pushContextToDump (List.drop 1 stack) code
        |> Running
      else Running gmachine

    (EVAL, Ok (GInt _), _) -> Running gmachine

    -- travel down the spine of the graph to figure out what to do next
    (UNWIND, Ok (GApp n1 n2), _) -> gmachine
      |> push n1
      |> setCode [UNWIND]
      |> Running

    (UNWIND, Ok (GFunc global), _) ->
      let enoughArguments = List.length stack > global.numFormals
      in
      if enoughArguments
      -- given that enough arguments are present on the stack,
      -- jump to the global function's code for evaluation
      then Running (setCode global.code gmachine)

      -- not enough arguments are on the stack,
      -- so we restore the saved context with the root of the current redex
      -- on the top of the stack
      else case List.head (List.reverse stack) of
        Just redexRoot ->
          case dump of
            (oldStack, oldCode) :: dump_ -> gmachine
              |> setStack (redexRoot :: oldStack)
              |> setCode oldCode
              |> setDump dump_
              |> Running
            [] -> Terminated redexRoot gmachine.graph
        Nothing -> Crash EmptyStack

    (UNWIND, Ok (GInt _), _) -> getTopVal stack
      |> Result.andThen (flip return gmachine)
      |> runtimeResult

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
      (getFromStack stack k)

    (POP k, _, _) -> Running <| pop k gmachine 

    -- push a local value that is referenced at offset k in the stack
    (PUSHLOCAL k, _, _) -> getFromStack stack k
      |> Result.map (flip push gmachine)
      |> runtimeResult

    (PUSHINT x, _, _) -> Running (mkNodeAndPush (GInt x) gmachine)
    
    -- push a function argument onto the top of the stack
    -- by following the right child pointer of the application node at offset k
    (PUSHARG k, _, _) -> getFromStack stack k
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
      (getFromStack stack 0)
      (getFromStack stack 1)
    
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
        |> setStack (List.drop 2 stack)
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
    (SLIDE k, _, _) -> getTopVal stack
      |> Result.map (\topVal -> gmachine |> pop (k + 1) >> push topVal)
      |> runtimeResult

    -- if we don't know what to do next, then fail returning the node on the top of the stack
    (_, node, _) ->
      Result.map2 UnexpectedNode (getTopVal stack) node
      |> Result.Extra.unpack Crash Crash


emptyMachine : GMachine
emptyMachine =
  { stack=[]
  , code=[]
  , dump=[]
  , graph=Dict.empty
  , builtins=stdLib
  , env=emptyEnv
  , nodeCounter=0
  , unwinding=False
  }


{-| compile source code and set up the G-Machine
-}
createMachine : String -> Result CompilerError GMachine
createMachine source = compile source
  |> Result.andThen (\env -> case Dict.get "main" env of
    -- set up the stack and heap with a node for the main function for evaluation
    Just mainFunction ->
      if mainFunction.numFormals /= 0
      then Err MainFunctionCannotHaveFormals
      else emptyMachine
        |> setEnv env
        |> mkNodeAndPush (GFunc mainFunction)
        |> setCode mainFunction.code
        |> Ok
    Nothing -> Err CannotFindMainFunction
  )

{-| retrieve the children from the node
-}
getChildren : GNode -> Maybe (NodeId, NodeId)
getChildren node = case node of
  GApp left right -> Just (left, right)
  _ -> Nothing

{-| perform full search from starting node, returning all reachable nodes
-}
reachableNodes : NodeId -> GGraph -> Set NodeId -> Set NodeId
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
garbageCollection ({stack, dump, graph} as gmachine) =
  let stackPointers = List.concat (stack :: List.map Tuple.first dump)
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
  | Terminated NodeId GGraph 
  | Crash RuntimeError



{-| perform the next state transition of the g-machine
-}
step : GMachine -> RuntimeResult
step machine = case (machine.code, machine.stack, machine.unwinding) of
  -- hitting an unwind instruction should trigger garbage collection
  -- (unwinding will constitute multiple state transitions, so we keep track of whether this is the first unwind step)
  (UNWIND :: _, _, False) -> machine
    |> garbageCollection
    |> setUnwinding True
    |> Running

  -- otherwise read the current instruction and apply the state transition
  (nextInstruction :: code, _, _) -> machine
    |> setUnwinding (nextInstruction == UNWIND)
    |> setCode code
    |> stateTransition nextInstruction
  
  -- no more instructions means the result is at the top of the stack
  ([], result :: _, _) -> Terminated result machine.graph

  -- crash if there is no result
  (_, [], _) -> Crash EmptyStack

{-| run the machine to completion
-}
runMachine : GMachine -> Result RuntimeError (NodeId, GGraph)
runMachine machine =
  let run state = case state of
        Terminated node graph -> Ok (node, graph)
        Crash err -> Err err
        Running machine_ -> run <| step machine_
  in run (Running machine)
