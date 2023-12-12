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
import Render.StandardDrawers as RSD
import Render.StandardDrawers.Attributes as RSDA
import Render.StandardDrawers.Types as RSDT
import TypedSvg.Core exposing (Svg)
import TypedSvg as Svg
import TypedSvg.Attributes as SvgA
import TypedSvg.Types as SvgT
import Result.Extra
import Basics.Extra exposing (flip, atMost)
import Backend
import Dict exposing (Dict)
import Html.Attributes
import Browser.Events exposing (onResize)
import Task
import Browser.Dom exposing (getViewport)
import ZipList exposing (ZipList, ZipList(..))
import Force
import Dict.Extra
import Monocle.Optional as Optional exposing (Optional)
import Monocle.Lens as Lens exposing (Lens)
import Math.Vector2 as V exposing (Vec2)
import Maybe.Extra
import Graph exposing (Graph)
import IntDict


type alias NodeEntity = Force.Entity G.HeapAddr { value : G.GNode }

type Side = Left | Right

type alias Edge = Graph.Edge Side

type alias Node = Graph.Node NodeEntity

type alias GraphLayout = Graph NodeEntity Side

type alias MachineView =
  { runtime : G.RuntimeResult, layout : GraphLayout, forceSim : Force.State G.HeapAddr }

type ProgramView = Uninitialized | Running MachineView | CompilationError Backend.CompilerError

type alias ViewPort = {width : Int, height : Int}

type alias Model =
  { sourceCode : String
  , program : ProgramView
  , viewport : ViewPort
  }

type Msg
  = ClickedCompile
  | ChangedSourceCode String
  | ClickedStep
  | WindowResized Int Int
  | AnimationFrame

runtimeResultToGMachine : Lens G.RuntimeResult G.GMachine
runtimeResultToGMachine = Lens Tuple.first (\m (_, u) -> (m,u))

machineViewToRuntimeResult : Lens MachineView G.RuntimeResult
machineViewToRuntimeResult = Lens .runtime (\r m -> {m | runtime=r})

accessLayout : Lens MachineView GraphLayout
accessLayout = Lens .layout (\l m -> {m | layout=l})

accessProgram : Lens Model ProgramView
accessProgram = Lens .program (\p m -> {m | program=p})

programToMachineView : Optional ProgramView MachineView
programToMachineView = Optional
  (\p -> case p of
    Running m -> Just m
    _ -> Nothing
  )
  (\m _ -> Running m)

accessMachineView : Optional Model MachineView
accessMachineView = Optional.compose (Optional.fromLens accessProgram) programToMachineView

accessGMachine : Lens MachineView G.GMachine
accessGMachine = Lens.compose machineViewToRuntimeResult runtimeResultToGMachine

insertNode : G.HeapAddr -> G.GNode -> GraphLayout -> GraphLayout
insertNode id node =
  let edges = case G.getChildren node of
        Just (left, right) -> IntDict.fromList [(left, Left), (right, Right)]
        Nothing -> IntDict.empty
      
      nodeEntity : Node
      nodeEntity = {id=id, label=Force.entity id node}
  in Graph.insert
    { node=nodeEntity
    , incoming=IntDict.empty
    , outgoing=edges
    }

deleteNodeFromLayout : G.HeapAddr -> GraphLayout -> GraphLayout
deleteNodeFromLayout = Graph.remove

makeForceSim : GraphLayout -> Force.State G.HeapAddr
makeForceSim layout =
  let edges = List.map (\{from, to} -> (from, to)) (Graph.edges layout)

      -- gravitate all nodes towards center to mitigate fly away
      gravitateNodes = List.map
        (\id -> {node=id, strength=0.01, target=0})
        (Graph.nodeIds layout)

  in Force.iterations 1000
  <| Force.simulation
  [ Force.manyBody (Graph.nodeIds layout)
  , Force.links edges
  , Force.center 0 0
  , Force.towardsX gravitateNodes
  , Force.towardsY gravitateNodes
  ]

resetForceSim : MachineView -> MachineView
resetForceSim mview = {mview | forceSim=makeForceSim mview.layout} 

tickForceSim : MachineView -> MachineView
tickForceSim mview =
  let entities = List.map .label (Graph.nodes mview.layout)
      (newSim, newEntities) = Force.tick mview.forceSim entities

      setLabel l ctx = {ctx | node={id=l.id, label=l}}
      newLayout = List.foldl
        (\entity -> Graph.update entity.id (Maybe.map (setLabel entity)))
        mview.layout
        newEntities
  in {mview | layout=newLayout, forceSim=newSim}

