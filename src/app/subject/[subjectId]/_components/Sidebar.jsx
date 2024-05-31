"use client";
import Link from 'next/link';
const listItemStyle="w-full cursor-pointer hover:bg-secondary/80 py-1 flex items-center gap-1"
import React from 'react'
import { BiBook } from "react-icons/bi";
import { ImLab } from "react-icons/im";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaQuestion } from "react-icons/fa6";
import { usePathname } from 'next/navigation';

function Sidebar({}) {
    const paths=usePathname().split("/")
    const tab = paths.pop()
    const subjectId =paths.pop()
    const tabs=[
        {name:"Overview",link:`overview`,icon:<BiBook className='text-[22px]'/>},
        {name:"Lab Reports",link:`reports`,icon:<ImLab className='text-[22px]'/>},
        {name:"Books",link:`books`,icon:<BiBook className='text-[22px]'/>},
        {name:"Video Resources",link:`videos`,icon:<MdOutlineOndemandVideo className='text-[22px]'/>},
        {name:"Questions Bank",link:`questions-bank`,icon:<FaQuestion className='text-[22px]'/>}
    ]
    return (
        <div className=' h-full shadow-border border-2 border-t-0 p-2 overflow-auto'>
            <h1 className='text-sm min-h-[40px] flex items-center mb-2 capitalize'>{subjectId.replace(/-/g," ")}</h1>
            <div>
                <ul className='flex flex-col gap-2'>
                    {
                        tabs.map(i=>(
                            <Link href={`/subject/${subjectId}/${i.link}`} key={i.name}>
                                <li className={listItemStyle+` ${tab==i.link?"text-rose-500":" "}`}>
                                    {i.icon}
                                    <span>{i.name}</span>
                                </li>
                            </Link>
                        ))
                    }
                    <li className='w-fit p-1 bg-rose-600 rounded-sm text-white cursor-pointer'>Take Test</li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar