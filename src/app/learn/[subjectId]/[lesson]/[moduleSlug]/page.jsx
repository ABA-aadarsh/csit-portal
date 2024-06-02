import React from 'react'
import Sidebar from '../_components/Sidebar'
import { getLessons, getModuleData, getSidebarData, getModuleParams } from '../data/data'
import Renderer from '../_components/renderer/renderer'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export const generateStaticParams = async ()=>{
    const list = await getModuleParams()
    return list
}

export const dynamic = false

async function page({params}) {
    const moduleList = await getSidebarData({subjectId:params.subjectId})
    const lessons = await getLessons({subjectId:params.subjectId})
    const {moduleSlug} = params

    const module = await getModuleData({
        moduleSlug: moduleSlug,
        lesson: params.lesson,
        subjectId: params.subjectId
    })
    if(!module){
        return <h1>Failed to get this module</h1>
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
                <main className='px-10'>
                    {
                        module &&
                        <Renderer
                            data={JSON.parse(module)}
                        />
                    }
                    {
                        !module &&
                        <h1>Sorry Module Not Found</h1>
                    }
                </main>
            </div>
            <Footer/>
        </>
    )
}

export default page