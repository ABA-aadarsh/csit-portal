import React, { useCallback, useMemo, useState } from 'react'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
    createEditor,
    Element as SlateElement,
  } from 'slate'
const TextRenderer = ({
    data
}) => {
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withReact(createEditor()), [])

  return (
    <div className='p-4'>
    <Slate initialValue={data} editor={editor}
    >
        <Editable
        className='outline-none'
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        readOnly
        />
    </Slate>
    </div>
  )
}
const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes} className='px-2 list-disc list-inside pl-2 my-3'>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...attributes} className='text-2xl text-rose-500 font-medium my-3 tracking-wide'>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes} >
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes} className='list-decimal list-inside pl-2 my-3'>
          {children}
        </ol>
      )
    default:
      return (
        <p style={style} {...attributes} className='mb-2'>
          {children}
        </p>
      )
  }
}
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <span className='font-semibold'>{children}</span>
  }

  if (leaf.code) {
    children = <code className='bg-[#e5ebf0] rounded-sm p-1 text-[#000000b2] font-thin'>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}
export default TextRenderer