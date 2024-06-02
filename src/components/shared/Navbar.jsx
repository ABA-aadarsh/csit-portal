"use client";
import { Button, buttonVariants } from '@/components/ui/button'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GoTriangleDown } from "react-icons/go";
import Link from 'next/link';

function Navbar() {
  return (
    <header className='sticky top-0 bg-whitish z-10'>
        <nav
            className='py-2 border-2 shadow-border h-[48px]'
        >
            <div
                className='flex items-center gap-10 max-w-[1200px] m-auto relative'
            >
                <div
                >
                    <Link href={"/"}>
                        <h1
                            className='text-rose-500 text-lg font-semibold'
                        >CSIT PORTAL</h1>
                    </Link>
                </div>
                <div className='flex gap-5'>
                    {/* links and navigations */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex gap-1 items-center outline-none'>
                            <span>Semester</span>
                            <i><GoTriangleDown/></i>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="flex flex-col gap-2 px-2 bg-white">
                            <DropdownMenuItem><Link href="/semester/1" className='inline-block w-full'>1st Semester</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/semester/2" className='inline-block w-full'>2st Semester</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/semester/3" className='inline-block w-full'>3rd Semester</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/semester/4" className='inline-block w-full'>4th Semester</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/semester/5" className='inline-block w-full'>5th Semester</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/semester/6" className='inline-block w-full'>6th Semester</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/semester/7" className='inline-block w-full'>7th Semester</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/semester/8" className='inline-block w-full'>8th Semester</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* <Link href={"/questionbank"} >Question Bank</Link>
                    <Link href={"/about"} >About</Link> */}
                </div>
                <div className='absolute right-0'>
                    <Button className="py-[2px] text-white bg-rose-500 hover:bg-rose-200 hover:text-rose-700 h-[35px]">Feedback</Button>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Navbar