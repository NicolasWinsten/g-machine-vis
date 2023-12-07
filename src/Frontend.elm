module Frontend exposing (SCExpr(..), SuperCombinator(..), Binding, ParseFailure, parse)

import Parser exposing (Parser, (|.), (|=), succeed, spaces, variable, symbol, lazy)
import Parser.Extras exposing (some)
import Set
import Parser exposing (DeadEnd)
import Basics.Extra exposing (flip)
import Result.Extra
import String.Extra
import Parser exposing (getChompedString, oneOf)

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
  | SCInt Int


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

intLit : Parser SCExpr
intLit = Parser.number
  { int = Just SCInt
  , float = Nothing
  , hex = Nothing
  , octal = Nothing
  , binary = Nothing
  }

term : Parser SCExpr
term = Parser.oneOf [scident, intLit, group]

{-| parse a series of expression applications of the form: e1 e2 e3 ...

resulting in: ... SCApp (SCApp e1 e2) e3 ...
-}
app : Parser SCExpr
app = some (term |. spaces)
  |> Parser.map (\(t1, rest) -> List.foldl (flip SCApp) t1 rest)

{-| parse multiplication or division expression
-}
arith1 : Parser SCExpr
arith1 =
  let operation = succeed (\left op right -> SCApp (SCApp (SCIdent op) left) right)
        |= app
        |. spaces
        |= getChompedString (oneOf [symbol "*", symbol "/"])
        |. spaces
        |= app
  in oneOf [Parser.backtrackable operation, app]

{-| parse addition or subtraction expression
-}
arith : Parser SCExpr
arith =
  let operation = succeed (\left op right -> SCApp (SCApp (SCIdent op) left) right)
        |= arith1
        |. spaces
        |= getChompedString (oneOf [symbol "+", symbol "-"])
        |. spaces
        |= arith1
  in oneOf [Parser.backtrackable operation, arith1]

expr : Parser SCExpr
expr = arith

type alias ParseFailure = List DeadEnd

parse : String -> Result (List DeadEnd) (List SuperCombinator)
parse sourceProgram = String.lines sourceProgram
  |> List.filter (not << String.Extra.isBlank)
  |> List.map (Parser.run def)
  |> Result.Extra.combine