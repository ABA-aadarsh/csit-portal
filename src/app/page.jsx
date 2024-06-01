import FeedbackBar from '@/components/shared/FeedbackBar'
import Navbar from '@/components/shared/Navbar'
import { Check, Library, LibraryBig, MoveRight, Shapes } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
      <main>
        <FeedbackBar/>
        <Navbar/>
        <section className='max-w-[1200px] mx-auto py-14'>
          <div className='mb-10'>
            <div className='w-2/5'>
              <h1 className='text-4xl font-semibold text-headingColor leading-[50px] mb-7'>Your choice of learning platform for <span className='text-rose-500'>CSIT</span></h1>
              <p className='text-lg font-medium text-balance'>Get interactive learning modules, downloadable notes, e-books, video resources and extensive questions database, everything you need to <span className='text-rose-600'>ace through 4 years of CSIT Learning Journey.</span></p>
            </div>
          </div>
          <div className='flex gap-10 items-start'>
            <div className='w-1/5'>
              <h2 className='text-headingColor text-2xl font-semibold mb-4 flex items-center gap-2'> <Library size={28} strokeWidth={2}/> Start Learning</h2>
              <p className='text-base font-medium'>Arranged resources by semester and subjects</p>
            </div>
            <div className='grow grid grid-cols-4 gap-x-5 gap-y-5'>
              {
                ["First","Second","Third","Fourth","Fifth","Sixth","Seventh","Eighth"].map((i,_)=>(
                <Link href={`/semester/${_+1}`}>
                  <div className='py-3 px-4 rounded-sm bg-white text-headingColor shadow-[0px_2px_5px_3px_#00000024]  transition-all cursor-pointer duration-700 flex items-center gap-4 hover:bg-rose-500 hover:text-white ease-in-out hover:pl-6' key={i} >
                    <Shapes size={28} absoluteStrokeWidth />
                    <span>{i} Semester</span>
                  </div>
                </Link>
                ))
              }
            </div>
          </div>
        </section>
        <section className='max-w-[1200px] mx-auto py-14'>
          <div className='mb-10'>
            <div className='w-2/5'>
              <h2 className='text-3xl text-heading font-semibold mb-7 leading-[50px]'>Learning is easy when you have right resources</h2>
              <ul className='ml-3 flex flex-col gap-4'>
                <li className="text-lg flex gap-2 items-center"><Check size={14} className='border-2 rounded-full text-green-700 border-green-700'/> Understandable notes</li>
                <li className="text-lg flex gap-2 items-center"><Check size={14} className='border-2 rounded-full text-green-700 border-green-700'/> Inclusion of resources for more deeper learning</li>
                <li className="text-lg flex gap-2 items-center"><Check size={14} className='border-2 rounded-full text-green-700 border-green-700'/> Improving consistently</li>
              </ul>
            </div>
          </div>

          <div className='mb-10'>
            <div className='w-2/5'>
              <h2 className='text-3xl text-heading font-semibold mb-7 leading-[50px]'>Test your knowledge by practice modules at the end of each lesson</h2>
              <ul className='ml-3 flex flex-col gap-4'>
                <li className='text-lg flex gap-2 items-center'><Check size={14} className='border-2 rounded-full text-green-700 border-green-700'/> Important questions for exams</li>
                <li className='text-lg flex gap-2 items-center'><Check size={14} className='border-2 rounded-full text-green-700 border-green-700'/> Clarify your concepts</li>
              </ul>
            </div>
          </div>

          <div>
            <div>
              <h2 className='text-3xl text-heading font-semibold mb-7 leading-[50px] text-center'>And More Resources</h2>

            </div>
          </div>
        </section>


        {/* <section className='max-w-[1200px] mx-auto'>
          <h1>Help this platform grow.</h1>
          <p>This platform is developed by a single person for benefit of all and has rooms for improvement in UI, code, assets and content. Help this platform reach more people with your skills</p>

          <button>Connect with developer</button>
        </section> */}


        <footer className='bg-[#2b324d] py-16 text-whitish'>
          <div className='max-w-[1200px] mx-auto grid grid-cols-[400px_200px_200px] gap-x-10 mb-10'>

            <div>
              <Link href={"/"}>
                <h1 className='text-lg font-semibold mb-6'>CSIT PORTAL</h1>
              </Link>
              <p className='text-dimishWhite'>Go to place for learning by CSIT students.</p>
            </div>

            <div>
              <h4 className='text-lg font-semibold mb-6'>Semesters</h4>
              <ul className='flex flex-col gap-4 text-dimishWhite'>
                  <li className='hover:text-white'>
                    <Link href={"/semester/1"}>First Semester</Link>
                  </li>
                  <li className='hover:text-white'>
                    <Link href={"/semester/2"}>Second Semester</Link>
                  </li>
                  <li className='hover:text-white'>
                    <Link href={"/semester/3"}>Third Semester</Link>
                  </li>
                  <li className='hover:text-white'>
                    <Link href={"/semester/4"}>Fourth Semester</Link>
                  </li>
                  <li className='hover:text-white'>
                    <Link href={"/semester/5"}>Fifth Semester</Link>
                  </li>
                  <li className='hover:text-white'>
                    <Link href={"/semester/6"}>Sixth Semester</Link>
                  </li>
                  <li className='hover:text-white'>
                    <Link href={"/semester/7"}>Seventh Semester</Link>
                  </li>
                  <li className='hover:text-white'>
                    <Link href={"/semester/8"}>Eighth Semester</Link>
                  </li>
              </ul>
            </div>

            <div>
              <h4 className='text-lg font-semibold mb-6'>Links</h4>
              <ul className='flex flex-col gap-4 text-dimishWhite'>
                  <li className='hover:text-white'>
                    <Link href={"/about"}>About</Link>
                  </li>
                  <li className='hover:text-white'>
                    <Link href={"/feedback"}>Feedback</Link>
                  </li>
              </ul>
            </div>
          </div>
          <div className='max-w-[1200px] mx-auto border-t-2 border-slate-300/60 pt-6'>
            <p>Platform free for all to learn</p>
          </div>
        </footer>
      </main>
  )
}

export default page