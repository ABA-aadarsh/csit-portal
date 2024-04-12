"use client";
import React, { useEffect, useState } from 'react'
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';


function EqnBox({id,update=({id,latex})=>{}}) {
    const [latex,setLatex]=useState("")
  return (
    <div className='border-2 shadow-border p-3'>
        <h1 className='text-xl mb-5'>Math Equation</h1>
        <input type="text" className='p-2 outline-none mb-4 border-2 boder-solid w-full' placeholder='Write latex equation here' value={latex} onChange={(e)=>{
            setLatex(e.currentTarget.value)
            update({id,latex:e.currentTarget.value})
        }}/>
        <div>
            <p className='mb-2 text-zinc-500'>View</p>
            <div className='min-h-6'>
                <Latex >
                    {latex}
                </Latex>
            </div>
        </div>
    </div>
  )
}

export default EqnBox