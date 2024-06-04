import { Box } from 'lucide-react'
import React from 'react'

function RecommendedLinksType({list,title=""}) {
  return (
    <div className='border-l-4 px-5 border-green-500 bg-green-400/10 text-headingColor py-5 my-8'>
        <div className='mb-3 flex items-center gap-3'>
            <Box className='text-green-700'/>
            <h1 className='text-xl tracking-wide text-green-700 font-semibold '>Recommended Resources</h1>
        </div>
        <p className='text-base tracking-wide text-green-800 mb-5'>{title}</p>
        <ul className='flex my-2 gap-1 flex-col list-inside list-none'>
            {
                list.map(i=>{
                    return (
                        <li key={i.id} className='underline text-green-800'><a href={i.link} aria-label={i.title} target='blank'>{i.title}</a></li>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default RecommendedLinksType