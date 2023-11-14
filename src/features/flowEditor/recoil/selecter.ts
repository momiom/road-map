import { selector } from 'recoil'
import { editorState } from './atom'
import { Edge, Node, Position } from 'reactflow'
import dagre from 'dagre'

const nodeWidth = 172
const nodeHeight = 36
const edgeType = 'smoothstep'

const markdownToNodesAndEdges = (
  markdownString: string,
): { nodes: Node[]; edges: Edge[] } => {
  const lines = markdownString.split('\n')
  const nodes: Node[] = []
  const edges: Edge[] = []
  const levelMap: { [key: number]: string } = {} // 各階層で最後のノードIDを追跡

  lines.forEach((line, index) => {
    const levelMatch = line.match(/^#+/)
    if (levelMatch) {
      const level = levelMatch[0].length
      const text = line.slice(level + 1).trim()

      if (text) {
        const nodeId = `n${index}`
        levelMap[level] = nodeId

        const node: Node = {
          id: nodeId,
          data: { label: text },
          position: { x: 0, y: 0 }, // 仮の値、適宜変更する
        }

        nodes.push(node)

        if (level > 1) {
          const parentLevel = level - 1
          const parentNodeId = levelMap[parentLevel]
          if (parentNodeId) {
            const edgeId = `e${parentNodeId}-${nodeId}`
            const edge: Edge = {
              id: edgeId,
              source: parentNodeId,
              target: nodeId,
              animated: true,
            }
            edges.push(edge)
          }
        }
      }
    }
  })

  return { nodes, edges }
}

const getLayoutElements = (nodes: Node[], edges: Edge[], direction = 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  const isHorizontal = direction === 'LR'
  dagreGraph.setGraph({ rankdir: direction })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    }
    return newNode
  })

  return { newNodes, edges }
}

export const layoutedNodesAndEdgesSelector = selector<{
  layoutedNodes: Node[]
  layoutedEdges: Edge[]
}>({
  key: 'flowNodesAndEdgesSelector',
  get: ({ get }) => {
    const markdownString = get(editorState)
    const { nodes, edges } = markdownToNodesAndEdges(markdownString)
    const { newNodes: layoutedNodes, edges: layoutedEdges } = getLayoutElements(
      nodes,
      edges,
    )

    return { layoutedNodes, layoutedEdges }
  },
})
