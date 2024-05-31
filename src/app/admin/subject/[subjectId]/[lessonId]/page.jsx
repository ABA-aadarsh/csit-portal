import Link from 'next/link'
import Modules from './_components/Modules'

function page({params}){
  return (
    <div>
        <div className='flex justify-center items-center relative mt-3'>
            <h1 className='uppercase'>{params.subjectId} / {params.lessonId.replace(/-/g, ' ')}</h1>
            <Link className='p-2 rounded-md bg-slate-900 text-white absolute right-10'
              href={`/admin/playground?sub=${params.subjectId}&lesson=${params.lessonId}&mode=create`}
            >Create New Module</Link>
        </div>
        <div>

          <Modules lesson={params.lessonId} sub={params.subjectId}/>
          
        </div>
    </div>
  )
}

export default page