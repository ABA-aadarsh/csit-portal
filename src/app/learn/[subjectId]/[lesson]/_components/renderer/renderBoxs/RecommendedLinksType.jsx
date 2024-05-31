import React from 'react'

function RecommendedLinksType({list,title=""}) {
  return (
    <div className='border-2 rounded-md border-green-300 bg-green-500/5 p-3 my-4'>
        <h1 className='text-xl tracking-wide text-green-600'>{title}</h1>
        <ul className='flex my-4 gap-1 flex-col list-inside list-none pl-3'>
            {
                list.map(i=>{
                    return (
                        <li key={i.id} className='underline text-green-700'><a href={i.link} aria-label={i.title} target='blank'>{i.title}</a></li>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default RecommendedLinksType