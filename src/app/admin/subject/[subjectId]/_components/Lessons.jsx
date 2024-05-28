"use client"
import React, { useEffect, useState } from 'react'

function Lessons({subjectId}) {
    const [list,setList]=useState([])
    const getLessons=async ()=>{
        try {
            const res = await fetch(`/api/adminAccess/subjects/${subjectId}/lessons`)
            const data = await res.json()
            if(res.status==200){
                setList(data.payload)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getLessons()
    },[])
  return (
    <div>
        <h1 className='text-center mb-2'>Lessons</h1>
        <ul className='flex flex-col gap-3 ml-4'>
            {
                list.map((i,_)=>(
                    <li key={_}>{i.name}</li>
                ))
            }
        </ul>
    </div>
  )
}

export default Lessons