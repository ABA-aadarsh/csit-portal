import React from 'react'
import Sidebar from "./_components/Sidebar"
import { getLessons, getSidebarData, getDefaultModule, getDefaultModuleParams } from './data/data'
import Renderer from './_components/renderer/renderer'

export const generateStaticParams = async ()=>{
    const list = await getDefaultModuleParams()
    return list
}

export const dynamic = false

async function page({params}) {
    const moduleList = await getSidebarData({subjectId:params.subjectId})
    const lessons = await getLessons({subjectId:params.subjectId})
    const module = await getDefaultModule({
        lesson: params.lesson,
        subjectId: params.subjectId
    })
    if(!module){
        return <h1>Failed to get this module</h1>
    }
    return (
        <div>
            <div className='grid grid-cols-[300px_auto]'>
                <Sidebar
                    lessons={lessons}
                    moduleList={moduleList}
                    subjectId={params.subjectId}
                />
                <main>
                    <Renderer
                        data={JSON.parse(module)}
                    />
                </main>
            </div>
        </div>
    )
}

export default page