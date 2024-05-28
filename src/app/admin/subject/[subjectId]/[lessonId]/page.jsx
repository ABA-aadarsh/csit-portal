import React from 'react'

function page({params}) {
  return (
    <div>
        <h1 className='capitalize'>{params.lessonId.replace(/-/g, ' ')} ({params.subjectId})</h1>
    </div>
  )
}

export default page