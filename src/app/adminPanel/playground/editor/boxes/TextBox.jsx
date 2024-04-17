import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import { Button } from '@/components/ui/button'
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'
import {  BiCode, BiSolidQuoteAltLeft } from 'react-icons/bi'
import { GoListOrdered, GoListUnordered } from 'react-icons/go'
import {  CiTextAlignCenter, CiTextAlignJustify, CiTextAlignLeft, CiTextAlignRight } from "react-icons/ci";
import { Delete, DeleteIcon, MoveDown, MoveUp } from 'lucide-react'
import { MdDelete } from 'react-icons/md'
import Topbar from './components/Topbar'
const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const IconBtn=({format, children, nature="mark"})=>{
  const editor = useSlate()
  return (
    <Button
      variant={"outline"}
      onMouseDown={event => {
        event.preventDefault()
        if(nature=="mark"){
          toggleMark(editor, format)
        }else{
          toggleBlock(editor,format)
        }
      }}
      title={format}
    >
      {children}
    </Button>
  )
}

const TextBox = ({
  id,
  update=({id,content})=>{},
  deleteItem=(id)=>{},
  updateTitle=({id,title})=>{},
  title="",
  moveComponent=({id,up})=>{}
}) => {
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <div className='border-2 shadow-border rounded-lg overflow-hidden' id={id}>
      <Topbar
        deleteItem={deleteItem}
        moveComponent={moveComponent}
        title={title}
        updateTitle={updateTitle}
        id={id}
      />
      <div className='p-4'>
        <div className='mb-4 flex gap-4 items-center'>
          <h1 className='text-xl'>Text Box</h1>
          <p className='text-zinc-400 text-sm'>{id}</p>
        </div>
        <Slate editor={editor} initialValue={initialValue}
          onChange={value => {
            const isAstChange = editor.operations.some(
              op => 'set_selection' !== op.type
            )
            if (isAstChange) {
              const content = JSON.stringify(value)
              update({id,content})
            }
          }}
        >
          <div className='flex gap-2 flex-wrap mb-5'>
            <IconBtn format={"bold"}>
              B
            </IconBtn>
            <IconBtn format={"italic"}>
              <i>i</i>
            </IconBtn>
            <IconBtn format={"underline"}>
              _
            </IconBtn>
            <IconBtn format={"code"}>
              <BiCode/>
            </IconBtn>
            <IconBtn format="heading-one" nature='block'>
              H1
            </IconBtn>
            <IconBtn format="heading-two">
              H2
            </IconBtn>
            <IconBtn format="block-quote" >
              <BiSolidQuoteAltLeft/>
            </IconBtn>
            <IconBtn format={"numbered-list"} nature='block'>
              <GoListOrdered/>
            </IconBtn>
            <IconBtn format={"bulleted-list"} nature='block'>
              <GoListUnordered/>
            </IconBtn>
            <IconBtn format={"left"} nature='block'>
              <CiTextAlignLeft/>
            </IconBtn>
            <IconBtn format={"center"} nature='block'>
              <CiTextAlignCenter/>
            </IconBtn>
            <IconBtn format={"right"} nature='block'>
              <CiTextAlignRight/>
            </IconBtn>
            <IconBtn format={"justify"} nature='block'>
              <CiTextAlignJustify/>
            </IconBtn>
          </div>
          <Editable
            className='outline-none'
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some rich text…"
            spellCheck
            autoFocus
            onKeyDown={event => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault()
                  const mark = HOTKEYS[hotkey]
                  toggleMark(editor, mark)
                }
              }
            }}
          />
        </Slate>
      </div>
    </div>
  )
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })
  let newProperties
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  }
  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  )

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  if(marks==null){return false}
  return marks ? marks[format] === true : false
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

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {icon}
    </Button>
  )
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      {icon}
    </Button>
  )
}

const initialValue= [
  {
    type: 'paragraph',
    children: [
      {
        text: "Start writing now ... ",
      }
    ],
  }
]

export default TextBox