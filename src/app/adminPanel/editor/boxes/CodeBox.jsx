"use client";
import React, { useState } from 'react'
import Topbar from './components/Topbar';

function CodeBox({ id, update = ({ id, code, language }) => { }, title, updateTitle = ({ id, title }) => { }, deleteItem = (id) => { }, moveComponent }) {
    const [code, setCode] = useState("console.log('hello world')")
    const languageOptions=[
        {lang:"Javascript",code:"javascript"},
        {lang:"HTML",code:"html"},
        {lang:"CSS",code:"css"},
        {lang:"C",code:"c"},
    ]
    const [language,setLanguage]=useState(languageOptions[0].code)
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
                    update(
                        {
                            id,code,language
                        }
                    )
                }}
                    className='p-1'
                >
                    {
                        languageOptions.map((i,_)=>(
                            <option key={_} value={i.code}>{i.lang}</option>
                        ))
                    }
                </select>
            </div>
            <div className='flex gap-2 px-2 max-h-[300px] overflow-scroll mb-2'>
                <textarea name="code write" id="" cols="30" rows="10" className='w-full outline-none border-0 p-2 border-zinc-400' 
                    onChange={(e) =>{ setCode(e.target.value);update({id,code,language})}} value={code}
                    onKeyDown={(e)=>{
                        if(e.key=="Tab"){
                            e.preventDefault()
                            const start=e.target.selectionStart
                            const end=e.target.selectionEnd
                            e.target.value=e.target.value.substring(0, start) + "\t" + e.target.value.substring(end);
                            e.target.selectionStart=e.target.selectionEnd=start+1
                        }
                    }
                }
                spellCheck={false}
                ></textarea>
                <div className='w-full'>
                    <pre className={`language-${language} !mt-0`}>
                        <code className={`language-${language} mt-0`}>
                            { 
                                code
                            }
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    )
}
export default CodeBox