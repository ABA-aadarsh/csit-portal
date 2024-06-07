import { Button, buttonVariants } from '@/components/ui/button';
import Navbar from '@/components/shared/Navbar'
import Link from 'next/link';
import React from 'react'
import { getSemesterSubjects } from './getSemestersSubjects';
import Footer from '@/components/shared/Footer';
import { Book, BookOpen, GraduationCap } from 'lucide-react';

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

export const dynamic = "force-static"

export const generateMetadata = async ({params})=>{
    const title = semesterNumberToText(params.semester)
    return {
        title: `${title} Semester | CSIT Portal`
    }
}

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
        <>
            <Navbar/>
            <main className='min-h-dvh mobile:px-4'>
                    <div className='max-w-[1200px] mx-auto'>
                        <div className='pt-12 pb-8'>
                            <div className='flex items-center gap-4  text-headingColor justify-center mb-3'>
                                <GraduationCap size={45} strokeWidth={2} className='text-headingColor'/>
                                <h1 className='text-3xl font-semibold'>{semesterNumberToText(params.semester)} Semester</h1>
                            </div>
                            <p className='text-headingColor text-center text-lg'>We are here to help <span className='font-semibold'>ace</span> your {semesterNumberToText(params.semester)} Semester</p>
                        </div>
                        <section className='py-14 mb-7'>
                            <h2 className='text-headingColor text-lg mb-5 mobile:text-center'>Subjects</h2>
                            <div className='grid grid-cols-[500px_500px] gap-x-10 gap-y-10 mobile:grid-cols-1 '>
                                {
                                    subjects.length > 0 &&
                                    subjects.map(i=>(
                                        <div key={i.subjectCode} className='shadow-border border-2 py-4 px-5 bg-white '>
                                            <div className='flex items-center gap-4 mb-4'>
                                                <Book size={35} absoluteStrokeWidth />
                                                <div>
                                                    <h2 className='text-lg mb-0'>{i.name}</h2>
                                                    <span className="text-sm">{i.subjectCode}</span>
                                                </div>
                                            </div>
                                            <p className='mb-5'>{i.desc.length>120? i.desc.substring(0,120)+"...":i.desc}</p>
                                            <Link href={"/subject/"+i.name.toLowerCase().trim().replace(/ /g, "-")+"/overview"}
                                            className=' w-[150px] py-2 px-4 rounded-sm bg-white text-headingColor border-2 border-black/15  transition-all cursor-pointer duration-700 flex items-center gap-4 hover:bg-rose-500 hover:text-white ease-in-out hover:pl-6 hover:border-rose-500'
                                            >
                                                <BookOpen size={20} />
                                                Learn
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
        
                        </section>
                    </div>
            </main>
            <Footer/>
        </>
        )
    }else{
        return(
            <p>Sorry failed to get data</p>
        )
    }
}

export default page