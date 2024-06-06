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

export const dynamic = false

async function page({params}) {
    const moduleList = await getSidebarData({subjectId:params.subjectId}) || []
    const lessons = await getLessons({subjectId:params.subjectId}) || []
    const siblingModules ={prev:null, next:null}
    const {moduleSlug} = params
    if(moduleList){
        const m = moduleList.filter(i=>i.lesson == params.lesson)
        const mIndex = m.findIndex(i=>getSlug(i.title)==moduleSlug)
        console.log(mIndex)
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
            <div className='grid grid-cols-[350px_auto] gap-x-2 max-w-[1200px] mx-auto mb-6'>
                <Sidebar
                    lessons={lessons}
                    moduleList={moduleList}
                    subjectId={params.subjectId}
                    lessonId={params.lesson}
                    moduleSlug={moduleSlug}
                />
                <main className='px-10 mb-10'>
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

                            <div className='my-8 w-full grid grid-cols-2 grid-row-[118px] gap-40'>
                                <div>
                                    {
                                        siblingModules.prev &&
                                        <Link
                                            href={`/learn/${params.subjectId}/${params.lesson}/${getSlug(siblingModules.prev)}`}
                                            className='bg-rose-500/90 hover:bg-rose-600 duration-200 p-5 rounded-md flex items-center text-white h-full w-full'
                                        >
                                            <div>
                                                <p className='text-base text-dimishWhite'>Previous Module</p>
                                                <p className='font-semibold text-[18px]'>{siblingModules.prev}</p>
                                            </div>
                                        </Link>
                                    }
                                </div>
                                <div className='flex items-center'>
                                    {
                                        siblingModules.next ?
                                        <Link
                                            href={`/learn/${params.subjectId}/${params.lesson}/${getSlug(siblingModules.next)}`}
                                            className='bg-rose-500/90 hover:bg-rose-600 duration-200 p-5 rounded-md flex items-center justify-end text-white gap-5 justify-self-end h-full w-full'
                                        >
                                            <div className='text-right'>
                                                <p className='text-base text-dimishWhite'>Next Module</p>
                                                <p className='font-semibold text-[18px]'>{siblingModules.next}</p>
                                            </div>
                                            <ChevronRight />
                                        </Link>:
                                        <p className='text-right w-full'>End of lesson</p>
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