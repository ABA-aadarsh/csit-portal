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
    <header>
        <nav
            className='py-2 border-2 shadow-border'
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
                            <DropdownMenuItem><Link href="/semester/1">1st Semester</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/semester/2">2st Semester</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/semester/3">3rd Semester</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/semester/4">4th Semester</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/semester/5">5th Semester</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/semester/6">6th Semester</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/semester/7">7th Semester</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/semester/8">8th Semester</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link href={"/questionbank"} >Question Bank</Link>
                    <Link href={"/about"} >About</Link>
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