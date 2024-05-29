"use client";
import React, { useEffect, useState } from 'react'
import Playground from './tools/playground';
import Link from 'next/link';
import { promptOnLeaving } from '@/hooks/promptBeforeLeaving';

function page({searchParams}) {
    const {mode,sub,lesson,moduleId} = searchParams
    const [datajson,setDatajson]=useState(null)
    const [error,setError]=useState(null)
    const [moduleTitle,setModuleTitle]=useState("")
    useEffect(()=>{
      if(mode=="create"){
        setDatajson([])
      }else{
        // find data from database by query of moduleId and set the datajson that data
        // following is example
        const getData = async (moduleId)=>{
          try {
            const res = await fetch(`/api/adminAccess/subjects/${sub}/lessons/${lesson}/module/${moduleId}`,{cache:"no-cache"})
            const {content,title} = await res.json()
            setDatajson(JSON.parse(content))
            setModuleTitle(title)
          } catch (error) {
            console.log(error)
            setDatajson(null)
            setError("Failed to get module")
          }
        }

        getData(moduleId)
      }
    },[])

    const saveContent = async ()=>{
      const content = JSON.stringify(datajson)
      try {
        const res = fetch(`/api/adminAccess/subjects/${sub}/lessons/${lesson}/module`,{
          method:"POST",
          body: JSON.stringify({content,title:moduleTitle})
        })
      } catch (error) {
        console.log(error)
      }
    }

    promptOnLeaving("There might be unsaved changes on this page. Make sure everything is saved")

    return (
      <div>
        <div className='bg-blue-700 text-white p-2 '>
          <Link href={"/admin"}>Admin.Home</Link>
        </div>
        <div className='flex gap-3 items-end'>
          <input type="text" defaultValue={moduleId || "New Module"} disabled 
            className="rounded-md text-white p-2 bg-slate-800"
          />
          
          <div className='flex flex-col gap-1'>
            <span>Subject</span>
            <input type="text" value={sub} onChange={()=>{}} className='bg-slate-800 p-2 rounded-md text-white' disabled/>
          </div>
          <div className='flex flex-col gap-1'>
            <span>Lesson</span>
            <input type="text" value={sub} onChange={()=>{}} className='bg-slate-800 p-2 rounded-md text-white' disabled/>
          </div>

          <div className='flex flex-col gap-1'>
            <span>Title</span>
            <input type="text" value={moduleTitle} onChange={(e)=>setModuleTitle(e.currentTarget.value)} className='border-2 border-rose-400 p-2 text-blue-600'/>
          </div>

          <button className='rounded-sm bg-zinc-950 text-white p-2'
            onClick={saveContent}
          >
            {mode=="create"? "Save": "Update"}
          </button>
        </div>

        <div className='w-full h-dvh p-4'>
          {
            datajson!=null ? <Playground datajson={datajson} setDatajson={setDatajson}/> : <p>Revalidating</p>
          }
          {
            error!=null && error 
          }
          
        </div>
      </div>
    )
}

export default page
