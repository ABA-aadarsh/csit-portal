import React from 'react'
import Editor from './editor/editor'
export const metadata= {
  title: 'Editor Panel',
};

function page() {
  return (
    <div className='w-full h-dvh p-3'>
      <Editor/>
    </div>
  )
}

export default page