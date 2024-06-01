import { Button, buttonVariants } from '@/components/ui/button';
import Navbar from '@/components/shared/Navbar'
import Link from 'next/link';
import React from 'react'
import { getSemesterSubjects } from './getSemestersSubjects';
import Footer from '@/components/shared/Footer';

export const dynamic = "force-static"

export const generateStaticParams=()=>{
    const list = [1,2,3,4,5,6,7,8]
    return list.map(i=>({semester:i+""}))
}

async function page({params}) {
    const semester=params.semester
    const {success,payload} = await getSemesterSubjects({semester})
    const semesterNumberToText=(n)=>{
        switch(n){
            case "1": return "First"
            case "2": return "Second"
            case "3": return "Third"
            case "4": return "Fourth"
            case "5": return "Fifth"
            case "6": return "Sixth"
            case "7": return "Seventh"
            case "8": return "Eight"
            default: return "Not Valid";
        }
    }
    if(success){
        const subjects=payload
        return (
        <main>
            <Navbar/>
            <div>
                <div>
                    <div>
                        <h1>{semesterNumberToText(params.semester)} Semester</h1>
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

            <Footer/>
        </main>
        )
    }else{
        return(
            <p>Sorry failed to get data</p>
        )
    }
}

export default page