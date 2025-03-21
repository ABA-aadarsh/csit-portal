import React from 'react'
import Sidebar from '../_components/Sidebar'
import { getLessons, getModuleData, getSidebarData, getModuleParams } from '../data/data'
import Renderer from '@/components/shared/renderer/renderer'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getName, getSlug } from '@/lib/myUtils'
import NotFoundSVG from '@/components/shared/SVGComponents/NotFoundSVG'

export const generateStaticParams = async ()=>{
    const list = await getModuleParams()
    return list
}

export const generateMetadata= async ({params})=>{
    const {subjectId,lesson,moduleSlug}=params
    return {
        title:`Module ${getName(moduleSlug)} - Lesson ${getName(lesson)} | ${getName(subjectId)} `,
        description:`Clear your doubts in ${getName(lesson)} and ace your CSIT exam.`
    }
}

export const dynamic = false

async function page({params}) {
    const moduleList = await getSidebarData({subjectId:params.subjectId}) || []
    const lessons = await getLessons({subjectId:params.subjectId}) || []
    const siblingModules ={prev:null, next:null}
    const {moduleSlug} = params
    if(moduleList){
        const m = moduleList.filter(i=>i.lesson == params.lesson)
        const mIndex = m.findIndex(i=>getSlug(i.title)==moduleSlug)
        if(mIndex!=-1){
            if(mIndex!=0) siblingModules.prev=m[mIndex-1].title
            if(mIndex!=m.length-1) siblingModules.next=m[mIndex+1].title
        }
    }
    

    const moduleData = await getModuleData(
        {
            moduleSlug: moduleSlug,
            lesson: params.lesson,
            subjectId: params.subjectId
        }
    )
    if(!moduleData){
        return (
            <div>
                <NotFoundSVG/>
            </div>
        )
    }
    return (
        <>
            <Navbar/>
            <div className='grid grid-cols-[350px_auto] gap-x-2 max-w-[1200px] mx-auto mb-6 mobile:grid-cols-1'>
                <Sidebar
                    lessons={lessons}
                    moduleList={moduleList}
                    subjectId={params.subjectId}
                    lessonId={params.lesson}
                    moduleSlug={moduleSlug}
                />
                <main className='px-10 mb-10 mobile:px-4'>
                    {
                        moduleData &&
                        <>
                            {
                                JSON.parse(moduleData).length>0?
                                <Renderer
                                    data={JSON.parse(moduleData)}
                                />:
                                <>
                                    <NotFoundSVG/>
                                </>
                            }

                            <div className='my-8 w-full grid grid-cols-2 gap-40 mobile:gap-5 mobile:grid-cols-1 mobile:grid-rows-[70px_70px] -order-1'>
                                <div>
                                    {
                                        siblingModules.prev &&
                                        <Link
                                            href={`/learn/${params.subjectId}/${params.lesson}/${getSlug(siblingModules.prev)}`}
                                            className='bg-rose-500/90 hover:bg-rose-600 duration-200 p-5 rounded-md flex items-center text-white h-full w-full moblie:p-2'
                                        >
                                            <div>
                                                <p className='text-base text-dimishWhite mobile:text-sm'>Previous Module</p>
                                                <p className='font-semibold text-[18px] mobile:text-base'>{siblingModules.prev}</p>
                                            </div>
                                        </Link>
                                    }
                                </div>
                                <div className='flex items-center'>
                                    {
                                        siblingModules.next ?
                                        <Link
                                            href={`/learn/${params.subjectId}/${params.lesson}/${getSlug(siblingModules.next)}`}
                                            className='bg-rose-500/90 hover:bg-rose-600 duration-200 p-5 rounded-md flex items-center justify-end text-white gap-5 justify-self-end h-full w-full mobile:p-2'
                                        >
                                            <div className='text-right'>
                                                <p className='text-base text-dimishWhite mobile:text-sm'>Next Module</p>
                                                <p className='font-semibold text-[18px] mobile:text-base'>{siblingModules.next}</p>
                                            </div>
                                            <ChevronRight />
                                        </Link>:
                                        <p className='text-right w-full mobile:text-center'>End of lesson</p>
                                    }
                                </div>
                            </div>
                        </>
                    }
                </main>
            </div>
            <Footer/>
        </>
    )
}

export default page