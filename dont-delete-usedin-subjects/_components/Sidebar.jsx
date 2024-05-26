"use client";
import Link from 'next/link';
const listItemStyle="w-full cursor-pointer hover:bg-secondary/80 py-1 flex items-center gap-1"
import React from 'react'
import { BiBook } from "react-icons/bi";
import { ImLab } from "react-icons/im";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaQuestion } from "react-icons/fa6";

function Sidebar({params, subjectName="Loading..."}) {
    return (
        <div className=' h-full shadow-border border-2 border-t-0 w-[230px] p-2 overflow-auto'>
            {/* <h1 className='text-sm min-h-[40px] flex items-center mb-2'>{subjectName.toUpperCase()}</h1> */}
            <div>
                <ul className='flex flex-col gap-2'>
                    <Link href={`/subject/${params.subjectId}/overview`}>
                        <li className={listItemStyle+` ${params.tab=="overview"?"text-rose-500":" "}`}>
                            <BiBook className='text-[22px]' />
                            <span>Overview</span>
                        </li>
                    </Link>
                    <Link href={`/subject/${params.subjectId}/reports`}>
                        <li className={listItemStyle+` ${params.tab=="reports"?"text-rose-500":" "}`}>
                            <ImLab className='text-[22px]' />
                            <span>Lab Reports</span>
                        </li>
                    </Link>
                    <li className={listItemStyle}>
                        <BiBook className='text-[22px]' />
                        <span>Books</span>
                    </li>
                    <li className={listItemStyle}>
                        <MdOutlineOndemandVideo className='text-[22px]' />
                        <span>Video Resources</span>
                    </li>
                    <li className={listItemStyle}>
                        <FaQuestion className='text-[22px]' />
                        <span>Question Bank</span>
                    </li>
                    <li className='w-fit p-1 bg-rose-600 rounded-sm text-white cursor-pointer'>Take Test</li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar