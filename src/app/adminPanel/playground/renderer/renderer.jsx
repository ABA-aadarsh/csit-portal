import React from 'react'
import TextRenderer from './renderBoxs/TextType'
import PrismLoader from '../editor/boxes/components/PrismContinuousRenderer'
import CodeType from './renderBoxs/CodeType'
import EqnType from './renderBoxs/EqnType'
import ImageType from './renderBoxs/ImageType'
import RecommendedLinksType from './renderBoxs/RecommendedLinksType'
import VideoType from './renderBoxs/VideoType'

function Renderer({data=[]}) {
  return (
    <div>
      <div>
          <h1 className='font-medium text-2xl text-center mb-2'>Preview Renderer : <span className='text-slate-500'>How it would look to the users</span></h1>
          <hr className='mb-4'/>
      </div>
      <div className='flex justify-end mr-14'>
        <div className='max-w-[700px] pt-4 mb-10 w-full'>
          {
            data.map((o,_)=>{
              switch(o.type){
                case "text":
                  return <TextRenderer data={JSON.parse(o.props.content)} key={o.id+Date.now()+_}/>
                case "code":
                  return <CodeType code={o.code} language={o.language} label={o.title} key={o.id+Date.now()+_}/>
                case "eqn":
                  return <EqnType latex={o.latex}  key={o.id+Date.now()+_}/>
                case "image":
                  return <ImageType props={o.props}  key={o.id+Date.now()+_}/>
                case "recommendedLinks":
                  return <RecommendedLinksType list={o.list} title={o.title}  key={o.id+Date.now()+_}/>
                case "video":
                  return <VideoType list={o.list} key={o.id+Date.now()+_}/>
                default:
                  return <></>
              }
            })
          }
          <PrismLoader enable={true} checker={data}/>
        </div>
      </div>
    </div>
  )
}

export default Renderer