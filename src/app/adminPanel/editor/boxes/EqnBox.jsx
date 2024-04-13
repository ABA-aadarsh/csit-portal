"use client";
import React, { useEffect, useState } from 'react'
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { Button } from '@/components/ui/button';
import { MdDelete } from 'react-icons/md';


function EqnBox(
    {
        id,
        update = ({ id, latex }) => { },
        deleteItem = (id) => { },
        title,
        updateTitle = ({ id, title }) => { }
    }
) {
    const [latex, setLatex] = useState("")
    const [titleValue, setTitleValue] = useState(title)
    return (
        <div className='border-2 shadow-border rounded-lg overflow-hidden'
            id={id}
        >
            <div className='p-1 bg-blue-400 w-full flex gap-6'>
                <div className=''>
                    <Button variant="primary" className="text-white h-[5px]" title="delete"
                        onClick={() => {
                            deleteItem(id)
                        }}
                    ><MdDelete /></Button>
                </div>
                <form onSubmit={e=>{
                    e.preventDefault()
                    updateTitle({ id, title: titleValue })
                }}>
                    <input type="text" value={titleValue} onChange={(e) => { setTitleValue(e.currentTarget.value) }}
                        className='pl-1 bg-transparent outline-none rounded-md text-slate-600'
                    />
                    <Button variant="primary" className="text-white h-[10px]" title="save"
                     type="submit"
                    >Save</Button>
                </form>
            </div>
            <div className='p-4'>
                <div className='mb-4 flex gap-4 items-center'>
                    <h1 className='text-xl'>Eqn Box</h1>
                    <p className='text-zinc-400 text-sm'>{id}</p>
                </div>
                <input type="text" className='p-2 outline-none mb-4 border-2 boder-solid w-full' placeholder='Write latex equation here' value={latex} onChange={(e) => {
                    setLatex(e.currentTarget.value)
                    update({ id, latex: e.currentTarget.value })
                }} />
                <div>
                    <p className='mb-2 text-zinc-500'>View</p>
                    <div className='min-h-6'>
                        <Latex >
                            {latex}
                        </Latex>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EqnBox