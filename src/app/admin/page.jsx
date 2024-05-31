import React from 'react'
import {promises as fs} from "fs"
import path from 'path'
import subjectData from "@/json/subjectData.json"
import Link from 'next/link'
import RevalidateForm from './_components/RevalidateForm'
import { revalidateTag } from 'next/cache'


const SemesterAndSubjects=async ()=>{
    
    const jsonData=subjectData.subjects
    const data =[
        {semester:1,subs:[]},
        {semester:2,subs:[]},
        {semester:3,subs:[]},
        {semester:4,subs:[]},
        {semester:5,subs:[]},
        {semester:6,subs:[]},
        {semester:7,subs:[]},
        {semester:8,subs:[]},

    ]
    jsonData.map(sub=>{
        const s = sub.semester
        data[s-1].subs.push({name:sub.name})
    })

    const revalidateAction = async ()=>{
        "use server"
        try {
            revalidateTag("modules")
            console.log("Revalidated modules")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='px-4'>
            <h1 className='text-center mb-8 text-lg'>Subjects</h1>
            <RevalidateForm revalidateAction={revalidateAction}/>

            {
                data.map(({semester,subs})=>{
                    return (
                        <div key={"semester-"+semester} className='mb-6'>
                            <h1 className='text-base font-semibold mb-2 text-slate-800'>Semester {semester}</h1>
                            <ul className='ml-5'>
                                {
                                    subs.map(i=>{
                                        return <li key={i.name} className='list-none text-[20px] text-blue-800'>
                                            <Link href={`/admin/subject/${i.name.toLowerCase().trim().replace(/ /g, "-")}`}>{i.name}</Link>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    )
}

function page() {
  return (
    <div>
        <SemesterAndSubjects/>
    </div>
  )
}

export default page