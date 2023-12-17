module GMachine exposing
  ( createMachine, step, runMachine
  , RuntimeResult, RuntimeError(..)
  , MachineUpdate(..)
  , GMachine
  , GNode(..), GGraph, HeapAddr
  , getChildren, getStack, getCodePtr
  , isTermination, getCurrentRedexRoot
  )

import Basics.Extra exposing (flip)
import Dict as Dict exposing (Dict)
import Result exposing (Result(..))
import List.Extra
import Backend exposing (..)
import Result.Extra
import Set exposing (Set)
import Maybe.Extra
import ZipList exposing (ZipList)
import Monocle.Lens as Lens exposing (Lens)
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

type RuntimeError
  = UndefinedSymbol String
  | NodeDoesNotExist HeapAddr
  | StackException Int
  | UnexpectedNode HeapAddr
  | CannotSaveFrameWhileUnwinding

{-| each state transition updates the abstract machine somehow.
each of these variants signal a type of update to the machine
-}
type MachineUpdate
  = NewNodeAllocated HeapAddr GNode
  | HolesAllocated (List HeapAddr)
  | Crash RuntimeError
  | Output HeapAddr
  | GarbageCollection (List HeapAddr)
  | EnteredCode {functionAddr : HeapAddr, function : Global, args : List HeapAddr}
  | StartedUnwind HeapAddr
  | Unwound HeapAddr -- add force to pull this node to the bottom left
  | RedexRootReplaced HeapAddr GNode
  | Multiple MachineUpdate MachineUpdate
  | NoUpdate -- TODO prune this

{-| the result of a G-machine state transition
-}
type alias RuntimeResult = (GMachine, MachineUpdate)  -- TODO FIX TYPE CHECK ON THIS

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

getCurrentRedexRoot : GMachine -> Maybe HeapAddr
getCurrentRedexRoot = getStack >> List.Extra.last

{-| retrieve all the addresses referenced by the stack and dump
-}
stackPointers : GMachine -> List HeapAddr
stackPointers m = getStack m ++ List.concatMap .stack m.dump 

getCodePtr : GMachine -> CodePtr
getCodePtr = codePtrLens.get

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
  Unwinding _ -> Err CannotSaveFrameWhileUnwinding -- this branch should never occur
  StackFrame frame -> Ok {gmachine | dump=frame::gmachine.dump}

{-| save the current context and clear the stack except for the top value
-- TODO turn this into RuntimeResult
-}
pushContext : GMachine -> Result RuntimeError GMachine
pushContext gmachine = Result.map2 push (getTopVal gmachine) (gmachine |> pop 1 |> saveFrame)


{-| restore the stack frame from the dump
-- TODO turn this into RuntimeResult
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

if there is no more code to run (dump is empty),
return the value as the output of the program
-}
return : HeapAddr -> GMachine -> RuntimeResult
return retVal gmachine = restore gmachine
  |> Maybe.map (\m -> (push retVal m, NoUpdate))
  |> Maybe.withDefault (gmachine, Output retVal)

{-| extract a value from the gmachine that may possibly cause a crash
and if successful update the machine using that value
-}
runWith : (GMachine -> Result RuntimeError a) -> (a -> GMachine -> RuntimeResult) -> GMachine -> RuntimeResult
runWith extract procedure machine = Result.Extra.unpack
  (\err -> (machine, Crash err))
  (\val -> procedure val machine)
  (extract machine)

andThen : (GMachine -> RuntimeResult) -> RuntimeResult -> RuntimeResult
andThen procedure (machine, previousUpdate) =
  Tuple.mapSecond (Multiple previousUpdate) (procedure machine)

{-| start process of unwinding gmachine
-}
startUnwind : GMachine -> RuntimeResult
startUnwind gmachine =
  let newMachine = Lens.modify accessCtx (accessStack.get >> Unwinding) gmachine
  in runWith getTopVal (StartedUnwind >> flip Tuple.pair) newMachine


getRightChild : GNode -> Maybe HeapAddr
getRightChild node = case node of
    GApp _ right -> Just right
    GFunc _ -> Nothing
    GInt _ -> Nothing
    GHole -> Nothing

{-| jump to the supercombinator's code
-}
enter : Global -> GMachine -> RuntimeResult
enter global gmachine = case global.code of
  Nonempty first rest ->
    let stack = getStack gmachine
        newCtx = StackFrame
          {stack=getStack gmachine, codePtr=ZipList.new first rest, function=global}
        
        -- some bad code
        -- TODO fix this ... or dont
        fPtr = Maybe.withDefault (-99) (List.head stack)
        args = List.range 1 global.numFormals
          |> List.map (\addr -> loadStackPointer addr gmachine)
          |> List.filterMap (Result.toMaybe >> Maybe.andThen getRightChild)

    in
    ( accessCtx.set newCtx gmachine
    , EnteredCode {functionAddr=fPtr, function=global, args=args}
    )


