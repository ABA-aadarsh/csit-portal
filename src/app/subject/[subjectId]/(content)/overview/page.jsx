import React from 'react'
import { getSubjectData, getSubjectIds } from './getOverviewData'
import Link from 'next/link'
import { Book, BookOpen, Notebook } from 'lucide-react'
import { getName } from '@/lib/myUtils'

export const generateStaticParams=async()=>{
    const list =await getSubjectIds()
    return list
}


export const generateMetadata = async ({params})=>{
  const {subjectId}=params
  return {
    title:`${getName(subjectId)} - Overview`,
    description:`Learn ${getName(subjectId)} from CSIT Portal. All resources and informations available from syllabus to modules.`
  }
}


async function page({params}) {
  const {payload, success} =await getSubjectData({subjectId:params.subjectId})

  if(success){
    return (
        <main>
          <article className='mx-auto mt-10 mb-16 mobile:mt-6'>
              <div className='mb-8'>
                <h1 className='text-2xl font-semibold text-headingColor mb-7 text-center mobile:mb-10'>{payload.name}</h1>
                <div className='max-w-[700px] mx-auto grid grid-cols-[auto_auto] justify-between gap-y-2 text-headingColor'>
                  <p className='block w-fit'>Code: <span className='font-semibold'>{payload?.subjectCode}</span></p>
                  <p className='block w-fit'>Semester : <span className='font-semibold'>{payload?.semester}</span></p>
                  <p className='block w-fit'>Full Marks: <span className='font-semibold'>{payload?.marksScheme?.full}</span></p>
                  <p className='block w-fit'>Pass Marks: <span className='font-semibold'>{payload?.marksScheme?.pass}</span></p>
                </div>
              </div>

              <p className='text-headingColor leading-[30px] mb-5 mobile:leading-[25px] mobile:mb-10'>{payload?.desc}</p>

              <Link href={`/learn/${params.subjectId}/${payload.lessons[0].name.toLowerCase().replace(/ /g,"-")}`}
                className=' w-[170px] py-2 px-4 rounded-sm bg-white text-headingColor border-2 border-black/15  transition-all cursor-pointer duration-700 flex items-center gap-4 hover:bg-rose-500 hover:text-white ease-in-out hover:pl-6 hover:border-rose-500 mb-6 mobile:mb-10'
              >
                  <BookOpen size={20} />
                  <span>Start Now</span>
              </Link>
              
              <div>
                <h3 className='text-xl font-semibold text-headingColor mb-5'>{payload.lessons.length}  Lessons</h3>
                <ul className='flex flex-col gap-4'>
                  {
                    payload.lessons.map((i,_)=>(
                      <li key={_} className=' hover:text-blue-800 transition duration-500 text-headingColor w-fit'>
                        <Link
                          href={`/learn/${params.subjectId}/${i.name.toLowerCase().replace(/ /g,"-")}`}
                          className=' text-lg font-medium flex gap-2 items-center '
                        >
                          <Notebook className='cursor-pointer' size={15}/>
                          <span>{i.name}</span>
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>

          </article>
        </main>
    )
  }else{
    return (
      <h1>Failed to get data</h1>
    )
  }
}

export default page