"use client";
import React, { useEffect, useState } from 'react'
import Playground from './tools/playground';
import Link from 'next/link';
import { promptOnLeaving } from '@/hooks/promptBeforeLeaving';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { revalidateTag } from 'next/cache';

function page({searchParams}) {
    const router =useRouter()
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

    const saveModule = async ()=>{

      try {
        const content = JSON.stringify(datajson)
        const res = await fetch(`/api/adminAccess/subjects/${sub}/lessons/${lesson}/module`,{
          method:"POST",
          body: JSON.stringify({content,title:moduleTitle})
        })
        if(res.status==200){
          toast.success(`New Module: (${moduleTitle}), is created`)
          setTimeout(()=>{
            router.push(`/admin/subject/${sub}/${lesson}`)
          },500)
        }
      } catch (error) {
        toast.error(error.message)
        console.log(error)
      }
    }

    const updateModule = async ()=>{
      try {
        if(moduleId==null){
          throw new Error("ModuleId not found")
        }
        const content = JSON.stringify(datajson)
        const res = await fetch(`/api/adminAccess/subjects/${sub}/lessons/${lesson}/module/${moduleId}`,{
          method:"PATCH",
          body: JSON.stringify({content, title: moduleTitle})
        })
        if(res.status==200){
          toast.success("Module Updated Successfully")
        }
      } catch (error) {
        console.log(error)
        toast.error("Failed to update module")
        toast.error(error.message)
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
            <input type="text" value={lesson} onChange={()=>{}} className='bg-slate-800 p-2 rounded-md text-white' disabled/>
          </div>

          <div className='flex flex-col gap-1'>
            <span>Title</span>
            <input type="text" value={moduleTitle} onChange={(e)=>setModuleTitle(e.currentTarget.value)} className='border-2 border-rose-400 p-2 text-blue-600'/>
          </div>

          <button className='rounded-sm bg-zinc-950 text-white p-2'
            onClick={()=>{
              mode=="create"?saveModule():updateModule()
            }}
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
