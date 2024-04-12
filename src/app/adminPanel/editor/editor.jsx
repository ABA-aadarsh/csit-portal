"use client";
import { Button } from '@/components/ui/button';
import React, { Fragment, useEffect, useState } from 'react'
import TextBox from './boxes/TextBox';
import EqnBox from './boxes/EqnBox';
import ImageBox from './boxes/ImageBox';
import { v4 as uuidv4 } from 'uuid';

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
  return (
    <div>
      <Button variant={"secondary"} onClick={()=>console.log(datajson)} className="mb-3">Log Data</Button>
      <div>
        <ul className='flex gap-1'>
          <Button variant={"outline"} onClick={()=>{createTextBox()}}>Text</Button>
          <Button variant={"outline"}>Video Panel</Button>
          <Button variant={"outline"} onClick={()=>{createEqnBox()}}>Eqn</Button>
          <Button variant={"outline"}>Recommended Links</Button>
          <Button variant={"outline"} onClick={()=>{createImageBox()}}>Image</Button>
          <Button variant={"outline"}>Code</Button>
        </ul>
      </div>
      <div className='p-5 flex flex-col gap-4'>
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
                return <TextBox id={id} key={id} update={updateText}/>
              case "eqn":
                return <EqnBox latex={object.latex} key={id} id={id} update={updateEqn}/>;
              case "image":
                return <ImageBox key={id} id={id} update={updateImage}></ImageBox>
              default:
                return <Fragment key={id}></Fragment>;
            }
          })
        }
      </div>
    </div>
  )
}

export default Editor