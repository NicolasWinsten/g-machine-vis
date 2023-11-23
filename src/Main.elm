module Main exposing (..)

import Browser
import Element as E
import Element.Input as EI
import Element.Font as Font
import Element.Background as Background
import Element.Border as Border
import Colors.Opaque as Color
import Color as C
import GMachine as G
import Dagre as D
import Dagre.Attributes as DA
import Render as R
import Render.StandardDrawers as RSD
import Render.StandardDrawers.Attributes as RSDA
import Render.StandardDrawers.Types as RSDT
import TypedSvg.Core exposing (Svg)
import TypedSvg as Svg
import TypedSvg.Attributes as SvgA
import TypedSvg.Types as SvgT
import Result.Extra
import Basics.Extra exposing (flip)
import Backend
import Graph
import Dict
import Html.Attributes
import Html
import Browser.Events exposing (onResize)
import Task
import Browser.Dom exposing (getViewport)

type MachineViewState
  = StaticView G.RuntimeResult
  | FailedToCompile Backend.CompilerError
  -- | TransitioningLayout {oldLayout : (), machine : G.GMachine}
  | Uninitialized

type alias Model =
  { sourceCode : String
  , machine : MachineViewState
  , viewport : {width : Int, height : Int}
  }

setMachineState : MachineViewState -> Model -> Model
setMachineState state model = { model | machine=state }

type Msg
  = ClickedCompile
  | ChangedSourceCode String
  | ClickedStep
  | WindowResized Int Int


initialProgram =
  """
I x = x

K x y = x

S x y z = (x z) (y z)

main = S I I K
"""

compileSourceCode : Model -> Model
compileSourceCode model = Result.Extra.unpack
    (\err -> setMachineState (FailedToCompile err) model)
    (\compiledMachine -> setMachineState (StaticView <| G.Running compiledMachine) model)
    (G.createMachine model.sourceCode)

init =
  ( compileSourceCode {sourceCode=initialProgram, machine=Uninitialized, viewport={width=0,height=0}}
  , Task.perform
    (\{viewport} -> WindowResized (round viewport.width) (round viewport.height))
    getViewport
  )



update msg model = case msg of
  ClickedCompile -> (compileSourceCode model, Cmd.none)

  ChangedSourceCode src -> ({model | sourceCode=src}, Cmd.none)

  ClickedStep -> case model.machine of
    StaticView machine -> case machine of
      G.Running gmachine -> (setMachineState (StaticView <| G.step gmachine) model, Cmd.none)
      _ -> (model, Cmd.none)
    _ -> (model, Cmd.none)
  
  WindowResized w h -> ({ model | viewport={width=w, height=h}}, Cmd.none)

disabledButtonStyle =
  [ Border.color Color.grey
  , Border.width 2
  , Border.rounded 2  
  --, height (px 32)
  , E.padding 1
  , Font.size 16
  , Font.color Color.grey
  ]

buttonStyle =
  [ Background.color Color.floralwhite
  , Border.width 2
  , Border.rounded 2  
  --, height (px 32)
  , E.padding 3
  , Font.size 16
  , E.mouseOver [Border.glow Color.grey 2]
  , E.mouseDown [E.scale 1.1]
  ]

compileButton = EI.button buttonStyle
  { onPress = Just ClickedCompile
  , label = E.text "compile"
  }

stepButton = EI.button buttonStyle
  { onPress = Just ClickedStep
  , label = E.text "step"
  }

fillWidth = E.width E.fill
fillHeight = E.height E.fill

{-| 

-}
sourceCodeTextArea src = EI.multiline
  [fillHeight, fillWidth]
  { onChange = ChangedSourceCode
  , text = src
  , placeholder = Just (EI.placeholder [] (E.text "source code here"))
  , label = EI.labelHidden "source code"
  , spellcheck = False
  }
  |> E.el [E.scrollbarY, fillHeight, fillWidth]

getChildren : G.GNode -> List G.NodeId
getChildren node = case node of
  G.GApp left right -> [left, right]
  _ -> []

getNodes : G.GGraph -> List (Graph.Node G.GNode)
getNodes = Dict.toList >> List.map (\(id, node) -> {id=id, label=node})

getEdges : G.GGraph -> List (Graph.Edge ())
getEdges graph = Dict.toList graph
  |> List.concatMap (\(id, node) ->
    List.map (\child -> {from=id, to=child, label=()}) (getChildren node)
  )

