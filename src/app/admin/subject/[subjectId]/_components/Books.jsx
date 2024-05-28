"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState } from 'react'

const Form = ({submitHandler=()=>{}})=>{
    const [bookName,setBookName]=useState("")
    const [bookLink,setBookLink]=useState("")
    return (
        <form onSubmit={(e)=>{
            e.preventDefault()
            submitHandler()
        }}
            className=''
        >
            <div className='flex gap-4 mb-2 flex-col items-center'>
                <input type="text" value={bookName} onChange={e=>setBookName(e.currentTarget.value)} 
                    className='border-b-2 border-slate-700 p-1 w-[250px] mr-2'
                    placeholder='Book name here'
                />
                <input type="text" value={bookLink} onChange={e=>setBookLink(e.currentTarget.value)} 
                    className='border-b-2 border-slate-700 p-1 w-[250px] mr-2'
                    placeholder='Book link here'
                />
            </div>
            <Button variant="outline" className="border-2 border-slate-700 bg-slate-700 text-white block m-auto" type="submit">Add</Button>
        </form>
    )
}

function BooksManager() {
    const [books,setBooks]=useState([{name:"Book1",link:"somerandomelink",id:"randomeId"}])
    
  return (
    <div>
        <h1 className='text-center'>Books Manager</h1>
        <Form/>
        <div className='px-3'>
            <ul className='list-none flex gap-2 flex-col'>
                {
                    books.map(i=>(
                        <li key={i.id}>
                            <Link href={i.link} className='text-blue-800'>{i.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default BooksManager