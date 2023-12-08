module TestMachine exposing (..)

import Expect exposing (Expectation)
import Test exposing (..)
import Frontend exposing (..)
import Backend exposing (..)
import GMachine exposing (..)
import Dict
import Dict.Extra
import Debug
import List.Nonempty as Nonempty

type TestOutput
    = TFunc String
    | TInt Int

global : String -> Int -> List GCode -> Global
global name numFormals code = Global name numFormals
    ( Maybe.withDefault
        (Nonempty.singleton (PUSHGLOBAL "ERROR: SUPPLY INSTRUCTIONS IN TEST"))
        (Nonempty.fromList code)
    )

expectOutput : TestOutput -> GMachine -> Expectation
expectOutput expected machine = case runMachine machine of
    Ok (nodeId, graph) -> case (expected, Dict.get nodeId graph) of
        (TFunc expectedFunc, Just (GFunc {name})) -> Expect.equal expectedFunc name
        (TInt expectedInt, Just (GInt actualInt)) -> Expect.equal expectedInt actualInt
        (_, actualResult) -> Expect.fail ("actual result is " ++ Debug.toString actualResult)
    Err runtimeErr -> Expect.fail (Debug.toString runtimeErr)


testParse : String -> List SuperCombinator -> Test
testParse source expectedASTs = test ("parse result of " ++ source)
    (\_ -> Expect.equal (Ok expectedASTs) (parse source))

testCompilationToGCode : String -> List Global -> Test
testCompilationToGCode source expectedGCodes = test ("compile result of " ++ source)
    (\_ -> Expect.equal (Ok <| mkEnv expectedGCodes) (compile source))

testRun : String -> TestOutput -> Test
testRun source expectedOutput = test ("runtime result of " ++ source)
    (\_ -> case createMachine source of
        Ok machine -> expectOutput expectedOutput machine
        Err _ -> Expect.fail "failed to compile"
    )

{-| test source code that I expect to parse and compile and execute successfully
-}
whiteTest : String -> List SuperCombinator -> List Global -> TestOutput -> Test
whiteTest source expectedASTs expectedGCodes expectedResult =
    describe source <|
    [ testParse source expectedASTs
    , testCompilationToGCode source expectedGCodes
    , testRun source expectedResult
    ]

mkEnv : List Global -> Env
mkEnv = Dict.Extra.fromListBy .name

simple : Test
simple = whiteTest
    """
f x = x
main = f f
    """
    [ SC "f" ["x"] (SCIdent "x")
    , SC "main" [] (SCApp (SCIdent "f") (SCIdent "f"))
    ]
    [ global "f" 1 [PUSHARG 1, UPDATE 2, POP 1, UNWIND]
    , global "main" 0 [PUSHGLOBAL "f", PUSHGLOBAL "f", MKAP, UPDATE 1, UNWIND]
    ]
    (TFunc "f")


simple2 : Test
simple2 = whiteTest
    """
identity item = item
always x ignore = x
sub x y z = x z (y z)
main = (sub (always  ) always) (  identity sub  )
    """
    [ SC "identity" ["item"] (SCIdent "item")
    , SC "always"   ["x", "ignore"] (SCIdent "x")
    , SC "sub"      ["x", "y", "z"] (SCApp (SCApp (SCIdent "x") (SCIdent "z")) (SCApp (SCIdent "y") (SCIdent "z")))
    , SC "main" []
        (SCApp
            (SCApp
                (SCApp (SCIdent "sub") (SCIdent "always"))
                (SCIdent "always")
            )
            (SCApp (SCIdent "identity") (SCIdent "sub"))
        )
    ]
    [ global "identity" 1 [PUSHARG 1, UPDATE 2, POP 1, UNWIND]
    , global "always" 2 [PUSHARG 1, UPDATE 3, POP 2, UNWIND]
    , global "sub" 3 [PUSHARG 3, PUSHARG 3, MKAP, PUSHARG 4, PUSHARG 3, MKAP, MKAP, UPDATE 4, POP 3, UNWIND]
    , global "main" 0
        [ PUSHGLOBAL "sub", PUSHGLOBAL "identity", MKAP
        , PUSHGLOBAL "always", PUSHGLOBAL "always", PUSHGLOBAL "sub", MKAP, MKAP, MKAP
        , UPDATE 1, UNWIND
        ]
    ]
    (TFunc "sub")


simpleMath : Test
simpleMath = testRun
    """
min x y = x-y
double x=x+x
main = double (min 10 3)
    """
    (TInt 14)

simpleMath2 : Test
simpleMath2 = testRun
    """
double x = x + x
negate x = 0 - x
main = 1 - 2 - 3 == double (negate 2)
    """
    (TInt 1)

