"use client";
import React, { useEffect, useState } from 'react'
import Topbar from './components/Topbar';
import { Button, buttonVariants } from '@/components/ui/button';
import {  ChevronDownCircle,  ChevronUpCircle,  Trash } from 'lucide-react';

function VideoBox(
    {
        id,
        update = ({ id, list }) => { },
        deleteItem = (id) => { },
        title,
        updateTitle = ({ id, title }) => { },
        moveComponent,
        initialData
    }
) {
    const [src,setSrc]=useState("")
    const [list, setList] = useState(initialData || [])
    useEffect(()=>{
        update({id,list})
    },[list])
    const moveItem=({item,up})=>{
        const o = list.findIndex(_=>_.id==item.id)
        if((o==0 && up==true) || (o==(list.length-1) && up==false)){
          return
        }
        list.splice(o,1)
        if(up==true){
          list.splice(o-1,0,item)
        }else{
          list.splice(o+1,0,item)
        }
        setList([...list])
    }
    return (
        <div className='border-2 shadow-border rounded-lg overflow-hidden'
            id={id}
        >
            <Topbar
                deleteItem={deleteItem}
                moveComponent={moveComponent}
                title={title}
                updateTitle={updateTitle}
                id={id}
            />
            <div className='p-4'>
                <div className='mb-4 flex gap-4 items-center'>
                    <h1 className='text-xl'>Video Panel</h1>
                    <p className='text-zinc-400 text-sm'>{id}</p>
                </div>
                <div>
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        if(src=="") return;
                        setList(prev=>[...prev,{id:Date.now(),videoId:src}])
                        setSrc("")
                    }}
                        className='mb-4'
                    >
                        <div className='flex gap-2'>
                            <input type="text" name='videoId' 
                                value={src}
                                onChange={(e)=>setSrc(e.currentTarget.value)}
                                placeholder={"Enter Youtube Video ID"}
                            className='border-2 border-slate-500 p-2 rounded-md outline-none w-1/3'/>
                            <input type="submit" value="Add" className={buttonVariants({variant:"outline"})}/>
                        </div>
                    </form>
                    <div>
                        <p className='text-slate-500 mb-2'>List</p>
                        <div>
                            {
                                list.map(i=>{
                                    return <div key={i.id} className='flex gap-3 items-center'>
                                        <div className='flex gap-1 items-center'>
                                            <Button variant={"primary"} className="text-slate-200 hover:text-green-400 p-0 h-5"
                                                onClick={
                                                    ()=>{
                                                        moveItem({item:i,up:true})
                                                    }
                                                }
                                            >
                                                <ChevronUpCircle size={15}/>
                                            </Button>
                                            <Button variant={"primary"} className="text-slate-200 hover:text-green-400 p-0 h-5"
                                                onClick={
                                                    ()=>{
                                                        moveItem({item:i,up:false})
                                                    }
                                                }
                                            >
                                                <ChevronDownCircle size={15}/>
                                            </Button>
                                        </div>
                                        <a href={`https://www.youtube.com/watch?v=${i.videoId}`}
                                            className='text-blue-400 hover:underline block w-36'
                                            target='blank'
                                        >
                                            {i.videoId}
                                        </a>
                                        <Button variant={"primary"} className="hover:text-red-500 p-0 h-5"
                                            onClick={
                                                ()=>{
                                                    setList(prev=>prev.filter(_=>_.id!=i.id))
                                                }
                                            }
                                        >
                                            <Trash size={15}/>
                                        </Button>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoBox

/* <iframe 
    width="400" height="300"
    src="https://www.youtube.com/embed/jgpJVI3tDbY;controls=0" 
    frameborder="0" 
    allow="encrypted-media; gyroscope; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" 
    allowfullscreen
    disablePictureInPicture 
>
</iframe> */