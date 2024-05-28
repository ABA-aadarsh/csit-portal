import React from 'react'

function ImageType({props}) {
  return (
    <div className='m-auto mt-4 text-center max-w-[700px] px-3'>
        <img className='w-full object-contain h-auto m-auto mb-6' src={props.src} alt={props.alt}/>
        <span className='font-medium text-zinc-600'>
            Fig: {props.alt}
        </span>
    </div>
  )
}

export default ImageType