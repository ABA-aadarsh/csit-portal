import React from 'react'
import { getSubjectData, getSubjectIds } from './getOverviewData'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export const generateStaticParams=()=>{
    const list = getSubjectIds()
    return list
}


async function page({params}) {
  const {payload, success} =await getSubjectData({subjectId:params.subjectId})

  if(success){
    return (
        <main>
          <article>
              <div>
                <h1>{payload.name}</h1>
                <p>{payload.subjectCode}</p>
                <span>Semester : {payload.semester}</span>
                <span>Full Marks: {payload.marksScheme?.full}</span>
                <span>Pass Marks: {payload.marksScheme?.pass}</span>
              </div>

              <p>{payload.desc}</p>

              <div>
                <Link className={buttonVariants({variant:"btnTypeA"})}
                  href={"#"}
                >
                  Learn
                </Link>

                <ul>
                  {
                    payload.lessons.map((i,_)=>(
                      <li key={_}>
                        <Link
                          href={`/learn/${params.subjectId}/${i.name.toLowerCase().replace(/ /g,"-")}`}
                        >
                          {i.name}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>

          </article>
        </main>
    )
  }else{
    return (
      <h1>Failed to get data</h1>
    )
  }
}

export default page