runLayout : G.GGraph -> D.GraphLayout
runLayout graph =
  let nodes = getNodes graph
      edges = getEdges graph
  in D.runLayout
    [DA.nodeSep 15, DA.width 5, DA.height 5, DA.rankSep 15]
    (Graph.fromNodesAndEdges nodes edges)

nodeLabel : Graph.Node G.GNode -> String
nodeLabel node = case node.label of
  G.GFunc {name} -> name
  G.GApp _ _ -> "@"
  G.GHole -> ""


nodeShape : Graph.Node G.GNode -> RSDT.Shape
nodeShape node = case node.label of
  G.GHole -> RSDT.RoundedBox 1
  _ -> RSDT.NoShape


drawNode : Graph.Node G.GNode -> D.GraphLayout -> Svg msg
drawNode node layout = case Dict.get node.id layout.coordDict of
  Just coord -> RSD.svgDrawNode
    [ RSDA.label nodeLabel, RSDA.fontSize 5, RSDA.shape nodeShape ]
    { node=node, coord=coord, width=5, height=5}
  Nothing -> Svg.text_ [] [TypedSvg.Core.text "failed to draw node"]

drawEdge : Graph.Edge () -> D.GraphLayout -> Svg msg
drawEdge e {coordDict, controlPtsDict} =
  let sourceCoords = Dict.get e.from coordDict
      targetCoords = Dict.get e.to coordDict
      ctrlPts = Dict.get (e.from, e.to) controlPtsDict
        |> Maybe.map (List.filterMap (flip Dict.get coordDict))
  in case (sourceCoords, targetCoords, ctrlPts) of
    (Just source, Just target, Just controlPts) -> RSD.svgDrawEdge
      [ RSDA.arrowHead RSDT.Vee, RSDA.linkStyle RSDT.Spline
      , RSDA.strokeWidth (always 0.5), RSDA.strokeColor (always C.black)
      ]
      {edge=e, source=source, target=target, controlPts=controlPts, sourceDimensions=(5,5), targetDimensions=(5,5)}
    _ -> Svg.text_ [] [TypedSvg.Core.text "failed to draw edge"]

drawGraph : G.GGraph -> D.GraphLayout -> Svg msg
drawGraph g layout =
  let nodes = List.map (flip drawNode layout) (getNodes g)
      edges = List.map (flip drawEdge layout) (getEdges g)
  in Svg.g [] (edges ++ nodes)

{-| flip the layout horizontally across its barycenter -}
flipLayout : D.GraphLayout -> D.GraphLayout
flipLayout layout =
  let sumOfXCoords = Dict.values layout.coordDict
        |> List.map Tuple.first
        |> List.sum
      
      numNodes = Dict.size layout.coordDict
      avg = sumOfXCoords / toFloat numNodes

      flipCoordAcrossAvg (x, y) = (2 * avg - x, y)
  in { layout | coordDict=Dict.map (always flipCoordAcrossAvg) layout.coordDict}

{-| scale the layout to fit the new dimensions -}
fitLayout : Float -> Float -> D.GraphLayout -> D.GraphLayout
fitLayout w h layout =
  let
      scaleX = w / layout.width
      scaleY = h / layout.height
      scale (x_, y_) = (scaleX * x_, scaleY * y_)
  in { layout
    | width=w
    , height=h
    , coordDict=Dict.map (always scale) layout.coordDict
    }

translateLayout : Float -> Float -> D.GraphLayout -> D.GraphLayout
translateLayout dx dy layout =
  { layout | coordDict=Dict.map (\_ (x,y) -> (x + dx, y + dy)) layout.coordDict }

drawMachine : G.GMachine -> Svg msg
drawMachine machine =
  let
    width = 100
    height = 100
    stackWidthPct = 0.15 -- pct of width to be taken up by stack
    layout = runLayout machine.graph
        |> flipLayout
        |> fitLayout ((1 - stackWidthPct) * width) height
        |> translateLayout (stackWidthPct * width) 0

  in Svg.svg
    [ SvgA.viewBox 0 0 width height
    , Html.Attributes.style "height" "100%"
    , Html.Attributes.style "width" "100%"
    , Html.Attributes.style "border" "solid"
    ]
    [ drawGraph machine.graph layout
    , drawStack machine layout (stackWidthPct * width)
    ]


