"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function Modules({sub,lesson}) {
  const [list,setList] = useState(null)
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    const getModules = async ()=>{
      try {
        const res = await fetch(`/api/adminAccess/subjects/${sub}/lessons/${lesson}/module`,{
          cache:"force-cache"
        })
        if(res.status==200){
          const {payload}= await res.json()
          console.log(payload)
          setList(payload)
        }
      } catch (error) {
        console.log(error)
        setList(null)
      }
      setLoading(false)
    }


    getModules()

  },[])
  return (
    <div>
      <ul>
        {
          list && list.map(i=>(
            <li key={i._id}>
              <Link href={`/admin/playground?sub=${sub}&lesson=${lesson}&mode=edit&moduleId=${i._id}`}>{i.title}</Link>
            </li>
          ))
        }
        {
          loading && <p>Wait content is being fetched</p>
        }
      </ul>
    </div>
  )
}

export default Modules