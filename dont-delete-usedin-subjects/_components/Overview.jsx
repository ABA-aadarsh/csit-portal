"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'

function Overview({subjectData}) {
    const {subjectId}=useParams()
    return (
        <div>
            <div>
              <h1 className="text-center text-xl py-4">{subjectData.name}</h1>
              <div>
                <span className='p-1 rounded-sm bg-slate-300'>{subjectData.subjectCode}</span>
              </div>
            </div>
            <div>
              <ul>
                {
                  subjectData.lessons.map((i,index)=>(
                    <li key={index} className='text-indigo-600 text-lg'>
                      <Link href={"#"}>{i.name}</Link>
                    </li>
                  ))
                }
              </ul>
            </div>
        </div>
  )
}

export default Overview