updateMachineView : G.MachineUpdate -> MachineView -> MachineView
updateMachineView machineUpdate = case machineUpdate of
  G.NewNodeAllocated id node ->
    Lens.modify accessLayout (insertNode id node)
    >> resetForceSim

  G.HolesAllocated holeNodeIds -> Lens.modify accessLayout
    (\layout -> List.foldl (flip insertNode G.GHole) layout holeNodeIds)
    >> resetForceSim

  G.Multiple update1 update2 -> updateMachineView update1 >> updateMachineView update2

  G.Crash _ -> identity

  G.Output _ -> identity

  G.GarbageCollection refs -> Lens.modify accessLayout
    (\layout -> List.foldl deleteNodeFromLayout layout refs)
    >> resetForceSim

  G.EnteredCode function -> identity

  G.Unwound id -> identity

  G.RedexRootReplaced id node -> Lens.modify accessLayout (insertNode id node)

  G.NoUpdate -> identity


initializeMachineView : G.RuntimeResult -> MachineView
initializeMachineView ((machine, machineUpdate) as result) =
  updateMachineView machineUpdate (MachineView result Graph.empty (makeForceSim Graph.empty))


stepMachineView : MachineView -> MachineView
stepMachineView mview =
  if G.isTermination (Tuple.second mview.runtime)
  then mview
  else let result = G.step (accessGMachine.get mview)
  in mview
  |> machineViewToRuntimeResult.set result
  |> updateMachineView (Tuple.second result)


initialProgram =
  """
double x = x + x

twice f x = f (f x)

main = twice double 2
"""

compileSourceCode : String -> Model -> Model
compileSourceCode sourceCode = Result.Extra.unpack
    (CompilationError >> accessProgram.set)
    (initializeMachineView >> Running >> accessProgram.set)
    (G.createMachine sourceCode)

init =
  ( compileSourceCode initialProgram
    {sourceCode=initialProgram, program=Uninitialized, viewport={width=0,height=0}}
  , Task.perform
    (\{viewport} -> WindowResized (round viewport.width) (round viewport.height))
    getViewport
  )

update : Msg -> Model -> (Model, Cmd msg )
update msg model = case msg of
  ClickedCompile -> (compileSourceCode model.sourceCode model, Cmd.none)

  ChangedSourceCode src -> ({model | sourceCode=src}, Cmd.none)

  ClickedStep -> (Optional.modify accessMachineView stepMachineView model, Cmd.none)
  
  WindowResized w h -> ({ model | viewport={width=w, height=h}}, Cmd.none)

  AnimationFrame -> (Optional.modify accessMachineView tickForceSim model, Cmd.none)

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

sourceCodeTextArea src = EI.multiline
  [fillHeight, fillWidth]
  { onChange = ChangedSourceCode
  , text = src
  , placeholder = Just (EI.placeholder [] (E.text "source code here"))
  , label = EI.labelHidden "source code"
  , spellcheck = False
  }
  |> E.el [E.scrollbarY, fillHeight, fillWidth]


nodeSize = 5

nodeData : Node -> G.GNode
nodeData = .label >> .value

nodeLabelString : G.GNode -> String
nodeLabelString node = case node of
  G.GFunc {name} -> name
  G.GApp _ _ -> "@"
  G.GHole -> "■"
  G.GInt x -> String.fromInt x


nodeShape : G.GNode -> RSDT.Shape
nodeShape node = case node of
  G.GHole -> RSDT.RoundedBox 1
  _ -> RSDT.NoShape

-- TODO have font size get smaller as the layout gets bigger
drawNode : Node -> Svg msg
drawNode ({label} as node) = RSD.svgDrawNode
    [ RSDA.label (nodeData >> nodeLabelString), RSDA.fontSize nodeSize, RSDA.shape (nodeData >> nodeShape) ]
    { node=node, coord=(label.x,label.y), width=nodeSize, height=nodeSize}

-- TODO scale down the arrow stroke width as layout scales
drawEdge : Edge -> GraphLayout -> Svg msg
drawEdge ({from, to} as e) layout =
  let sourceCoords = Graph.get from layout |> Maybe.map (.node >> .label)
      targetCoords = Graph.get to layout |> Maybe.map (.node >> .label)
  in case (sourceCoords, targetCoords) of
    (Just source, Just target) -> RSD.svgDrawEdge
      [ RSDA.arrowHead RSDT.Vee, RSDA.linkStyle RSDT.Spline
      , RSDA.strokeWidth (always 0.5), RSDA.strokeColor (always C.black)
      ]
      { edge=e
      , source=(source.x, source.y), target=(target.x, target.y)
      , controlPts=[], sourceDimensions=(nodeSize,nodeSize), targetDimensions=(nodeSize,nodeSize)
      }
    _ -> Svg.text_ [] [TypedSvg.Core.text "failed to draw edge"]

drawGraph : GraphLayout -> Svg msg
drawGraph layout =
  let nodes = List.map drawNode (Graph.nodes layout)
      edges = List.map (flip drawEdge layout) (Graph.edges layout)
  in Svg.g [] (edges ++ nodes)

