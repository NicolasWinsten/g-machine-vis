module Backend exposing
  ( CompilerError(..), GCode(..)
  , Global, Env, emptyEnv, getGlobal
  , compile, gCodeToString, stdLib
  )

import Frontend exposing (..)
import Dict as Dict
import Dict exposing (Dict)
import Basics.Extra exposing (uncurry)

type alias Name = String

{-| instructions for the abstract GMachine

PUSHGLOBAL name   - push a reference to a global supercombinator to the stack

PUSHLOCAL offset  - push the value at some offset from the top of the stack to the top

PUSHARG k         - given the application node at offset k, push the pointer to its argument

PUSHINT x         - push a reference to a new cell containing the integer x

ALLOC k           - allocate k hole nodes and push references of them onto the stack

UPDATE k          - replace the cell referenced at stack position k with the value referenced at the top of the stack

POP k             - pop k cells from the stack

MKAP              - pop 2 values from the stack, construct an application node from them, push its reference to the stack

SLIDE k           - save the stack's top value, pop k+1 cells from the stack, push the saved value
-}
type GCode
  = PUSHGLOBAL Name
  | PUSHARG Int
  | PUSHLOCAL Int
  | PUSHINT Int
  | ALLOC Int
  | EVAL
  | UNWIND
  | UPDATE Int
  | POP Int
  | MKAP
  | SLIDE Int
  | ADD | SUB | MUL | DIV | EQU

gCodeToString : GCode -> String
gCodeToString instruction = case instruction of
  ALLOC n         -> "ALLOC " ++ String.fromInt n
  PUSHGLOBAL name -> "PUSHGLOBAL " ++ name
  EVAL            -> "EVAL"
  UNWIND          -> "UNWIND"
  UPDATE i        -> "UPDATE " ++ String.fromInt i
  POP n           -> "POP " ++ String.fromInt n
  PUSHLOCAL i     -> "PUSHLOCAL " ++ String.fromInt i
  PUSHARG i       -> "PUSHARG " ++ String.fromInt i
  PUSHINT i       -> "PUSHINT " ++ String.fromInt i
  MKAP            -> "MKAP"
  SLIDE n         -> "SLIDE " ++ String.fromInt n
  ADD             -> "ADD"
  SUB             -> "SUB"
  MUL             -> "MUL"
  DIV             -> "DIV"
  EQU             -> "EQU"

type alias Global = {name : Name, numFormals : Int, code : List GCode}

type CompilerError
  = SuperCombinatorNameClash Name
  | CannotFindMainFunction
  | MainFunctionCannotHaveFormals
  | ParseFailure ParseFailure

type alias Env = Dict Name Global

emptyEnv = Dict.empty

getGlobal = Dict.get

defineGlobal : Global -> Env -> Result CompilerError Env
defineGlobal global env = case getGlobal global.name env of
  Just existingGlobal -> Err (SuperCombinatorNameClash global.name)
  Nothing -> Ok <| Dict.insert global.name global env


stdLib : Env
stdLib = List.foldl
  (\def -> Dict.insert def.name def)
  emptyEnv
  [ Global "+" 2 [PUSHARG 2, EVAL, PUSHARG 2, EVAL, ADD, UPDATE 3, POP 2, UNWIND]
  , Global "-" 2 [PUSHARG 2, EVAL, PUSHARG 2, EVAL, SUB, UPDATE 3, POP 2, UNWIND]
  , Global "*" 2 [PUSHARG 2, EVAL, PUSHARG 2, EVAL, MUL, UPDATE 3, POP 2, UNWIND]
  , Global "/" 2 [PUSHARG 2, EVAL, PUSHARG 2, EVAL, DIV, UPDATE 3, POP 2, UNWIND]
  , Global "==" 2 [PUSHARG 2, EVAL, PUSHARG 2, EVAL, EQU, UPDATE 3, POP 2, UNWIND]
  ]

compileASTs : List SuperCombinator -> Result CompilerError Env
compileASTs = List.foldl
  (compileSuperCombinator >> defineGlobal >> Result.andThen)
  (Ok emptyEnv)

{-| compile the source code
-}
compile : String -> Result CompilerError Env
compile = parse 
  >> Result.mapError ParseFailure
  >> Result.andThen compileASTs

{-| mapping of formal parameters to their position on the stack
  (where the base of the stack is position 0)
-}
type alias FormalMapping = Dict Name Int

{-| size of the current stack context
-}
type alias Context = Int

formalsToStackPosition : List Name -> FormalMapping
formalsToStackPosition formals =
  let num = List.length formals
  in List.indexedMap (\i name -> (name, num - i)) formals
      |> Dict.fromList


getStackPos : Name -> FormalMapping -> Maybe Int
getStackPos name mapping = Dict.get name mapping

compileSuperCombinator : SuperCombinator -> Global
compileSuperCombinator (SC name formals body) =
  let numFormals = Dict.size stackPositionsOfFormals
      stackPositionsOfFormals = formalsToStackPosition formals
  in {name=name, numFormals=numFormals, code=compileBody body stackPositionsOfFormals numFormals}

compileBody : SCExpr -> FormalMapping -> Context -> List GCode
compileBody body stackPos context = compileInstantiation body context stackPos context
  ++ [ UPDATE (context + 1) ]  -- overwrite pointer of redex root to root of new instance
  ++ (if context == 0 then [] else [ POP context ]) -- POP arguments off the stack
  ++ [ UNWIND ]                -- continue next reduction

{-|
generate the G-code for instantiating an expression into the graph
-}
compileInstantiation : SCExpr -> Int -> FormalMapping -> Context -> List GCode
compileInstantiation e numFormals mapping context = case e of
    SCIdent name -> case getStackPos name mapping of
      -- if the name is a formal parameter, push a pointer to it onto the stack
      -- how to know if it is an argument or not?
      Just offset -> [ PUSHARG (context - offset + 1) ]

      -- otherwise, assume it is a global function
      Nothing -> [ PUSHGLOBAL name ]
    
    SCInt x -> [ PUSHINT x ]
    
    SCApp e1 e2   ->
      compileInstantiation e2 numFormals mapping context
      ++ compileInstantiation e1 numFormals mapping (context + 1)
      ++ [MKAP]
    
    SCLet (name, def_) body ->
      compileInstantiation def_ numFormals mapping context
      ++ compileInstantiation body numFormals (Dict.insert name (context + 1) mapping) (context + 1)
      ++ [SLIDE 1]

    SCLetRec bindings body ->
      let mapping_ = augmentMapping bindings mapping context
          context_ = context + List.length bindings
      in
      compileLetRecBindings bindings numFormals mapping_ context_
      ++ compileInstantiation body numFormals mapping_ context_
      ++ [SLIDE (context_ - context)]

{-| remake the stack mapping for a list of new bindings in a letrec expression
-}
augmentMapping : List Binding -> FormalMapping -> Context -> FormalMapping
augmentMapping bindings mapping context = List.indexedMap
  (\i (name,_) -> (name, i + context + 1)) bindings
  |> List.foldl (uncurry Dict.insert) mapping

compileLetRecBindings : List Binding -> Int -> FormalMapping -> Context -> List GCode
compileLetRecBindings bindings numFormals mapping context =
  let numBindings = List.length bindings
  in
  [ALLOC numBindings] :: (
    List.indexedMap
    (\i (name, e) -> compileInstantiation e numFormals mapping context ++ [UPDATE (numBindings - i)])
    bindings
  ) |> List.concat
