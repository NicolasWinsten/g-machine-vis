module Frontend exposing (SCExpr(..), SuperCombinator(..), Binding, ParseFailure, parse)

import Parser exposing (Parser, (|.), (|=), succeed, spaces, variable, symbol, lazy)
import Parser.Extras exposing (some)
import Set
import Parser exposing (DeadEnd)
import Basics.Extra exposing (flip)
import Result.Extra
import String.Extra

{-
this module parses source code to ASTs
-}

type alias Name = String

type alias Formals = List Name

type alias Binding = (Name, SCExpr)

{-| possible expressions for a supercombinator
-}
type SCExpr
  = SCIdent Name
  | SCApp SCExpr SCExpr
  | SCLet Binding SCExpr
  | SCLetRec (List Binding) SCExpr


type SuperCombinator = SC Name Formals SCExpr

identifier : Parser Name
identifier = variable
  { start = Char.isAlpha
  , inner = \c -> Char.isAlphaNum c || c == '_'
  , reserved = Set.empty
  }

{-| parse a space separated list of identifiers
-}
formalsList : Parser (List Name)
formalsList = Parser.sequence
  { start=""
  , separator=""
  , end=""
  , spaces=spaces
  , item=identifier
  , trailing=Parser.Mandatory
  }

def : Parser SuperCombinator
def = succeed SC
  |= identifier
  |= formalsList
  |. spaces
  |. symbol "="
  |. spaces
  |= expr
  |. Parser.end

scident : Parser SCExpr
scident = Parser.map SCIdent identifier

-- lambda : Parser Term
-- lambda = succeed (\formals body -> List.foldr Abs body formals)
--   |. symbol "\\"
--   |. spaces
--   |= formalsList
--   |. spaces
--   |. symbol "."
--   |. spaces
--   |= lazy (\_ -> expr)

{-| parse an expression within parentheses
-}
group : Parser SCExpr
group = succeed identity
  |. symbol "("
  |. spaces
  |= lazy (\_ -> expr)
  |. spaces
  |. symbol ")"
term : Parser SCExpr
term = Parser.oneOf [scident, group]

{-| parse a series of expression applications of the form: e1 e2 e3 ...

resulting in: ... SCApp (SCApp e1 e2) e3 ...
-}
expr : Parser SCExpr
expr = some (term |. spaces)
  |> Parser.map (\(t1, rest) -> List.foldl (flip SCApp) t1 rest)


type alias ParseFailure = List DeadEnd

parse : String -> Result (List DeadEnd) (List SuperCombinator)
parse sourceProgram = String.lines sourceProgram
  |> List.filter (not << String.Extra.isBlank)
  |> List.map (Parser.run def)
  |> Result.Extra.combine