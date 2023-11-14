import Flow from './Flow'
import { Editor } from './Editor'

export const FlowEditor = () => {
  return (
    <>
      <main className="flex min-h-screen flex-row gap-4 items-center justify-between p-24">
        <div className="w-full h-[70vh] border-2 border-gray-500">
          <Editor />
        </div>
        <div className="w-full h-[70vh] border-2 border-gray-500">
          <Flow />
        </div>
      </main>
    </>
  )
}
