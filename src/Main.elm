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
import FeatherIcons as Icons
import Result.Extra
import Basics.Extra exposing (flip, atMost, atLeast)
import Backend
import Dict exposing (Dict)
import Html.Attributes
import Browser.Events exposing (onResize)
import Task
import Browser.Dom exposing (getViewport)
import ZipList exposing (ZipList, ZipList(..))
import Force
import Monocle.Optional as Optional exposing (Optional)
import Monocle.Lens as Lens exposing (Lens)
import Graph exposing (Graph)
import IntDict
import Tree exposing (Tree(..))
import Set exposing (Set)
import Graph
import Hierarchy
import Tree
import Math.Vector2 as Vec
import List.Nonempty as Nonempty exposing (Nonempty, Nonempty(..))

{-| each node in the graph's heap will be given an entity in a force simulation
to track position and velocity
-}
type alias NodeEntity = Force.Entity G.HeapAddr { value : G.GNode }

{-| a node can have at most two children (left and right)
-}
type Side = Left | Right

type alias Edge = Graph.Edge Side

type alias Node = Graph.Node NodeEntity

type alias NodeContext = Graph.NodeContext NodeEntity Side

type alias GraphLayout = Graph NodeEntity Side

nodeToEntity : Lens Node NodeEntity
nodeToEntity = Lens .label (\e n -> {n | label=e})

entityPos : Lens NodeEntity (Float, Float)
entityPos = Lens (\{x,y} -> (x,y)) (\(x,y) e -> {e | x=x, y=y})

accessNode : Lens NodeContext Node
accessNode = Lens .node (\n ctx -> {ctx | node=n})

accessEntity : Lens NodeContext NodeEntity
accessEntity = Lens.compose accessNode nodeToEntity

accessPos : Lens NodeContext (Float, Float)
accessPos = Lens.compose accessEntity entityPos

type alias MachineHistory = Nonempty MachineView

type alias MachineView =
  { machine : G.GMachine
  , lastUpdate : G.MachineUpdate
  , layout : GraphLayout
  , forceSim : Force.State G.HeapAddr
  }

type ProgramView
  = Uninitialized
  | Running MachineHistory
  | CompilationError Backend.CompilerError

type alias ViewPort = {width : Int, height : Int}

type alias Model =
  { sourceCode : String
  , program : ProgramView
  , viewport : ViewPort
  }

type Msg
  = ClickedCompile
  | ChangedSourceCode String
  | ClickedStepForward
  | ClickedStepBack
  | WindowResized Int Int
  | AnimationFrame


accessGMachine : Lens MachineView G.GMachine
accessGMachine = Lens .machine (\m v -> {v | machine=m})

accessLastUpdate : Lens MachineView G.MachineUpdate
accessLastUpdate = Lens .lastUpdate (\u v -> {v | lastUpdate=u})

accessLayout : Lens MachineView GraphLayout
accessLayout = Lens .layout (\l m -> {m | layout=l})

programHistory : Optional ProgramView MachineHistory
programHistory = Optional
  (\p -> case p of
    Running history -> Just history
    _ -> Nothing
  )
  (\newHistory _ -> Running newHistory)

accessProgram : Lens Model ProgramView
accessProgram = Lens .program (\p m -> {m | program=p})

accessHistory : Optional Model MachineHistory
accessHistory = Optional.compose (Optional.fromLens accessProgram) programHistory

programToMachineView : Optional ProgramView MachineView
programToMachineView = Optional
  (\p -> case p of
    Running (Nonempty m _) -> Just m
    _ -> Nothing
  )
  (\m p -> case p of
    Running (Nonempty _ history) -> Running (Nonempty m history)
    _ -> Running (Nonempty m []) 
  )

accessMachineView : Optional Model MachineView
accessMachineView = Optional.compose (Optional.fromLens accessProgram) programToMachineView

when : Bool -> (a -> a) -> a -> a
when cond f x = if cond then f x else x

getOutgoing : G.GNode -> Graph.Adjacency Side
getOutgoing node = case G.getChildren node of
  Just (left, right) -> IntDict.fromList [(left, Left), (right, Right)]
  Nothing -> IntDict.empty

getEntity : G.HeapAddr -> GraphLayout -> Maybe NodeEntity
getEntity id graph = Maybe.map accessEntity.get (Graph.get id graph)

{-| collect the tree described by a depth first search with the given seed node
-}
takeTree : G.HeapAddr -> Set G.HeapAddr -> GraphLayout -> Maybe (Tree G.HeapAddr)
takeTree root seen graph =
  if Set.member root seen then Nothing
  else case Graph.get root graph of
  Just {node, outgoing} ->
    let children = IntDict.toList outgoing
          |> List.sortBy (\(_,side) -> if side == Left then 0 else 1)
          |> List.map Tuple.first
    in Just
    <| Tree node.id
    <| List.filterMap (\child -> takeTree child (Set.insert root seen) graph) children
  Nothing -> Nothing

