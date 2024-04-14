"use client";
import { Button } from '@/components/ui/button';
import React, { Fragment, useEffect, useState } from 'react'
import TextBox from './boxes/TextBox';
import EqnBox from './boxes/EqnBox';
import ImageBox from './boxes/ImageBox';
import { v4 as uuidv4 } from 'uuid';
import CodeBox from './boxes/CodeBox';

function scrollToElement(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function Editor() {
  const [datajson, setDatajson]=useState([])
  const [idsList,setIdsList]=useState([]) // store the ids of the objects and run the iteration on that basis so that unnecessary rendering of other componenet is not done when one componenet is being changed
  const createTextBox=()=>{
    const id=uuidv4()
    setDatajson(prev=>(
      [...prev,
        {
          id: id,
          type: "text",
          title:"untitled text",
          props:{
            content:"Start writing now ..."
          }
        }
      ]
    ))
    setIdsList(prev=>[...prev,id])
  }
  const updateText=({id,content})=>{
    setDatajson(prev=>{
      const o = prev.findIndex(_=>_.id==id)
      prev[o].props.content=content
      return [...prev]
    })
  }
  const createEqnBox=()=>{
    const id=uuidv4()
    setDatajson(prev=>(
      [
        ...prev,
        {
          id: id,
          type:"eqn",
          title:"untitled eqn",
          latex:""
        }
      ]
    ))
    setIdsList(prev=>[...prev,id])
  }
  const updateEqn=({id,latex})=>{
    setDatajson(prev=>{
      const o = prev.findIndex(_=>_.id==id)
      prev[o].latex=latex
      return [...prev]
    })
  }
  const createImageBox=()=>{
    const id=uuidv4()
    setDatajson(prev=>(
      [
        ...prev,
        {
          id: id,
          type:"image",
          title:"untitled image",
          props:{
            width:"",height:"",src:"", alt:""
          }
        }
      ]
    ))
    setIdsList(prev=>[...prev,id])
  }
  const updateImage=({id,props})=>{
    setDatajson(prev=>{
      const o = prev.findIndex(_=>_.id==id)
      prev[o].props=props
      return [...prev]
    })
  }
  const createCodeBox=()=>{
    const id=uuidv4()
    setDatajson(prev=>(
      [
        ...prev,
        {
          id: id,
          type:"code",
          title:"untitled code",
          language:"html",
          code:""
        }
      ]
    ))
    setIdsList(prev=>[...prev,id])
  }
  const updateCode=({id,code,language})=>{
    setDatajson(prev=>{
      const o = prev.findIndex(_=>_.id==id)
      prev[o].code=code
      prev[o].language=language
      return [...prev]
    })
  }
  const deleteItem=(id)=>{
    setIdsList(prev=>prev.filter((_)=>_!=id))
    setDatajson(prev=>{
      return prev.filter(_=>_.id!=id)
    })
  }
  const updateTitle=({id, title})=>{
    setDatajson(prev=>{
      const o=prev.find(_=>_.id==id)
      o.title=title
      return [...prev]
    })
  }
  const moveComponent=({id,up})=>{
    const o = idsList.findIndex(_=>_==id)
    if((o==0 && up==true) || (o==(idsList.length-1) && up==false)){
      return
    }
    idsList.splice(o,1)
    if(up==true){
      idsList.splice(o-1,0,id)
    }else{
      idsList.splice(o+1,0,id)
    }
    setIdsList([...idsList])
  }
  return (
    <div>
      <Button variant={"secondary"} onClick={()=>console.log(datajson)} className="mb-3">Log Data</Button>
      <div className='mb-4'>
        <ul className='flex gap-1 items-center'>
          <span className='text-zinc-500 text-sm block mr-2'>Create</span>
          <Button variant={"outline"} onClick={()=>{createTextBox()}}>Text</Button>
          <Button variant={"outline"}>Video Panel</Button>
          <Button variant={"outline"} onClick={()=>{createEqnBox()}}>Eqn</Button>
          <Button variant={"outline"}>Recommended Links</Button>
          <Button variant={"outline"} onClick={()=>{createImageBox()}}>Image</Button>
          <Button variant={"outline"} onClick={()=>{createCodeBox()}}>Code</Button>
        </ul>
      </div>
      <div className='flex gap-3 min-h-[500px] relative py-2'>
        <div className='p-2 w-[300px] h-full sticky top-2 flex-shrink-0'>
          <h2 className='font-medium tracking-wide text-slate-600 mb-3'>Components</h2>
          <ul className='flex flex-col gap-2'>
            {
              idsList.map(i=>{
                const {title}=datajson.find(_=>_.id==i)
                return <li className="text-zinc-400 text-xs cursor-pointer hover:text-blue-500 transition-all duration-75" key={i}
                  onClick={()=>{
                    scrollToElement(i)
                  }}
                >{title}</li>
              }
              )
            }
          </ul>
        </div>
        <div className='flex flex-col gap-4 flex-grow '>
          {/* {
            datajson.map((i,_)=>{
              switch(i.type){
                case "text":
                  return <TextBox content={i.props.content} id={i.id} key={i.id}/>
                  break;
                case "eqn":
                  return <EqnBox latex={i.latex} key={i.id}/>;
                case "image":
                  return <ImageBox key={i.id}></ImageBox>
                default:
                  return <Fragment key={i.id}></Fragment>;
              }
            })
          } */}
          {
            idsList.map((id,_)=>{
              const object=datajson.find(x=>x.id==id)
              switch(object.type){
                case "text":
                  return <TextBox id={id} key={id} update={updateText} deleteItem={deleteItem} title={object.title} updateTitle={updateTitle}
                    moveComponent={moveComponent}
                  />
                case "eqn":
                  return <EqnBox key={id} id={id} update={updateEqn} deleteItem={deleteItem} updateTitle={updateTitle} title={object.title}
                    moveComponent={moveComponent}
                  />;
                case "image":
                  return <ImageBox key={id} id={id} update={updateImage} deleteItem={deleteItem} updateTitle={updateTitle} title={object.title}
                    moveComponent={moveComponent}
                  />
                case "code":
                  return <CodeBox key={id} id={id} update={updateCode} deleteItem={deleteItem} updateTitle={updateTitle} title={object.title}
                    moveComponent={moveComponent}
                  />
                default:
                  return <Fragment key={id}></Fragment>;
              }
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Editor