"use client";
import { Trash } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function Modules({sub,lesson}) {
  const [list,setList] = useState(null)
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    const getModules = async ()=>{
      try {
        const res = await fetch(`/api/adminAccess/subjects/${sub}/lessons/${lesson}/module`,{
          cache:"no-cache"
        })
        if(res.status==200){
          const {payload}= await res.json()
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


  const deleteModule =async (id)=>{
    try {
      const res = await fetch(`/api/adminAccess/subjects/${sub}/lessons/${lesson}/module/${id}`,{
        method:"DELETE"
      })
      if(res.status==200){
        toast.success("Module Deleted Successfully")
        setList(prev=>prev.filter(i=>i._id!=id))
      }else{
        toast.error("Couldn't delete Module")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const updateView = async ({id, viewAvailable})=>{
    try {
      const res = await fetch(`/api/adminAccess/subjects/${sub}/lessons/${lesson}/module/${id}`,{
        method: "POST",
        body: JSON.stringify({viewAvailable})
      })
      if(res.status==200){
        toast.success(viewAvailable?"Module is made public":"Module is made private")
        setList(prev=>{
          const m = prev.findIndex(i=>i._id==id)
          prev[m].viewAvailable = viewAvailable
          return [...prev]
        })
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div>
      <ul className='ml-4 flex flex-col gap-3 mt-4'>
        {
          list && list.map(i=>(
            <li key={i._id} className='flex items-center gap-4'>
              <div className='w-[300px]'>
                <Link href={`/admin/playground?sub=${sub}&lesson=${lesson}&mode=edit&moduleId=${i._id}`}>{i.title}</Link>
              </div>

              <div className='flex gap-2'>
                <button
                    onClick={()=>updateView({
                      id:i._id,
                      viewAvailable:!i.viewAvailable
                    })
                    }
                    className='w-[150px]'
                >{i.viewAvailable?"Public":"Private"}</button>
                <button
                  onClick={()=>deleteModule(i._id)}
                  className='hover:text-red-600'
                ><Trash /></button>
              </div>
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