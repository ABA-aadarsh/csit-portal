import React from 'react'

function page({params}) {
  return (
    <div>
        <h1>SubjectId = {params.subjectId}</h1>
        <h1>Lessons = {params.lesson}</h1>
        <p>This is practise section for lesson = {params.lesson}</p>
    </div>
  )
}

export default page