incNodeCounter : GMachine -> GMachine
incNodeCounter gmachine = {gmachine | nodeCounter=gmachine.nodeCounter + 1}

{-| instantiate a new node into the graph and push a reference to it onto the stack
-}
mkNodeAndPush : GNode -> GMachine -> RuntimeResult
mkNodeAndPush node gmachine =
  let nodeId = gmachine.nodeCounter
  in gmachine
    |> updatePointer nodeId node
    |> incNodeCounter
    |> push nodeId
    |> flip Tuple.pair (NewNodeAllocated nodeId node)

{-| retrieve the data given by an address -}
retrieveNode : HeapAddr -> GMachine -> Result RuntimeError GNode
retrieveNode addr {graph} = Result.fromMaybe (NodeDoesNotExist addr) (Dict.get addr graph)

{-| dereference a pointer on the stack given its offset from the top of the stack
-}
loadStackPointer : Int -> GMachine -> Result RuntimeError GNode
loadStackPointer offset gmachine = getFromStack offset gmachine
  |> Result.andThen (flip retrieveNode gmachine)

{-| place a node in the graph
-}
updatePointer : HeapAddr -> GNode -> GMachine -> GMachine
updatePointer id node gmachine = {gmachine | graph=Dict.insert id node gmachine.graph}

{-| retrieve the value from the stack at some offset from the top
-}
getFromStack : Int -> GMachine -> Result RuntimeError HeapAddr
getFromStack offset gmachine =
  Result.fromMaybe (StackException offset)
  <| List.Extra.getAt offset
  <| getStack gmachine

{-| retrieve the value at the top of the stack
-}
getTopVal : GMachine -> Result RuntimeError HeapAddr
getTopVal = getFromStack 0


{-| retrieve the global function from the environment given a name
-}
retrieveGlobal : String -> GMachine -> Result RuntimeError Global
retrieveGlobal name {env, builtins} = name
  |> Maybe.Extra.oneOf [flip getGlobal env, flip getGlobal builtins]
  |> Result.fromMaybe (UndefinedSymbol name)

{-| allocate some number of hole nodes and push them to the stack
-}
allocHoles : Int -> GMachine -> RuntimeResult
allocHoles k machine =
  let newMachine = List.foldl
        (\_ -> mkNodeAndPush GHole >> Tuple.first)
        machine
        (List.range 1 (k - 1))
      
      holeAddrs = List.take k (getStack newMachine)
  in (newMachine, HolesAllocated holeAddrs)

