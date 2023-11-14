import { layoutedNodesAndEdgesSelector } from '@/features/flowEditor/recoil/selecter'
import { useRecoilValue } from 'recoil'

export const Tmp = () => {
  const { layoutedNodes, layoutedEdges } = useRecoilValue(
    layoutedNodesAndEdgesSelector,
  )
  return (
    <>
      <h3>nodes</h3>
      <pre>{JSON.stringify(layoutedNodes, null, 2)}</pre>

      <h3>edges</h3>
      <pre>{JSON.stringify(layoutedEdges, null, 2)}</pre>
    </>
  )
}