{-| compute a hierachical placement of a subtree of the heap graph where the current redex is the root

also return the edges participating in the tree
-}
hierarchicalLayout : GraphLayout
  -> {placements : Dict G.HeapAddr (Float, Float), edges : List (G.HeapAddr, G.HeapAddr)}
hierarchicalLayout layout =
  let tree = takeTree G.mainRedexRoot Set.empty layout
      edges = Maybe.withDefault [] (Maybe.map Tree.links tree)
      applyLayout = Hierarchy.tidy
        [ Hierarchy.nodeSize (always (nodeSize, nodeSize))
        , Hierarchy.parentChildMargin (nodeSize * 3)
        , Hierarchy.peerMargin (nodeSize * 2)
        ]
      placements = tree
        |> Maybe.map applyLayout
        |> Maybe.map (Tree.foldl (\{node,x,y} -> Dict.insert node (x,y)) Dict.empty)
        |> Maybe.withDefault Dict.empty
  in {placements=placements, edges=edges}

resetForceSim : MachineView -> MachineView
resetForceSim mview =
  let hierarchy = hierarchicalLayout mview.layout
      
      -- center the hierarchical layout around (0,0)
      (sumX, sumY) = Dict.foldl
        (\_ (x,y) (sx, sy) -> (x + sx, y + sy))
        (0,0)
        hierarchy.placements
      placedNodes = Dict.size hierarchy.placements
      (avgX, avgY) = (sumX / toFloat placedNodes, sumY / toFloat placedNodes)
      -- push nodes in the redex tree towards their hierarchical position
      (hierarchyXs, hierarchyYs) = Dict.foldl
        (\node (x,y) (xs, ys) ->
          ({node=node, strength=0.5, target=x-avgX} :: xs, {node=node, strength=0.5, target=y-avgY} :: ys)
        )
        ([],[])
        hierarchy.placements
      edges = List.map (\{from, to} -> (from, to)) (Graph.edges mview.layout)
      
      -- gravitate all nodes towards center to mitigate fly away
      gravitateNodes = List.map
        (\id -> {node=id, strength=0.05, target=0})
        (Graph.nodeIds mview.layout)
  in
  { mview
  | forceSim=Force.simulation
    [ Force.manyBody (Graph.nodeIds mview.layout)
    , Force.links edges
    , Force.towardsX (gravitateNodes ++ hierarchyXs)
    , Force.towardsY (gravitateNodes ++ hierarchyYs)
    ]
  }

{-| make a node to be used in the graph layout

the initial position will be set by the average of the node's children
-}
mkNode : G.HeapAddr -> G.GNode -> GraphLayout -> Node
mkNode id node layout =
  let e = Force.entity id node
      avgPosOfChildren = case G.getChildren node of
        Just (left, right) -> Maybe.map2
          (\l r -> ((l.x + r.x) / 2, (l.y + r.y) / 2))
          (getEntity left layout)
          (getEntity right layout)
        Nothing -> Nothing
      initialPos = Maybe.withDefault (entityPos.get e) avgPosOfChildren
  in {id=id, label=entityPos.set initialPos e}

{-| insert a new node into the graph layout and reset the force simulation
-}
insertNode : G.HeapAddr -> G.GNode -> MachineView -> MachineView
insertNode id node mview = mview
  |> Lens.modify accessLayout
  ( Graph.insert
    { node=mkNode id node mview.layout
    , incoming=IntDict.empty
    , outgoing=getOutgoing node
    }
  )
  |> resetForceSim

deleteNodeFromLayout : G.HeapAddr -> MachineView -> MachineView
deleteNodeFromLayout id = Lens.modify accessLayout (Graph.remove id) >> resetForceSim

{-| update the graph layout using the force simulation
-}
tickForceSim : MachineView -> MachineView
tickForceSim ({layout, forceSim} as mview) =
  let entities = List.map nodeToEntity.get (Graph.nodes layout)
      (newSim, newEntities) = Force.tick forceSim entities
      updateEntity e = Graph.update e.id (Maybe.map (accessEntity.set e)) 
      newLayout = List.foldl updateEntity layout newEntities
  in {mview | layout=newLayout, forceSim=newSim}

