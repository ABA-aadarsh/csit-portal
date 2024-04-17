import React from 'react'
import TextRenderer from './renderBoxs/TextType'

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
            if(o.type=="text"){
              return <TextRenderer data={JSON.parse(o.props.content)} key={Date.now()}/>
            }
          })
        }
      </div>
    </div>
  )
}

export default Renderer