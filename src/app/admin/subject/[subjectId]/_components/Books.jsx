"use client";
import { Button } from '@/components/ui/button';
import { Delete } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

// bookId is not _id but driveId

function BooksManager({subjectId}) {
    const [bookName,setBookName]=useState("")
    const [bookId,setBookId]=useState("")
    const [books,setBooks]=useState(null)
    
    const deleteBook = async (id)=>{
        try {
            const res = await fetch(`/api/adminAccess/subjects/${subjectId}/books/${id}`,{
                method:"DELETE"
            })
            if(res.status==200){
                toast.success("Book Deleted")
                setBooks(prev=>prev.filter(i=>i.driveId==id))
            }else{
                toast.error("Book Deletion Failed")
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getBooks = async ()=>{
        try {
            const res = await fetch(`/api/adminAccess/subjects/${subjectId}/books`)
            if(res.status==200){
                const {payload} = await res.json()
                setBooks([...payload])
            }
            else{
                setBooks([])
            }
        } catch (error) {
            console.log(error)
            setBooks(null)
        }
    }

    useEffect(()=>{
        getBooks()
    },[])

  return (
    <div>
        <h1 className='text-center'>Books Manager</h1>
        <form onSubmit={async(e)=>{
            e.preventDefault()
            try {
                const res = await fetch(`/api/adminAccess/subjects/${subjectId}/books`,{
                    method:"POST",
                    body: JSON.stringify(
                        {
                            name: bookName,
                            driveId: bookId,
                            sub: subjectId
                        }
                    )
                })
                if(res.status==200){
                    toast.success("Book Added")
                    setBooks(prev=>[...prev,{name:bookName,driveId:bookId}])
                }
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }}
            className=''
        >
            <div className='flex gap-4 mb-2 flex-col items-center'>
                <input type="text" value={bookName} onChange={e=>setBookName(e.currentTarget.value)} 
                    className='border-b-2 border-slate-700 p-1 w-[250px] mr-2'
                    placeholder='Book name here'
                />
                <input type="text" value={bookId} onChange={e=>setBookId(e.currentTarget.value)} 
                    className='border-b-2 border-slate-700 p-1 w-[250px] mr-2'
                    placeholder='Drive Id here'
                />
            </div>
            <Button variant="outline" className="border-2 border-slate-700 bg-slate-700 text-white block m-auto" type="submit">Add</Button>
        </form>
        <div className='px-3'>
            <div className='flex gap-2 flex-col'>
                {
                    books ? books.map(i=>(
                        <div key={i.driveId} className='flex items-center gap-4'>
                            <Link href={"#"}>
                                <p>{i.name}</p>
                            </Link>
                            <button onClick={()=>{
                                deleteBook(i.driveId)
                            }}><Delete/></button>
                        </div>
                    )):
                    <p>Loading Books Data</p>
                }
            </div>
        </div>
    </div>
  )
}

export default BooksManager