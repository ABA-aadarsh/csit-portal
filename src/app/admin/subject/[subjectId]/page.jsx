import React from 'react'
import BooksManager from './_components/Books'
import Lessons from './_components/Lessons'

function page({params}) {
  return (
    <div className='text-zinc-900'>
        <h1 className='uppercase p-2 text-rose-500'>{params.subjectId}</h1>
        <div className='grid grid-cols-[auto_500px]'>
            <div>
                <Lessons subjectId={params.subjectId}/>

            </div>
            <div className='px-1 border-l-2 border-zinc-500'>
                <BooksManager subjectId={params.subjectId}/>
            </div>

        </div>
    </div>
  )
}

export default page