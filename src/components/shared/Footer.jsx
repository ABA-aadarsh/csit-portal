import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className='bg-[#2b324d] py-16 text-whitish px-10 mobile:px-4'>
          <div className='max-w-[1200px] mx-auto grid grid-cols-[400px_200px_200px] gap-x-10 mb-10 mobile:grid-cols-1 mobile:gap-y-10'>

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
  )
}

export default Footer