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
  | GHole

type alias GGraph = Dict NodeId GNode

type alias GStack = List NodeId

type alias GDump = List (GStack, List GCode)

type alias GMachine =
  { stack : GStack
  , graph : GGraph
  , code  : List GCode
  , dump  : GDump
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
  | UnexpectedHole

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

{-| dereference the node pointer on the top of the stack
-}
peekNodeOnStack : GMachine -> Result RuntimeError GNode
peekNodeOnStack gmachine = Result.fromMaybe EmptyStack (List.head gmachine.stack)
  |> Result.andThen (retrieveNode gmachine)

{-| retrieve the data given by an address -}
retrieveNode : GMachine -> NodeId -> Result RuntimeError GNode
retrieveNode gmachine node = Result.fromMaybe (NodeDoesNotExist node) (Dict.get node gmachine.graph)

{-| replace a node in the graph
-}
updatePointer : NodeId -> GNode -> GMachine -> GMachine
updatePointer id node gmachine = {gmachine | graph=Dict.insert id node gmachine.graph}

{-| given an application node, return the argument (right hand side)
-}
getArg : GNode -> Maybe NodeId
getArg node = case node of
  GApp _ arg -> Just arg
  _ -> Nothing

{-| given the next GCode instruction, perform the state transition for the G-Machine

-}
stateTransition : GCode -> GMachine -> Result RuntimeError GMachine
stateTransition instruction ({stack, code, dump, env} as gmachine) =
  case (instruction, peekNodeOnStack gmachine) of
    -- create the node for the supercombinator and push it to the stack
    (PUSHGLOBAL name, _) -> case getGlobal name env of
      Nothing     -> Err (UnknownName name)
      Just global  ->
        let node = GFunc global
        in Ok <| mkNodeAndPush node gmachine

    -- allocate and push hole nodes to be filled in later
    (ALLOC num, _) -> Ok <| F.applyN (mkNodeAndPush GHole) num gmachine

    -- evaluate according to the node on the top of the stack
    (EVAL, Ok (GApp _ _)) -> gmachine
      |> setStack (List.take 1 stack)
      |> setCode [UNWIND]
      |> pushContextToDump (List.drop 1 stack) code
      |> Ok
    
    -- only perform the eval if the node is CAF (constant, no params)
    (EVAL, Ok (GFunc global)) ->
      if global.numFormals == 0
      then gmachine
        |> setStack (List.take 1 stack)
        |> setCode global.code
        |> pushContextToDump (List.drop 1 stack) code
        |> Ok 
      else Ok gmachine

    (EVAL, Ok GHole) -> Err UnexpectedHole

    -- travel down the spine of the graph to figure out what to do next
    (UNWIND, Ok (GApp n1 n2)) -> gmachine
      |> push n1
      |> setCode [UNWIND]
      |> Ok

    (UNWIND, Ok (GFunc global)) ->
      let enoughArguments = List.length stack + 1 >= global.numFormals
      in
      if enoughArguments
      -- given that enough arguments are present on the stack,
      -- jump to the global function's code for evaluation
      then Ok (setCode global.code gmachine)

      -- not enough arguments are on the stack,
      -- so we restore the saved context with the root of the current redex
      -- on the top of the stack
      else case (List.reverse stack, dump) of
        (redexRoot :: _, (oldStack, oldCode) :: dump_) -> gmachine
          |> setStack (redexRoot :: oldStack)
          |> setCode oldCode
          |> setDump dump_
          |> Ok
            
        ([], _) -> Err EmptyStack

        (_, []) -> Err EmptyDump -- TODO this means WHNF reached

    (UNWIND, Ok GHole) -> Err UnexpectedHole

    -- replace the node referenced by the given offset in the stack
    -- with the node on the top of the stack
    (UPDATE k, Ok nodeOnTop) ->
      let nodeToReplace = Result.fromMaybe OutOfBoundsStack <| List.Extra.getAt k stack
      in Result.map
        (\pointer -> gmachine
          |> updatePointer pointer nodeOnTop
          |> pop 1 
        )
        nodeToReplace

    (POP k, _) -> Ok <| pop k gmachine 

    -- push a local value that is referenced at offset k in the stack
    (PUSHLOCAL k, _) -> case List.Extra.getAt k stack of
      Just node -> Ok <| push node gmachine
      Nothing -> Err EmptyStack
    
    -- push a function argument onto the top of the stack
    -- by following the right child pointer of the application node at offset k
    (PUSHARG k, _) ->
      let arg = List.Extra.getAt (k + 1) stack
            |> Result.fromMaybe EmptyStack
            |> Result.andThen (retrieveNode gmachine)
            |> Result.map getArg
      in case arg of
        Ok (Just argAddr) -> Ok <| push argAddr gmachine
        Ok Nothing -> Err MissingArgument
        Err err -> Err err  

    -- push an application node combining the two elements on the top of the stack
    (MKAP, _) -> case stack of
      (n1 :: n2 :: stack_) -> gmachine
        |> setStack stack_
        |> mkNodeAndPush (GApp n1 n2)
        |> Ok
      
      _ -> Err EmptyStack

    -- remove k elements from the stack starting at offset 1
    -- (leave the cell at the top of the stack unchanged)
    (SLIDE k, _) -> Ok <| setStack (List.take 1 stack ++ List.drop (k + 1) stack) gmachine

    -- something went wrong
    (_, Err err) -> Err err


emptyMachine : GMachine
emptyMachine =
  { stack=[]
  , code=[]
  , dump=[]
  , graph=Dict.empty
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
        |> setDump [([],[])]
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
    |> Result.Extra.unpack Crash Running
  
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
