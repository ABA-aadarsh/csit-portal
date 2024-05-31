import React from 'react'
import Sidebar from "./_components/Sidebar"
import { getLessons, getSidebarData } from './data/data'



async function page({params}) {
    const moduleList = await getSidebarData({subjectId:params.subjectId})
    const lessons = await getLessons({subjectId:params.subjectId})
    return (
        <div className='grid grid-cols-[300px_auto]'>
            <Sidebar
                lessons={lessons}
                moduleList={moduleList}
                subjectId={params.subjectId}
            />
            <main>
                content is shown here bitch
            </main>
        </div>
    )
}

export default page