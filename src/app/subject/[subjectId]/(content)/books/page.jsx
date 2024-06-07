import NotFoundSVG from '@/components/shared/SVGComponents/NotFoundSVG'
import { getName } from '@/lib/myUtils'
import React from 'react'
import { getBooks, getSubjectIds } from './getBookData'

export const generateMetadata= async ({params})=>{
  const {subjectId}= params
  return {
    title: `${getName(subjectId)} - Books`,
    description:`E-Books for ${getName(subjectId)}. Learn from the experience of highly skilled programmers and tech enthusiasts.`
  }
}

export const generateStaticParams=async ()=>{
  const list = await getSubjectIds()
  return list
}

async function page({params}) {
  const books = await getBooks(params.subjectId)
  return (
    <main>
      <h1>Books</h1>
      <p>Learn more deeply first hand from the authors</p>
      <div className='flex flex-col gap-4'>
        {
          books.map(b=>{
            return (
              <div>
                <div>
                  
                </div>
              </div>
            )
          })
        }
      </div>
    </main>
  )
}

export default page