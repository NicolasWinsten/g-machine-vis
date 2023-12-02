module Funcs exposing (..)

{-| apply a function N times
-}
applyN : (a -> a) -> Int -> a -> a
applyN f num initial = if num <= 0 then initial else applyN f (num - 1) (f initial)

when : Bool -> (a -> a) -> a -> a
when cond f x = if cond then f x else x
