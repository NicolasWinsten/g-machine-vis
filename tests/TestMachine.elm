module TestMachine exposing (..)

import Expect exposing (Expectation)
import Test exposing (..)
import Frontend exposing (..)
import Backend exposing (..)
import GMachine exposing (..)
import Dict
import Dict.Extra
import Debug

type TestOutput
    = TFunc String

expectOutput : TestOutput -> GMachine -> Expectation
expectOutput expected machine = case runMachine machine of
    Ok (nodeId, graph) -> case (expected, Dict.get nodeId graph) of
        (TFunc expectedFunc, Just (GFunc {name})) -> Expect.equal expectedFunc name
        (_, actualResult) -> Expect.fail ("actual result is " ++ Debug.toString actualResult)
    Err runtimeErr -> Expect.fail (Debug.toString runtimeErr)


{-| test source code that I expect to parse and compile and execute successfully
-}
successfulTest : String -> List SuperCombinator -> List Global -> TestOutput -> Test
successfulTest source expectedASTs expectedGCodes expectedResult =
    describe source <|
    -- test the parser
    [ test ("parse result of " ++ source)
        (\_ -> Expect.equal (Ok expectedASTs) (parse source))
    -- test the compiler (compiled gcode)
    , test ("compile result of " ++ source)
        (\_ -> Expect.equal (Ok <| mkEnv expectedGCodes) (compile source))
    , test ("runtime result of " ++ source)
        (\_ -> case createMachine source of
            Ok machine -> expectOutput expectedResult machine
            Err _ -> Expect.fail "failed to compile"
        )
    ]

mkEnv : List Global -> Env
mkEnv = Dict.Extra.fromListBy .name

simple : Test
simple = successfulTest
    """
f x = x
main = f f
    """
    [ SC "f" ["x"] (SCIdent "x")
    , SC "main" [] (SCApp (SCIdent "f") (SCIdent "f"))
    ]
    [ Global "f" 1 [PUSH 0, UPDATE 2, POP 1, UNWIND]
    , Global "main" 0 [PUSHGLOBAL "f", PUSHGLOBAL "f", MKAP, UPDATE 1, UNWIND]
    ]
    (TFunc "f")


simple2 : Test
simple2 = successfulTest
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
    [ Global "identity" 1 [PUSH 0, UPDATE 2, POP 1, UNWIND]
    , Global "always" 2 [PUSH 0, UPDATE 3, POP 2, UNWIND]
    , Global "sub" 3 [PUSH 2, PUSH 2, MKAP, PUSH 3, PUSH 2, MKAP, MKAP, UPDATE 4, POP 3, UNWIND]
    , Global "main" 0
        [ PUSHGLOBAL "sub", PUSHGLOBAL "identity", MKAP
        , PUSHGLOBAL "always", PUSHGLOBAL "always", PUSHGLOBAL "sub", MKAP, MKAP, MKAP
        , UPDATE 1, UNWIND
        ]
    ]
    (TFunc "sub")


