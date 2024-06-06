import NotFoundSVG from '@/components/shared/SVGComponents/NotFoundSVG'
import { getName } from '@/lib/myUtils'
import React from 'react'

export const generateMetadata= async ({params})=>{
  const {subjectId}= params
  return {
    title: `${getName(subjectId)} - Books`,
    description:`E-Books for ${getName(subjectId)}. Learn from the experience of highly skilled programmers and tech enthusiasts.`
  }
}

function page() {
  return (
    <div>
      <NotFoundSVG/>
    </div>
  )
}

export default page