drawCell : Float -> Float -> Float -> Float -> Svg msg
drawCell x y w h = Svg.rect
  [ SvgA.stroke <| SvgT.Paint C.black
  , SvgA.strokeWidth <| SvgT.Px 0.25
  , SvgA.fill <| SvgT.PaintNone
  , SvgA.x <| SvgT.Px x
  , SvgA.y <| SvgT.Px y
  , SvgA.width <| SvgT.Px w
  , SvgA.height <| SvgT.Px h
  ]
  []

drawPointer : {source : (Float, Float), target : (Float, Float), agletLength : Float} -> Svg msg
drawPointer {source, target, agletLength} =
  let dummyEdge = {label=(), from=0, to=1}
  in RSD.svgDrawEdge
      [ RSDA.arrowHead RSDT.Triangle, RSDA.linkStyle RSDT.Spline
      , RSDA.strokeWidth (always 0.2), RSDA.strokeColor (always C.blue)
      ]
      {edge=dummyEdge, source=source, target=target
      , controlPts=[(Tuple.first source + agletLength, Tuple.second source)]
      , sourceDimensions=(0,0), targetDimensions=(5,5)
      }

drawStack : G.GMachine -> D.GraphLayout -> Float -> Svg msg
drawStack {stack} {coordDict} cellWidth =
  let
    cellHeight = cellWidth * 0.5
    cells = List.indexedMap (\i nodeid -> case Dict.get nodeid coordDict of
        Just (nodeX,nodeY) ->
          [ drawCell 0 (cellHeight * toFloat i) cellWidth cellHeight
          , drawPointer
            { source=(0 + cellWidth/2, cellHeight * toFloat i + cellHeight/2)
            , target=(nodeX, nodeY)
            , agletLength=5
            }
          ]
        Nothing -> [Svg.text_ [] [TypedSvg.Core.text "Failure drawing cell"]]
      )
      (List.reverse stack)
      |> List.concat
  in Svg.g [] cells

-- TODO remove this function
drawTerminatedMachine : G.NodeId -> G.GGraph -> Svg msg
drawTerminatedMachine node graph =
  let layout = flipLayout <| runLayout graph
  in Svg.svg [SvgA.viewBox 0 0 layout.width layout.height] [drawGraph graph layout]

viewMachine : MachineViewState -> E.Element msg
viewMachine machine = case machine of
  StaticView (G.Running gmachine) -> E.html (drawMachine gmachine)
  StaticView (G.Terminated nodeId graph) -> 
    drawTerminatedMachine nodeId graph
    |> E.html
  StaticView (G.Crash err) -> E.text "runtime error"
  FailedToCompile err -> E.text "failed to compile"
  Uninitialized -> E.text "Write your program and click compile!"

gCodeToString : Backend.GCode -> String
gCodeToString instruction = case instruction of
  Backend.ALLOC n         -> "ALLOC " ++ String.fromInt n
  Backend.PUSHGLOBAL name -> "PUSHGLOBAL " ++ name
  Backend.EVAL            -> "EVAL"
  Backend.UNWIND          -> "UNWIND"
  Backend.UPDATE i        -> "UPDATE " ++ String.fromInt i
  Backend.POP n           -> "POP " ++ String.fromInt n
  Backend.PUSH i          -> "PUSH " ++ String.fromInt i
  Backend.MKAP            -> "MKAP"
  Backend.SLIDE n         -> "SLIDE " ++ String.fromInt n

viewCode : List Backend.GCode -> E.Element msg
viewCode code = E.column [fillHeight, fillWidth]
  (List.map (gCodeToString >> E.text) code) 

view : Model -> E.Element Msg
view {sourceCode, machine, viewport} =
    E.row [fillWidth, fillHeight, Font.family [Font.monospace]]
    [ E.column [E.width (E.fillPortion 2), fillHeight, E.explain Debug.todo]
        [ sourceCodeTextArea sourceCode
        , E.row [] [compileButton, stepButton]
        ]
    , case machine of
        StaticView (G.Running {code}) -> E.el [E.width (E.fillPortion 2), fillHeight] (viewCode code)
        _ -> E.none
    , E.el [E.width (E.fillPortion 5), E.height (E.maximum viewport.height E.fill), E.explain Debug.todo]
      (viewMachine machine) 
    ]

subscriptions : Model -> Sub Msg
subscriptions model = onResize WindowResized

main : Program () Model Msg
main = Browser.element
  { init = \_ -> init
  , view = E.layout [] << view
  , update = update
  , subscriptions = subscriptions
  }