updateMachineView : G.MachineUpdate -> MachineView -> MachineView
updateMachineView machineUpdate = case machineUpdate of
  G.NewNodeAllocated id node -> insertNode id node

  G.HolesAllocated holeNodeIds -> (\mv -> List.foldl (flip insertNode G.GHole) mv holeNodeIds)

  G.Multiple update1 update2 -> updateMachineView update1 >> updateMachineView update2

  G.Crash _ -> identity

  G.Output _ -> identity

  G.GarbageCollection refs -> (\mv -> List.foldl deleteNodeFromLayout mv refs)

  G.EnteredCode function -> identity

  G.StartedUnwind id -> identity

  G.Unwound id -> identity

  G.RedexRootReplaced id reduct ->
    let updateNodeEdges ctx = {ctx | outgoing=getOutgoing reduct} 
        setData = Lens.modify accessEntity (\e -> {e | value=reduct})
        updateCtx = setData >> updateNodeEdges
    in Lens.modify accessLayout
    (Graph.update id (Maybe.map updateCtx))
    >> resetForceSim
  
  G.JumpedTo _ -> identity

  G.NoUpdate -> identity

initializeProgram : G.RuntimeResult -> ProgramView
initializeProgram (machine, machineUpdate) =
  let machineView = updateMachineView machineUpdate
        { machine=machine
        , lastUpdate=machineUpdate
        , layout=Graph.empty
        , forceSim=Force.simulation []
        }
  in Running (Nonempty.singleton machineView)

{-| return the new machine view after a state transition
-}
stepMachineView : MachineView -> MachineView
stepMachineView mview =
  let (newMachine, machineUpdate) = G.step (accessGMachine.get mview)
  in mview
  |> accessLastUpdate.set machineUpdate
  |> accessGMachine.set newMachine
  |> updateMachineView machineUpdate

{-| if the machine hasn't terminated,
perform a state transition and add the new machine state to the program history 
-}
stepForwardMachineView : Model -> Model
stepForwardMachineView model =
  let cannotMoveForward = model
        |> accessMachineView.getOption
        |> Maybe.map accessLastUpdate.get
        |> Maybe.map G.isTermination
        |> Maybe.withDefault True
  in Optional.modify accessHistory
  (\history ->
    let currentState = Nonempty.head history
    in if cannotMoveForward then history
    else Nonempty.cons (stepMachineView currentState) history 
  )
  model

{-| return to previous Gmachine state
-}
stepBackMachineView : Model -> Model
stepBackMachineView = Optional.modify accessHistory Nonempty.pop


initialProgram =
  """
badfac x = if (x == 1) 1 (x * badfac (x-1))
goodfac x acc = if (x == 1) acc (goodfac (x-1) (x*acc))
main = goodfac 5  1 == badfac 5
"""

compileSourceCode : String -> Model -> Model
compileSourceCode sourceCode = Result.Extra.unpack
    (CompilationError >> accessProgram.set)
    (initializeProgram >> accessProgram.set)
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

  ClickedStepForward -> (stepForwardMachineView model, Cmd.none)

  ClickedStepBack -> (stepBackMachineView model, Cmd.none)
  
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

icon : Icons.Icon -> E.Element msg
icon = Icons.toHtml [] >> E.html

compileButton = EI.button buttonStyle
  { onPress = Just ClickedCompile
  , label = E.text "compile"
  }

stepForwardButton = EI.button buttonStyle
  { onPress = Just ClickedStepForward
  , label = icon Icons.arrowRight
  }

