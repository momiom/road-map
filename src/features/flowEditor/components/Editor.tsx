'use client'

import { useRecoilState } from 'recoil'
import { useCallback } from 'react'
import { editorState } from '@/features/flowEditor/recoil/atom'

export const Editor = () => {
  const [markdown, setMarkdownString] = useRecoilState(editorState)

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMarkdownString(event.target.value)
    },
    [setMarkdownString],
  )

  return (
    <>
      <textarea
        className="w-full h-full p-2"
        onChange={onChange}
        value={markdown}
      />
    </>
  )
}
