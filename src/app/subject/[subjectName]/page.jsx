import { buttonVariants } from '@/components/ui/button'
import Navbar from '@/myComponents/Navbar/Navbar'
import React from 'react'
import { BiBook } from "react-icons/bi";
import { ImLab } from "react-icons/im";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaQuestion } from "react-icons/fa6";
const listItemStyle="w-full cursor-pointer hover:bg-secondary/80 py-1 flex items-center gap-1"
function page({params}) {
  return (
    <div className='h-dvh flex flex-col w-dvw'>
        <Navbar/>
        <div className='flex flex-grow'>
          <div className=' h-full shadow-border border-2 border-t-0 w-[300px] p-2 overflow-auto'>
            <h1 className='text-xl mb-2'>{params.subjectName.toUpperCase()}</h1>
            <div>
              <ul className='flex flex-col gap-2'>
                <li className={listItemStyle}>
                  <BiBook className='text-[22px]'/>
                  <span>Overview</span>
                </li>
                <li className={listItemStyle}>
                  <ImLab className='text-[22px]'/>
                  <span>Lab Reports</span>
                </li>
                <li className={listItemStyle}>
                  <BiBook className='text-[22px]'/>
                  <span>Books</span>
                </li>
                <li className={listItemStyle}>
                  <MdOutlineOndemandVideo className='text-[22px]'/>
                  <span>Video Resources</span>
                </li>
                <li className={listItemStyle}>
                  <FaQuestion className='text-[22px]'/>
                  <span>Question Bank</span>
                </li>
                <li className='w-fit p-1 bg-rose-600 rounded-sm text-white cursor-pointer'>Take Test</li>
              </ul>
            </div>
          </div>
          <div></div>
        </div>
    </div>
  )
}

export default page