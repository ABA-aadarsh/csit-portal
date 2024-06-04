"use client";
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
    <div className='mt-4'>
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
        <blockquote style={style} {...attributes} className='text-slate-500 pl-4 border-l-2 border-slate-700/55'>
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
        <h1 style={style} {...attributes} className='text-headingColor text-2xl font-semibold my-5'>
          {children}
        </h1>
      )
    case "advice":
      return (
        <p style={style} {...attributes} className='my-3 bg-blue-600/10 text-base py-4 leading-[28px] text-headingColor pl-4 flex flex-col border-l-4 border-blue-700/70'>
          <span className='font-semibold'>Best to know</span>
          {children}
        </p>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes} className='text-headingColor text-xl font-medium my-4'>
          {children}
        </h2>
      )
    case 'heading-three':
      return (
        <h2 style={style} {...attributes} className='text-headingColor text-lg font-medium my-4'>
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes} className='mb-2'>
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
        <p style={style} {...attributes} className='text-base my-5 leading-[28px]'>
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