layoutDimensions : GraphLayout -> {width : Float, height : Float}
layoutDimensions layout =
  let entities = Graph.nodes layout
      xvals = List.map (.label >> .x) entities
      yvals = List.map (.label >> .x) entities
      min = List.minimum >> Maybe.withDefault 0
      max = List.maximum >> Maybe.withDefault 0
      (maxX, minX) = (max xvals, min xvals)
      (maxY, minY) = (max yvals, min yvals)
  in {width=maxX - minX + nodeSize, height=maxY - minY + nodeSize}

{-| scale the layout to fit the new dimensions, assuming the layout is centered at (0,0) -}
-- fitLayout : Float -> Float -> GraphLayout -> GraphLayout
-- fitLayout w h layout =
--   let {width, height} = layoutDimensions layout
--       scaleX = w / width 
--       scaleY = h / height 
--   in scaleLayout scaleX scaleY layout

-- scaleLayout : Float -> Float -> GraphLayout -> GraphLayout
-- scaleLayout sx sy =
--   let scale n = {n | x=n.x * sx, y=n.y * sy}
--   in Graph.mapNodes scale

translateLayout : Float -> Float -> GraphLayout -> GraphLayout
translateLayout dx dy =
  let translate n = {n | x=n.x + dx, y=n.y + dy}
  in Graph.mapNodes translate

drawMachine : G.GMachine -> GraphLayout -> Svg msg
drawMachine machine layout =
  let
    width = 500
    height = 500
    stackWidthPct = 0.15 -- pct of width to be taken up by stack

    graphWidth = ((1 - stackWidthPct) * width)
    layout_ = layout
        -- |> fitLayout graphWidth height
        |> translateLayout (width/2) (height/2)

  in Svg.svg
    [ SvgA.viewBox 0 0 width height
    , Html.Attributes.style "height" "100%"
    , Html.Attributes.style "width" "100%"
    , Html.Attributes.style "border" "solid"
    ]
    [ drawGraph layout_
    , drawStack machine layout_ (stackWidthPct * width)
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
      , sourceDimensions=(0,0), targetDimensions=(nodeSize, nodeSize)
      }

drawStack : G.GMachine -> GraphLayout -> Float -> Svg msg
drawStack machine layout cellWidth =
  let
    cellHeight = cellWidth * 0.5
    cells = List.indexedMap (\i nodeid -> case Graph.get nodeid layout of
        Just {node} ->
          [ drawCell 0 (cellHeight * toFloat i) cellWidth cellHeight
          , drawPointer
            { source=(0 + cellWidth/2, cellHeight * toFloat i + cellHeight/2)
            , target=(node.label.x, node.label.y)
            , agletLength=5
            }
          ]
        Nothing -> [Svg.text_ [] [TypedSvg.Core.text "Failure drawing cell"]]
      )
      (List.reverse (G.getStack machine))
      |> List.concat
  in Svg.g [] cells


viewMachine : MachineView -> E.Element msg
viewMachine {runtime, layout} =
  let (machine, machineUpdate) = runtime
  in E.html (drawMachine machine layout)

viewProgram : ViewPort -> ProgramView -> E.Element msg
viewProgram viewport program = case program of
  Running machineView ->
    let code = (accessGMachine.get >> G.getCodePtr) machineView
    in E.row [fillHeight, fillWidth]
      [ E.el [fillHeight, E.width (E.fillPortion 2)] (viewCode code)
      , E.el [E.width (E.fillPortion 5), E.height (E.maximum viewport.height E.fill)] (viewMachine machineView)
      ]
  CompilationError err -> E.text "compilation error"
  Uninitialized -> E.text "Write a program on the left window and hit compile"

viewCode : ZipList Backend.GCode -> E.Element msg
viewCode (Zipper past current rest) =
  let toText = Backend.gCodeToString >> E.text
  in E.column [fillHeight, fillWidth] <|
    List.map toText (List.reverse past)
    ++ [E.el [Background.color Color.lime] (toText current)]
    ++ List.map toText rest 

view : Model -> E.Element Msg
view {sourceCode, program, viewport} =
    E.row [fillWidth, fillHeight, Font.family [Font.monospace]]
    [ E.column [E.width (E.fillPortion 2), fillHeight, E.explain Debug.todo]
        [ sourceCodeTextArea sourceCode
        , E.row [] [compileButton, stepButton]
        ]
    , E.el [E.width (E.fillPortion 5), fillHeight, E.explain Debug.todo]
      (viewProgram viewport program) 
    ]

subscriptions : Model -> Sub Msg
subscriptions model =
  let forceSim = model
        |> accessMachineView.getOption
        |> Maybe.map .forceSim
  
      forceSimRunning = forceSim
        |> Maybe.map (not << Force.isCompleted)
        |> Maybe.withDefault False

      tick =
        if forceSimRunning
        then Browser.Events.onAnimationFrame (always AnimationFrame)
        else Sub.none
  in Sub.batch [onResize WindowResized, tick]

main : Program () Model Msg
main = Browser.element
  { init = \_ -> init
  , view = E.layout [] << view
  , update = update
  , subscriptions = subscriptions
  }