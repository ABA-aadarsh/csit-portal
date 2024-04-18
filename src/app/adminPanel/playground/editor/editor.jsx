"use client";
import { Button } from '@/components/ui/button';
import React, { Fragment, useEffect, useState } from 'react'
import TextBox from './boxes/TextBox';
import EqnBox from './boxes/EqnBox';
import ImageBox from './boxes/ImageBox';
import { v4 as uuidv4 } from 'uuid';
import CodeBox from './boxes/CodeBox';
import PrismLoader from './boxes/components/PrismContinuousRenderer';
import { Switch } from '@/components/ui/switch';
import VideoBox from './boxes/VideoBox';
import { componentHandler } from './boxes/hooks/componentHandler';
import RecommendedLinksBox from './boxes/RecommendedLinksBox';


function scrollToElement(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function Editor({datajson,setDatajson}) {
  const [prismCheckerEnable,setPrismCheckerEnable]=useState(false)
  const [idsList,setIdsList]=useState([]) // store the ids of the objects and run the iteration on that basis so that unnecessary rendering of other componenet is not done when one componenet is being changed
  const {
    createComponent,deleteItem,moveComponent,updateCode,updateEqn,updateImage,updateText,updateTitle,updateVideo,updateRecommendedLinks
  }=componentHandler({idsList,datajson,setDatajson,setIdsList})

  return (
    <div>
      <div className='flex gap-2 items-center'>
        <Button variant={"secondary"} onClick={()=>console.log(datajson)} className="mb-3">Log Data</Button>
        <div className='flex gap-1 items-center'>
          <Switch id="enablePrismChecker" checked={prismCheckerEnable} onCheckedChange={()=>setPrismCheckerEnable(prev=>!prev)}/>
          <label htmlFor="enablePrismChecker">Prism Checker</label>
        </div>
      </div>
      <div className='mb-4'>
        <ul className='flex gap-1 items-center'>
          <span className='text-zinc-500 text-sm block mr-2'>Create</span>
          <Button variant={"outline"} onClick={()=>{createComponent("text")}}>Text</Button>
          <Button variant={"outline"} onClick={()=>{createComponent("video")}}>Video Panel</Button>
          <Button variant={"outline"} onClick={()=>{createComponent("eqn")}}>Eqn</Button>
          <Button variant={"outline"} onClick={()=>{createComponent("recommendedLinks")}}>Recommended Links</Button>
          <Button variant={"outline"} onClick={()=>{createComponent("image")}}>Image</Button>
          <Button variant={"outline"} onClick={()=>{createComponent("code")}}>Code</Button>
        </ul>
      </div>
      <div className='flex gap-3 min-h-[500px] relative py-2 mb-10'>
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
                case "video":
                  return <VideoBox key={id} id={id} update={updateVideo} deleteItem={deleteItem} updateTitle={updateTitle} title={object.title}
                    moveComponent={moveComponent}
                  />
                case "recommendedLinks":
                  return <RecommendedLinksBox key={id} id={id} update={updateRecommendedLinks} deleteItem={deleteItem} updateTitle={updateTitle} title={object.title}
                  moveComponent={moveComponent}
                />
                default:
                  return <Fragment key={id}></Fragment>;
              }
            })
          }
        </div>
      </div>
      <PrismLoader checker={datajson} enable={prismCheckerEnable}/>
    </div>
  )
}

export default Editor