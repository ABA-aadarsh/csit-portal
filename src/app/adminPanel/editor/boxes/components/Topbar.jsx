"use client";
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { MdDelete } from 'react-icons/md';
import { MoveDown, MoveUp } from 'lucide-react';


function Topbar(
    {
        deleteItem,
        moveComponent,
        updateTitle,
        title,
        id
    }
) {
    const [titleValue,setTitleValue]=useState(title)
    const [titleUpdated,setTitleUpdated]=useState(false)
  return (
    <div className='p-1 bg-blue-400 w-full flex gap-6'>
        <div className=''>
          <Button variant="primary" className="text-white h-[5px]" title="delete"
            onClick={()=>{
              deleteItem(id)
            }}
          ><MdDelete/></Button>
          <Button variant="primary" className="text-white h-[5px]" title="up"
            onClick={()=>{
              moveComponent({id,up:true})
            }}
          ><MoveUp size={15}/></Button>
          <Button variant="primary" className="text-white h-[5px]" title="down"
            onClick={()=>{
              moveComponent({id,up:false})
            }}
          ><MoveDown size={15}/></Button>
        </div>
        <form onSubmit={(e)=>{
          e.preventDefault()
          updateTitle({id,title:titleValue})
          setTitleUpdated(false)
        }}>
          <input type="text" value={titleValue} onChange={(e)=>{setTitleValue(e.currentTarget.value);setTitleUpdated(true)}}
            className='pl-1 bg-transparent outline-none rounded-md text-slate-600'
          />
          <Button variant="primary" className={` h-[10px] ${titleUpdated?"text-white":"text-slate-600 opacity-70"}`} title="save"
           style={{
            opactiy:titleUpdated?1:0.6
           }}
            type="submit"
          >Update Title</Button>
        </form>
      </div>
  )
}

export default Topbar