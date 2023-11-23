module Funcs exposing (..)

{-| apply a function N times
-}
applyN : (a -> a) -> Int -> a -> a
applyN f num initial = if num <= 0 then initial else applyN f (num - 1) (f initial) 