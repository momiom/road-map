'use client'

import React from 'react'
import ReactFlow, { ConnectionLineType } from 'reactflow'

import 'reactflow/dist/style.css'
import { useRecoilValue } from 'recoil'
import { layoutedNodesAndEdgesSelector } from '@/features/flowEditor/recoil/selecter'

const LayoutFlow = () => {
  const { layoutedNodes, layoutedEdges } = useRecoilValue(
    layoutedNodesAndEdgesSelector,
  )

  return (
    <ReactFlow
      nodes={layoutedNodes}
      edges={layoutedEdges}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
    ></ReactFlow>
  )
}

export default LayoutFlow
