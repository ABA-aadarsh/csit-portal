"use client";
import React, { useState } from 'react'
import Topbar from './components/Topbar';
// import { Highlight, themes } from "prism-react-renderer"
import Highlight from 'react-highlight'
import "highlight.js/styles/dark.css"

function CodeBox({ id, update = ({ id, code, langauge }) => { }, title, updateTitle = ({ id, title }) => { }, deleteItem = (id) => { }, moveComponent }) {
    const [code, setCode] = useState("")
    const languageOptions=[
        "js","c","cpp","python","html","css"
    ]
    const [language,setLanguage]=useState(languageOptions[0])
    return (
        <div className='border-2 shadow-border rounded-lg overflow-hidden'
            id={id}>
            <Topbar
                deleteItem={deleteItem}
                moveComponent={moveComponent}
                title={title}
                updateTitle={updateTitle}
                id={id}
            />
            <div className='p-3'>
                <div className=' flex gap-4 items-center'>
                    <h1 className='text-xl'>Code Box</h1>
                    <p className='text-zinc-400 text-sm'>{id}</p>
                </div>
            </div>
            <div className='ml-2 mb-2'>
                <select onChange={(e)=>{
                    setLanguage(e.currentTarget.value)
                }}
                    className='p-1'
                >
                    {
                        languageOptions.map(i=>(
                            <option key={i} value={i}>{i}</option>
                        ))
                    }
                </select>
            </div>
            <div className='flex gap-2 px-2 max-h-[300px] overflow-scroll mb-2'>
                <textarea name="code write" id="" cols="30" rows="10" className='w-full outline-none border-2 border-zinc-400' onChange={(e) => setCode(e.target.value)} value={code}></textarea>
                <div className='w-full'>
                    {/* <Highlight
                        theme={themes.shadesOfPurple}
                        code={code}
                        language={language}
                    >
                        // this is example of prism-react-renderer
                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                            <pre style={style} className='w-full'>
                                {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({ line })}>
                                        <span>{i + 1} </span>
                                        {line.map((token, key) => (
                                            <span key={key} {...getTokenProps({ token })} />
                                        ))}
                                    </div>
                                ))}
                            </pre>
                        )}
                    </Highlight> */}
                    <Highlight language="javascript">
                        {code}
                    </Highlight>
                </div>
            </div>
        </div>
    )
}

export default CodeBox

/*
    <div className='border-2 shadow-border rounded-lg overflow-hidden'
        id={id}>
            <Topbar
                deleteItem={deleteItem}
                moveComponent={moveComponent}
                title={title}
                updateTitle={updateTitle}
                id={id}
            />
            <div className='p-3 shadow-border border-2'>
                <div className='mb-4 flex gap-4 items-center'>
                    <h1 className='text-xl'>Code Box</h1>
                    <p className='text-zinc-400 text-sm'>{id}</p>
                </div>
            </div>
            <div>
                
            </div>
        </div>
*/