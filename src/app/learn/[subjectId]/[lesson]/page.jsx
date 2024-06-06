import React from 'react'
import Sidebar from "./_components/Sidebar"
import { getLessons, getSidebarData, getDefaultModule, getDefaultModuleParams } from './data/data'
import Renderer from '@/components/shared/renderer/renderer'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import NotFoundSVG from '@/components/shared/SVGComponents/NotFoundSVG'
import { getName, getSlug } from '@/lib/myUtils'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const generateStaticParams = async () => {
    const list = await getDefaultModuleParams()
    return list
}

export const generateMetadata= async ({params})=>{
    const {subjectId,lesson}=params
    return {
        title:`Learn ${getName(lesson)} - ${getName(subjectId)} - CSIT Portal`,
        description:`Clear your doubts in ${getName(lesson)} and ace your CSIT exam.`
    }
}

export const dynamic = false

async function page({ params }) {
    const moduleList = await getSidebarData({ subjectId: params.subjectId }) || []
    const lessons = await getLessons({ subjectId: params.subjectId })
    const moduleData = await getDefaultModule({
        lesson: params.lesson,
        subjectId: params.subjectId
    })
    const siblingModules = { prev: null, next: null }
    if (moduleList) {
        const mList = moduleList.filter(i => i.lesson == params.lesson)
        if (mList != -1 && mList.length > 1) siblingModules.next = mList[1].title
    }
    return (
        <>
            <Navbar />
            <div className='grid grid-cols-[350px_auto] gap-x-2 max-w-[1200px] mx-auto mb-6'>
                <Sidebar
                    lessons={lessons}
                    moduleList={moduleList}
                    subjectId={params.subjectId}
                    lessonId={params.lesson}
                />
                <main className='px-10'>
                    {
                        (moduleData && JSON.parse(moduleData)?.length > 0) ?
                            <>
                                <Renderer
                                    data={JSON.parse(moduleData)}
                                />
                            </>
                            :
                            <div>
                                <NotFoundSVG />
                            </div>
                    }

                    <div className='my-8 w-full grid grid-cols-2 grid-row-[118px] gap-40'>
                        <div>
                        </div>
                        <div className='flex items-center'>
                            {
                                siblingModules.next ?
                                    <Link
                                        href={`/learn/${params.subjectId}/${params.lesson}/${getSlug(siblingModules.next)}`}
                                        className='bg-rose-500/90 hover:bg-rose-600 duration-200 p-5 rounded-md flex items-center justify-end text-white gap-5 justify-self-end h-ful w-full'
                                    >
                                        <div className='text-right'>
                                            <p className='text-base text-dimishWhite'>Next Module</p>
                                            <p className='font-semibold text-[18px]'>{siblingModules.next}</p>
                                        </div>
                                        <ChevronRight />
                                    </Link> :
                                    <p className='text-right w-full'>End of lesson</p>
                            }
                        </div>
                    </div>
                </main>
            </div>
            <Footer />

        </>
    )
}

export default page