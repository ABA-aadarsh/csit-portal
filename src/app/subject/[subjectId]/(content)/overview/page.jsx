import React from 'react'

export const generateStaticParams=()=>{
    return [
        {subjectId:"iit"},
        {subjectId:"digital-logic"},
        {subjectId:"physics"}
    ]
}


function page({params}) {
  return (
    <div>overview-{params.subjectId}</div>
  )
}

export default page