import { Button, buttonVariants } from '@/components/ui/button';
import Navbar from '@/components/shared/Navbar'
import Link from 'next/link';
import React from 'react'
import { getSemesterSubjects } from './getSemestersSubjects';

export const dynamic = "force-static"

export const generateStaticParams=()=>{
    const list = [1,2,3,4,5,6,7,8]
    return list.map(i=>({semester:i+""}))
}

async function page({params}) {
    const semester=params.semester
    const {success,payload} = await getSemesterSubjects({semester})
    if(success){
        const subjects=payload
        return (
        <div>
            <Navbar/>
            <div>
                <div>
                    <div>
                        <h1>Semester - {semester}</h1>
                    </div>
                    <section>
                        <div className='flex gap-4 flex-wrap'>
                            {
                                subjects.length > 0 &&
                                subjects.map(i=>(
                                    <div key={i.subjectCode} className='shadow-border border-2 p-2 w-[300px]'>
                                        <div>
                                            <h2 className='text-lg'>{i.name}</h2>
                                            <span className="text-sm">{i.subjectCode}</span>
                                        </div>
                                        <p>{i.desc}</p>
                                        <Link href={"/subject/"+i.name.toLowerCase().trim().replace(/ /g, "-")+"/overview"} className={buttonVariants({variant:"secondary"})}>Learn</Link>
                                    </div>
                                ))
                            }
                        </div>
    
                    </section>
                </div>
            </div>
        </div>
        )
    }else{
        return(
            <p>Sorry failed to get data</p>
        )
    }
}

export default page