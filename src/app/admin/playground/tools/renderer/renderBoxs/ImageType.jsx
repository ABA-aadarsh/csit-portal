import React from 'react'

function ImageType({props, title}) {
  return (
    <div className='m-auto my-10 text-center max-w-full px-3'>
        <img className='w-full object-contain h-auto m-auto mb-6' src={props.src} alt={props.alt}/>
        <span className='font-medium text-zinc-600'>
            Fig: {title}
        </span>
    </div>
  )
}

export default ImageType