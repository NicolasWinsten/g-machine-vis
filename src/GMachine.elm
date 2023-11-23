module GMachine exposing
  ( createMachine, step, runMachine
  , RuntimeResult(..), RuntimeError(..), GMachine
  , GNode(..), GGraph, NodeId
  )

import Basics.Extra exposing (flip)
import Dict as Dict
import Dict exposing (Dict)
import Result exposing (Result(..))
import Funcs as F
import List.Extra
import Backend exposing (..)
import Result.Extra

{-| this module implements the runtime behavior of the G-Machine

Augustsson, Lennart. "A compiler for lazy ML." 1984.
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
  }

type RuntimeError
  = UnknownName String
  | NodeDoesNotExist NodeId
  | EmptyStack
  | OutOfBoundsStack
  | EmptyDump
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

{-| retrieve pointers directly to the arguments referenced by the application nodes on the stack
-}
getArgsOnSpine : Int -> GMachine -> Maybe (List NodeId)
getArgsOnSpine numArgs gmachine =
  let argsOnSpine = gmachine.stack
        |> List.drop 1
        |> List.take numArgs
        |> List.filterMap (flip Dict.get gmachine.graph)
        |> List.filterMap getArg
  in if List.length argsOnSpine == numArgs
  then Just argsOnSpine else Nothing

{-| given the next GCode instruction, perform the state transition for the G-Machine

-}
stateTransition : GCode -> GMachine -> Result RuntimeError GMachine
stateTransition instruction ({stack, dump, code, env} as gmachine) = case instruction of
  -- create the node for the supercombinator and push it to the stack
  PUSHGLOBAL name -> case getGlobal name env of
    Nothing     -> Err (UnknownName name)
    Just global  ->
      let node = GFunc global
      in Ok <| mkNodeAndPush node gmachine

  -- allocate and push hole nodes to be filled in later
  ALLOC num -> Ok <| F.applyN (mkNodeAndPush GHole) num gmachine

  -- evaluate according to the node on the top of the stack
  EVAL -> peekNodeOnStack gmachine
    |> Result.andThen (\node -> case node of
      GApp _ _ -> gmachine
        |> setStack (List.take 1 stack)
        |> setCode [UNWIND]
        |> pushContextToDump (List.drop 1 stack) code
        |> Ok

      -- only perform the eval if the node is CAF (constant, no params)
      GFunc global -> Ok <|
        if global.numFormals == 0 then
          gmachine
          |> setStack (List.take 1 stack)
          |> setCode global.code
          |> pushContextToDump (List.drop 1 stack) code
        else gmachine

      GHole -> Err UnexpectedHole
    )

  -- travel down the spine of the graph to figure out what to do next
  UNWIND -> peekNodeOnStack gmachine
    |> Result.andThen (\node -> case node of
      GApp n1 n2 -> gmachine
        |> push n1
        |> setCode [UNWIND]
        |> Ok


      GFunc global -> case getArgsOnSpine global.numFormals gmachine of
        -- given that enough arguments are present on the stack,
        -- rearrange the stack pointers to directly point towards the argument nodes
        -- and jump to the global function's code for evaluation
        Just args -> gmachine
          |> setStack (args ++ List.drop global.numFormals gmachine.stack)
          |> setCode global.code
          |> Ok

        -- not enough arguments are on the stack,
        -- so we restore the saved context with the root of the current redex
        -- on the top of the stack
        Nothing -> case (List.reverse stack, dump) of
          (redexRoot :: _, (oldStack, oldCode) :: dump_) -> gmachine
            |> setStack (redexRoot :: oldStack)
            |> setCode oldCode
            |> setDump dump_
            |> Ok
          
          ([], _) -> Err EmptyStack

          (_, []) -> Err EmptyDump
          

      GHole -> Err UnexpectedHole
    )

  -- replace the node referenced by the given offset in the stack
  -- with the node on the top of the stack
  UPDATE k ->
    let nodeId = Result.fromMaybe OutOfBoundsStack <| List.Extra.getAt k stack
    in Result.map2
      (\nodeOnTop nodeToReplace -> gmachine
        |> updatePointer nodeToReplace nodeOnTop
        |> pop 1 
      )
      (peekNodeOnStack gmachine)
      nodeId

  POP k -> Ok <| pop k gmachine 

  PUSH k -> case List.Extra.getAt k stack of
    Just node -> Ok <| push node gmachine
    Nothing -> Err EmptyStack

  -- push an application node combining the two elements on the top of the stack
  MKAP -> case stack of
    (n1 :: n2 :: stack_) -> gmachine
      |> setStack stack_
      |> mkNodeAndPush (GApp n1 n2)
      |> Ok
    
    _ -> Err EmptyStack

  -- remove k elements from the stack starting at offset 1
  -- (leave the cell at the top of the stack unchanged)
  SLIDE k -> Ok <| setStack (List.take 1 stack ++ List.drop (k + 1) stack) gmachine


emptyMachine : GMachine
emptyMachine =
  { stack=[]
  , code=[]
  , dump=[]
  , graph=Dict.empty
  , env=emptyEnv
  , nodeCounter=0
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
        |> setCode [EVAL]
        |> Ok
    Nothing -> Err CannotFindMainFunction
  )

type RuntimeResult
  = Running GMachine
  | Terminated NodeId GGraph
  | Crash RuntimeError

{-| perform the next state transition of the g-machine
-}
step : GMachine -> RuntimeResult
step machine = case (machine.code, machine.stack) of
  -- read the next instruction and apply the state transition
  (nextInstruction :: code, _) -> Result.Extra.unpack
    Crash
    Running
    (stateTransition nextInstruction (setCode code machine))
  
  -- no more instructions means the result is at the top of the stack
  ([], result :: _) -> Terminated result machine.graph

  -- crash if there is no result
  (_, []) -> Crash EmptyStack

{-| run the machine to completion
-}
runMachine : GMachine -> Result RuntimeError (NodeId, GGraph)
runMachine machine =
  let run state = case state of
        Terminated node graph -> Ok (node, graph)
        Crash err -> Err err
        Running machine_ -> run <| step machine_
  in run (Running machine)
