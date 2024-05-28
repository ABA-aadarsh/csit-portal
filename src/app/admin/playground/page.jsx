"use client";
import React, { useEffect, useState } from 'react'
import Playground from './tools/playground';

function page({searchParams}) {
    const {mode,sub,lesson,moduleId} = searchParams
    const [datajson,setDatajson]=useState(null)
    useEffect(()=>{
      if(mode=="create"){
        setDatajson([])
      }else{
        // find data from database by query of moduleId and set the datajson that data
        // following is example
        setDatajson(
          [
            {
              "id": "ca2af634-9f9c-4862-b64c-d83ede5e3bb9",
              "type": "text",
              "title": "introduction",
              "props": {
                "content": "[{\"type\":\"heading-one\",\"children\":[{\"text\":\"Introduction\"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"The goal of this subject IIT is to build a common ground for all students taking this course. Some of your friends (or probably you as well) might not have taken computer as a subject before so this basic introductory subject is to help those students and also to refresh some of your old concepts with maybe new perspective.\"}]}]"
              }
            }
          ]
        )
      }
    },[])

    return (
      <div>
        <h1>Queries: subject = {sub} , lesson = {lesson}, mode = {mode}, moduleId = {moduleId || "Not available"}</h1>
        <div>
          <input type="text" defaultValue={moduleId || "New Module"} disabled />
          <input type="text" value={sub} onChange={()=>{}} />
          <input type="text" value={lesson} onChange={()=>{}} />
          {/* TODO: Implement the onchange events for the input fields above */}
        </div>
        <div className='w-full h-dvh p-4'>
          {
            datajson!=null ? <Playground datajson={datajson} setDatajson={setDatajson}/> : <p>Revalidating</p>
          }
          
        </div>
      </div>
    )
}

export default page
