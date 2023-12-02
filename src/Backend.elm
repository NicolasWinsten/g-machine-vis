module Backend exposing
  ( CompilerError(..), GCode(..), Global
  , Env, emptyEnv, getGlobal, defineGlobal
  , compile
  )

import Frontend exposing (..)
import Dict as Dict
import Dict exposing (Dict)
import Basics.Extra exposing (uncurry)

type alias Name = String

{-| instructions for the abstract GMachine
-}
type GCode
  = PUSHGLOBAL Name
  | ALLOC Int
  | EVAL
  | UNWIND
  | UPDATE Int
  | POP Int
  | PUSHARG Int
  | PUSHLOCAL Int
  | MKAP
  | SLIDE Int

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

-- TODO check for name duplication
-- TODO check for main function
-- TODO check that main function has no formals
compileASTs : List SuperCombinator -> Result CompilerError Env
compileASTs = List.foldl
  (compileSuperCombinator >> defineGlobal >> Result.andThen)
  (Ok emptyEnv) -- TODO replace with standard environment containing built-ins 



{-| compile the source code into an initialized G-Machine ready to execute it
-}
compile : String -> Result CompilerError Env
compile source = parse source
  |> Result.mapError ParseFailure
  |> Result.andThen compileASTs

{-| mapping of formal parameters to their position on the stack
  (where the base of the stack is position 0)
-}
type alias FormalMapping = Dict Name Int

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
compileBody body stackPos context = compileInstantiation body stackPos context
  ++ [ UPDATE (context + 1) ]  -- overwrite pointer of redex root to root of new instance
  ++ (if context == 0 then [] else [ POP context ]) -- POP arguments off the stack
  ++ [ UNWIND ]                -- continue next reduction

{-|
generate the G-code for instantiating an expression into the graph
-}
compileInstantiation : SCExpr -> FormalMapping -> Context -> List GCode
compileInstantiation e mapping context = case e of
    SCIdent name -> case getStackPos name mapping of
      -- if the name is a formal parameter, push a pointer to it onto the stack
      Just offset ->
        let numArgs = Dict.size mapping
        in
        if offset <= numArgs
        then [PUSHARG (context - offset)]
        else [PUSHLOCAL (context - offset)] -- TODO when is this instruction ever compiled?

      -- otherwise, assume it is a global function
      Nothing -> [PUSHGLOBAL name]
    
    SCApp e1 e2   ->
      compileInstantiation e2 mapping context
      ++ compileInstantiation e1 mapping (context + 1)
      ++ [MKAP]
    
    SCLet (name, def_) body ->
      compileInstantiation def_ mapping context
      ++ compileInstantiation body (Dict.insert name (context + 1) mapping) (context + 1)
      ++ [SLIDE 1]

    SCLetRec bindings body ->
      let mapping_ = augmentMapping bindings mapping context
          context_ = context + List.length bindings
      in
      compileLetRecBindings bindings mapping_ context_
      ++ compileInstantiation body mapping_ context_
      ++ [SLIDE (context_ - context)]

{-| remake the stack mapping for a list of new bindings in a letrec expression
-}
augmentMapping : List Binding -> FormalMapping -> Context -> FormalMapping
augmentMapping bindings mapping context = List.indexedMap
  (\i (name,_) -> (name, i + context + 1)) bindings
  |> List.foldl (uncurry Dict.insert) mapping

compileLetRecBindings : List Binding -> FormalMapping -> Context -> List GCode
compileLetRecBindings bindings mapping context =
  let numBindings = List.length bindings
  in
  [ALLOC numBindings] :: (
    List.indexedMap
    (\i (name, e) -> compileInstantiation e mapping context ++ [UPDATE (numBindings - i)])
    bindings
  ) |> List.concat