stepBackButton = EI.button buttonStyle
  { onPress = Just ClickedStepBack
  , label = icon Icons.arrowLeft
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


edgeDirection : Edge -> GraphLayout -> Maybe Vec.Vec2
edgeDirection {from, to} layout = Maybe.map2
  (\u v ->
    let sourceVec = Vec.vec2 u.x u.y
        targetVec = Vec.vec2 v.x v.y
    in Vec.direction targetVec sourceVec
  )
  (getEntity from layout)
  (getEntity to layout)

getIncomingEdges : G.HeapAddr -> GraphLayout -> List Edge
getIncomingEdges id layout = case Graph.get id layout of
  Just {incoming} -> List.map (\(p, side) -> {from=p, to=id, label=side}) (IntDict.toList incoming)
  Nothing -> []

{-| for nodes with longer names (function nodes),
compute the rotation of the displayed label by taking the average of incoming edge angles
-}
avgDirOfIncomingEdges : G.HeapAddr -> GraphLayout -> {x : Float, y : Float}
avgDirOfIncomingEdges id layout =
  let directions = List.filterMap
        (\e -> edgeDirection e layout)
        (getIncomingEdges id layout)
      
      numEdges = List.length directions |> atLeast 1
      
      avgDir = List.foldl Vec.add (Vec.vec2 0 0) directions
        |> Vec.scale (1 / toFloat numEdges)
  in Vec.toRecord avgDir


nodeSize = 5

nodeData : Node -> G.GNode
nodeData = .label >> .value

nodeLabelString : Node -> String
nodeLabelString node = case nodeData node of
  G.GFunc {name} -> name
  G.GApp _ _ -> "@"
  G.GHole -> "■"
  G.GInt x -> String.fromInt x

nodeLabelAngle : Node -> GraphLayout -> Float
nodeLabelAngle node layout =
  let dir = avgDirOfIncomingEdges node.id layout
      pointingLeft = dir.x < 0
      angle = atan2 dir.y dir.x
  in case nodeData node of
  G.GFunc _ -> if pointingLeft then angle + pi else angle
  _ -> 0

nodeLabelAnchor : Node -> GraphLayout -> SvgT.AnchorAlignment
nodeLabelAnchor node layout =
  let numIncomingEdges = List.length (getIncomingEdges node.id layout)
      dir = avgDirOfIncomingEdges node.id layout
      pointingLeft = dir.x < 0
  in case nodeData node of
  G.GFunc _ ->
    if numIncomingEdges == 0 then SvgT.AnchorMiddle
    else if pointingLeft then SvgT.AnchorEnd
    else SvgT.AnchorStart
  _ -> SvgT.AnchorMiddle

-- TODO have font size get smaller as the layout gets bigger
drawNode : Node -> GraphLayout -> Svg msg
drawNode node layout =
  let {x,y} = nodeToEntity.get node
      labelRot = nodeLabelAngle node layout * 180 / pi
  in Svg.text_
  [ SvgA.x (SvgT.Px x)
  , SvgA.y (SvgT.Px y)
  , SvgA.fontSize (SvgT.Px nodeSize)
  , SvgA.transform [SvgT.Rotate labelRot x y]
  , SvgA.textAnchor (nodeLabelAnchor node layout)
  , SvgA.dominantBaseline SvgT.DominantBaselineMiddle
  ]
  [TypedSvg.Core.text (nodeLabelString node)]

-- TODO scale down the arrow stroke width as layout scales
drawEdge : Edge -> GraphLayout -> Svg msg
drawEdge ({from, to} as e) layout =
  let sourceCoords = getEntity from layout
      targetCoords = getEntity to layout
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
  let nodes = List.map (flip drawNode layout) (Graph.nodes layout)
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
shrinkToFit : Float -> Float -> GraphLayout -> GraphLayout
shrinkToFit w h layout =
  let {width, height} = layoutDimensions layout
      scaleX = w / width |> atMost 1
      scaleY = h / height |> atMost 1
  in scaleLayout scaleX scaleY layout

scaleLayout : Float -> Float -> GraphLayout -> GraphLayout
scaleLayout sx sy =
  let scale n = {n | x=n.x * sx, y=n.y * sy}
  in Graph.mapNodes scale

translateLayout : Float -> Float -> GraphLayout -> GraphLayout
translateLayout dx dy =
  let translate n = {n | x=n.x + dx, y=n.y + dy}
  in Graph.mapNodes translate

drawMachine : G.GMachine -> GraphLayout -> Svg msg
drawMachine machine layout =
  let
    width = 250
    height = 300
    stackWidthPct = 0.15 -- pct of width to be taken up by stack
    stackWidth = width * stackWidthPct
    graphWidth = width - stackWidth
    layout_ = layout
        |> shrinkToFit graphWidth height
        |> translateLayout (stackWidth + graphWidth/2) (height/2)

  in Svg.svg
    [ SvgA.viewBox 0 0 width height
    , Html.Attributes.style "height" "100%"
    , Html.Attributes.style "width" "100%"
    , Html.Attributes.style "border" "solid"
    ]
    [ drawGraph layout_
    , drawStack machine layout_ stackWidth
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

{-| draw the machine stack with arrows pointing from stack cells
to the memory locations (nodes) in the heap graph
-}
drawStack : G.GMachine -> GraphLayout -> Float -> Svg msg
drawStack machine layout cellWidth =
  let
    cellHeight = cellWidth * 0.5
    cells = List.indexedMap (\i nodeid -> case getEntity nodeid layout of
        Just {x,y} ->
          [ drawCell 0 (cellHeight * toFloat i) cellWidth cellHeight
          , drawPointer
            { source=(0 + cellWidth/2, cellHeight * toFloat i + cellHeight/2)
            , target=(x, y)
            , agletLength=5
            }
          ]
        Nothing -> [Svg.text_ [] [TypedSvg.Core.text "Failure drawing cell"]]
      )
      (List.reverse (G.getStack machine))
      |> List.concat
  in Svg.g [] cells


viewMachine : MachineView -> E.Element msg
viewMachine {machine, layout} =
  E.html (drawMachine machine layout)

viewProgram : ViewPort -> ProgramView -> E.Element msg
viewProgram viewport program = case program of
  Running (Nonempty machineView _) ->
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
    [ E.column [E.width (E.fillPortion 2), fillHeight]
        [ sourceCodeTextArea sourceCode
        , E.row [] [compileButton, stepBackButton, stepForwardButton]
        ]
    , E.el [E.width (E.fillPortion 5), fillHeight]
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