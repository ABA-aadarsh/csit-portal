import React from 'react'
import Playground from './playground/playground';
export const metadata= {
  title: 'Playground',
};

function page() {
  return (
    <div className='w-full h-dvh p-4'>
      <Playground/>
    </div>
  )
}

export default page