import Link from 'next/link'
import React from 'react'

function page({params}) {
  return (
    <div>
        <div className='flex gap-2 mb-4'>
          <h1 className='uppercase'>{params.lessonId.replace(/-/g, ' ')} ({params.subjectId})</h1>
          <Link className='p-2 rounded-md bg-slate-900 text-white'
            href={`/admin/playground?sub=${params.subjectId}&lesson=${params.lessonId}&mode=create`}
          >Create New Module</Link>
        </div>
        <div>
          
        </div>
    </div>
  )
}

export default page