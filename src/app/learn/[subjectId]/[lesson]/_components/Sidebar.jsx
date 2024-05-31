import { getSlug } from '@/lib/myUtils'
import Link from 'next/link'
import React from 'react'

function Sidebar({moduleList,lessons, subjectId}) {
  return (
    <div>
        {
            lessons.map((i,lessonIndex)=>{
                const mList = moduleList.filter(m=>m.lesson==i.name.toLowerCase().replace(/ /g,"-"))
                const lessonSlug = getSlug(i.name)
                return (
                    <div key={i.name}>
                        <h1>{i.name}</h1>
                        <ul className='ml-3'>
                            {
                                mList.map((p,moduleIndex)=>(
                                    <li key={p._id}>
                                        <Link href={`/learn/${subjectId}/${lessonSlug}/${getSlug(p.title)}`}>
                                           {p.title}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Sidebar