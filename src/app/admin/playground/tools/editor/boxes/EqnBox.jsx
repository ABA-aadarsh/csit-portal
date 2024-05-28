"use client";
import React, { useEffect, useState } from 'react'
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import Topbar from './components/Topbar';

function EqnBox(
    {
        id,
        update = ({ id, latex }) => { },
        deleteItem = (id) => { },
        title,
        updateTitle = ({ id, title }) => { },
        moveComponent
    }
) {
    const [latex, setLatex] = useState("")
    return (
        <div className='border-2 shadow-border rounded-lg overflow-hidden'
            id={id}
        >
            <Topbar
                deleteItem={deleteItem}
                moveComponent={moveComponent}
                title={title}
                updateTitle={updateTitle}
                id={id}
            />
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