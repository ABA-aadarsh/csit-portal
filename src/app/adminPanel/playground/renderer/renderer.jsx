import React from 'react'
import TextRenderer from './renderBoxs/TextType'
import PrismLoader from '../editor/boxes/components/PrismContinuousRenderer'
import CodeType from './renderBoxs/CodeType'

function Renderer({data=[]}) {
  return (
    <div>
      <div>
          <h1 className='font-medium text-2xl text-center mb-2'>Preview Renderer : <span className='text-slate-500'>How it would look to the users</span></h1>
          <hr className='mb-4'/>
      </div>
      <div>
        {
          data.map(o=>{
            console.log("hi")
            if(o.type=="text"){
              return <TextRenderer data={JSON.parse(o.props.content)} key={Date.now()}/>
            }
            switch(o.type){
              case "text":
                return <TextRenderer data={JSON.parse(o.props.content)} key={o.id+Date.now()}/>
              case "code":
                return <CodeType code={o.code} language={o.language} key={o.id+Date.now()}/>
              default:
                return <></>
            }
          })
        }
        <PrismLoader enable={true} checker={data}/>
      </div>
    </div>
  )
}

export default Renderer