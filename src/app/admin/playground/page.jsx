"use client";
import React, { useEffect, useState } from 'react'
import Playground from './tools/playground';

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
            const res = await fetch(`/api/adminAccess/subjects/${sub}/lessons/${lesson}/module/${moduleId}`)
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

    return (
      <div>
        <h1>Queries: subject = {sub} , lesson = {lesson}, mode = {mode}, moduleId = {moduleId || "Not available"}</h1>
        <div>
          <input type="text" defaultValue={moduleId || "New Module"} disabled />
          <input type="text" value={moduleTitle} onChange={(e)=>setModuleTitle(e.currentTarget.value)} />
          <input type="text" value={sub} onChange={()=>{}} />
          <input type="text" value={lesson} onChange={()=>{}} />
          {/* TODO: Implement the onchange events for the input fields above */}


          <button className='rounded-sm bg-zinc-950 text-white p-2'
            onClick={saveContent}
          >Save</button>
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
