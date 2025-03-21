import React from 'react'
import TextRenderer from './renderBoxs/TextType'
import PrismLoader from './renderBoxs/PrismContinuousRenderer'
import CodeType from './renderBoxs/CodeType'
import EqnType from './renderBoxs/EqnType'
import ImageType from './renderBoxs/ImageType'
import RecommendedLinksType from './renderBoxs/RecommendedLinksType'
import VideoType from './renderBoxs/VideoType'
import QA from './renderBoxs/QA'

function Renderer({data=[]}) {
  return (
        <article className='py-4 mb-10 w-full pl-2'>
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
                  return <ImageType props={o.props}  key={o.id+Date.now()+_} title={o.title}/>
                case "recommendedLinks":
                  return <RecommendedLinksType list={o.list} title={o.title}  key={o.id+Date.now()+_}/>
                case "video":
                  return <VideoType list={o.list} key={o.id+Date.now()+_} title={o.title}/>
                case "qa":
                  return <QA key={o.id+Date.now()} data={{...o}}/>
                default:
                  return <></>
              }
            })
          }
          <PrismLoader enable={true}/>
        </article>
  )
}

export default Renderer