{-| given the next GCode instruction, perform the state transition for the G-Machine
-}
stateTransition : GCode -> GMachine -> RuntimeResult
stateTransition instruction gmachine =
  let topMostNode = loadStackPointer 0 gmachine
      sndTopMostNode = loadStackPointer 1 gmachine

  in case (instruction, topMostNode, sndTopMostNode) of
    -- create the node for the supercombinator and push it to the stack
    (PUSHGLOBAL name, _, _) -> runWith
      (retrieveGlobal name)
      (GFunc >> mkNodeAndPush)
      gmachine

    -- allocate and push hole nodes to be filled in later
    (ALLOC num, _, _) -> allocHoles num gmachine

    -- evaluate according to the node on the top of the stack
    (EVAL, Ok (GApp _ _), _) -> runWith pushContext (\m _ -> startUnwind m) gmachine
    
    -- only perform the eval if the node is CAF (constant, no params)
    (EVAL, Ok (GFunc global), _) ->
      if global.numFormals == 0
      then runWith pushContext (\m _ -> enter global m) gmachine
      else (gmachine, NoUpdate)

    (EVAL, Ok (GInt _), _) -> (gmachine, NoUpdate)

    -- travel down the spine of the graph to figure out what to do next
    (UNWIND, Ok (GApp n1 n2), _) -> (push n1 gmachine, Unwound n1)

    (UNWIND, Ok (GFunc global), _) ->
      let stackLength = List.length (getStack gmachine)
          enoughArguments = stackLength > global.numFormals
      in
      if enoughArguments
      -- given that enough arguments are present on the stack,
      -- jump to the global function's code for evaluation
      then (enter global gmachine)

      -- not enough arguments are on the stack,
      -- so we restore the saved context with the root of the current redex
      -- on the top of the stack
      else
      let getRedexRoot = getFromStack (stackLength - 1)
      in runWith getRedexRoot return gmachine

    (UNWIND, Ok (GInt _), _) -> runWith getTopVal return gmachine

    -- replace the node referenced by the given offset in the stack
    -- with a copy of the node on the top of the stack
    (UPDATE k, Ok nodeOnTop, _) -> runWith
      (getFromStack k)
      (\addr m -> (updatePointer addr nodeOnTop (pop 1 m), RedexRootReplaced addr nodeOnTop))
      gmachine

    -- pop k items off the stack
    (POP k, _, _) -> (pop k gmachine, NoUpdate) 

    -- push a local value that is referenced at offset k in the stack
    (PUSHLOCAL k, _, _) -> runWith
      (getFromStack k)
      (\val m -> (push val m, NoUpdate))
      gmachine

    (PUSHINT x, _, _) -> mkNodeAndPush (GInt x) gmachine
    
    -- push a function argument onto the top of the stack
    -- by following the right child pointer of the application node at offset k
    (PUSHARG k, _, _) -> runWith
      (getFromStack k)
      (\addr m ->
        case retrieveNode addr m of
          Ok (GApp _ arg) -> (push arg m, NoUpdate)
          Ok _ -> (m, Crash (UnexpectedNode addr))
          Err err -> (m, Crash err)
      )
      gmachine

    -- push an application node combining the two elements on the top of the stack
    (MKAP, _, _) -> runWith
      (\m -> Result.Extra.combineMapBoth (getFromStack 0) (getFromStack 1) (m,m))
      (\(n1,n2) -> pop 2 >> mkNodeAndPush (GApp n1 n2))
      gmachine
    
    -- perform a math operation on the operands located in the top 2 stack cells
    (ADD, Ok (GInt x), Ok (GInt y)) -> gmachine
        |> pop 2
        |> mkNodeAndPush (GInt (x + y))
    
    (SUB, Ok (GInt x), Ok (GInt y)) -> gmachine
        |> pop 2
        |> mkNodeAndPush (GInt (x - y))

    (MUL, Ok (GInt x), Ok (GInt y)) -> gmachine
        |> pop 2
        |> mkNodeAndPush (GInt (x * y))
    
    (DIV, Ok (GInt x), Ok (GInt y)) -> gmachine
        |> pop 2
        |> mkNodeAndPush (GInt (x // y))

    (EQU, Ok (GInt x), Ok (GInt y)) -> gmachine
        |> pop 2
        |> mkNodeAndPush (GInt (if x == y then 1 else 0))

    -- pop and save the value on the top of the stack
    -- pop k more elements
    -- restore the saved value to the top of the stack
    (SLIDE k, _, _) -> runWith
      getTopVal
      (\topVal m -> (m |> pop (k + 1) >> push topVal, NoUpdate))
      gmachine

    -- if we don't know what to do next, then fail returning the node on the top of the stack
    (_, _, _) -> runWith
      getTopVal
      (\val m -> (m, Crash (UnexpectedNode val)))
      gmachine

{-| set up a new machine by starting it on a function's code
-}
setup : Env -> Global -> RuntimeResult
setup env mainFunction =
  { ctx=Unwinding []
  , dump=[]
  , graph=Dict.empty
  , builtins=stdLib
  , env=env
  , nodeCounter=0
  }
  |> mkNodeAndPush (GFunc mainFunction)
  |> andThen (enter mainFunction)


{-| compile source code and set up the G-Machine
-}
createMachine : String -> Result CompilerError RuntimeResult
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
garbageCollection : GMachine -> RuntimeResult
garbageCollection ({graph} as gmachine) =
  let reachableCells = List.foldl
        (\ref visited -> reachableNodes ref graph visited)
        Set.empty
        (stackPointers gmachine)

      cleanedGraph = Dict.filter
        (\ref data -> Set.member ref reachableCells)
        graph
      
      removedCells = List.filter
        (\ref -> not <| Set.member ref reachableCells)
        (Dict.keys graph)
      
  in ({ gmachine | graph=cleanedGraph }, GarbageCollection removedCells)

{-| perform the next state transition of the g-machine
-}
step : GMachine -> RuntimeResult
step machine =
  if isUnwinding machine
  then stateTransition UNWIND machine
  else case currentInstruction machine of
    UNWIND -> startUnwind machine
    instruction -> machine
      |> incCodePtr
      |> stateTransition instruction
      |> andThen garbageCollection


isTermination : MachineUpdate -> Bool
isTermination update = case update of
  Output _ -> True
  Crash _ -> True
  Multiple _ updates -> isTermination updates
  _ -> False

{-| run the machine to completion
-}
runMachine : GMachine -> RuntimeResult
runMachine machine =
  let run (state, update) =
        if isTermination update then (state, update)
        else run (step state)
  in run (step machine)
