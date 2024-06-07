import NotFoundSVG from '@/components/shared/SVGComponents/NotFoundSVG'
import { getName } from '@/lib/myUtils'
import React from 'react'
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { getBooks, getSubjectIds } from './getBookData'
import Link from 'next/link';
import { Download } from 'lucide-react';
import NoDataYetSVG from '@/components/shared/SVGComponents/NoDataYetSVG';

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
    <main >
      <article className='mt-10 mb-16'>
      <h1 className='text-headingColor text-3xl leading-[50px] mb-4'>Books</h1>
      <p className='text-headingColor text-lg mb-10'>Learn more deeply first hand from the authors</p>
      <div className='flex flex-col gap-7'>
        {
          books.length>0 && books.map(({name,driveId,_id},_)=>{
            return (
              <div key={_id}>
                <div className='flex items-center gap-40  mobile:gap-5'>
                  <div className='flex items-center gap-3'>
                    <BsFillFileEarmarkPdfFill className='text-[#ea4335] text-[20px]'/>
                    <Link href={`https://drive.google.com/file/d/${driveId}/view`} target='blank' className='hover:text-blue-700 '>
                      <span>{name}</span>
                    </Link>
                  </div>
                  <div>
                    <Link href={`https://drive.google.com/uc?export=download&id=${driveId}`} title='Download' className='hover:text-green-700'>
                      <Download size={20}/>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      {
        books.length==0 && 
        <NoDataYetSVG
          title='No Books Here Yet.'
          message='We are working on it.'
        />
      }
      </article>
    </main>
  )
}

export default page