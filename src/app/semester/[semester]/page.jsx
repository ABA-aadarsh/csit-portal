"use client";
import { Button, buttonVariants } from '@/components/ui/button';
import { useSubjects } from '@/hooks/useSubjectData';
import Navbar from '@/myComponents/Navbar/Navbar'
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation'
import React from 'react'

function page() {
    // const 
    const {semester}=useParams()
    if(!(['1','2','3','4','5','6','7','8'].includes(semester))){
        redirect("/semester")
    }
    const [subjects]=useSubjects(semester)

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
                                    <Link href={"/subject/"+i.name} className={buttonVariants({variant:"secondary"})}>Learn</Link>
                                </div>
                            ))
                        }
                    </div>

                </section>
            </div>
        </div>
    </div>
  )
}

export default page