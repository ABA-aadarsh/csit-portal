"use client";
import React, { useEffect, useState } from 'react'
import Topbar from './components/Topbar';
import { Button, buttonVariants } from '@/components/ui/button';
import {  ChevronDownCircle,  ChevronUpCircle,  Trash } from 'lucide-react';

function RecommendedLinksBox(
    {
        id,
        update = ({ id, list }) => { },
        deleteItem = (id) => { },
        title,
        updateTitle = ({ id, title }) => { },
        moveComponent
    }
) {
    const [link,setLink]=useState("")
    const [linkTitle,setLinkTitle]=useState("")
    const [list, setList] = useState([])
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
    useEffect(()=>{
        console.log("hi")
        update({id,list})
    },[list])
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
                    <h1 className='text-xl'>RecommendedLinks</h1>
                    <p className='text-zinc-400 text-sm'>{id}</p>
                </div>
                <div>
                    <form 
                        onSubmit={(e)=>{
                            e.preventDefault()
                            if(link!="" && linkTitle!=""){
                                setList(prev=>[...prev,{id:Date.now(),title:linkTitle,link:link}])
                                setLink("")
                                setLinkTitle("")
                            }
                        }}
                        className='mb-4'
                    >
                        <div className='flex gap-2 items-end'>
                            <div className='flex flex-col gap-1'>
                                <span className='text-slate-400'>Title</span>
                                <input type="text"
                                    value={linkTitle}
                                    onChange={(e)=>setLinkTitle(e.currentTarget.value)}
                                    placeholder={"Enter title"}
                                    className='border-2 border-slate-500 p-2 rounded-md outline-none'
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <span className='text-slate-400'>Link</span>
                                <input type="text"
                                    value={link}
                                    onChange={(e)=>setLink(e.currentTarget.value)}
                                    placeholder={"Enter Link"}
                                className='border-2 border-slate-500 p-2 rounded-md outline-none'/>
                            </div>
                            <input type="submit" value="Add" className={buttonVariants({variant:"outline"}) + " cursor-pointer h-full"} />
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
                                        <a href={i.link}
                                            className='text-blue-400 hover:underline block'
                                            target='blank'
                                        >
                                            {i.title}
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

export default RecommendedLinksBox
