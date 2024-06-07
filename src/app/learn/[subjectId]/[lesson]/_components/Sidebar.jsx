import { getName, getSlug } from '@/lib/myUtils'
import { Book, Circle, Menu, Notebook } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo } from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
  


const SidebarContent =  ({moduleList,lessons, subjectId, lessonId, moduleSlug})=>{
    return (
        <>
            <Accordion type="multiple" defaultValue={[lessonId]}>
                {
                    lessons.map((i,lessonIndex)=>{
                        const mList = moduleList.filter(m=>m.lesson==i.name.toLowerCase().replace(/ /g,"-"))
                        const practiceModule = mList.find(i=>i.title == "Practice Module")
                        if(practiceModule){
                            const i = mList.findIndex(i=>i.title == "Practice Module")
                            mList.splice(i,1)
                            mList.push(practiceModule)
                        }
                        const lessonSlug = getSlug(i.name)
                        return (
                            <AccordionItem value={lessonSlug} key={lessonSlug+i.name+lessonIndex}>
                                <AccordionTrigger >
                                    <div className="flex items-center gap-2">
                                        <Notebook className='cursor-pointer' size={15}/>
                                        <h3 className='text-left'>{i.name}</h3>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    {
                                        mList.length>0 &&

                                        <ul className='ml-6 flex flex-col gap-3 mb-4'>
                                            {
                                                mList.map((p,moduleIndex)=>(
                                                    <li key={p._id} className={`${(lessonId==lessonSlug && ((!moduleSlug && moduleIndex==0) || (moduleSlug && getSlug(p.title)==moduleSlug)) )? "text-rose-500":""} text-sm flex items-center gap-2`}>
                                                        <Circle size={8} className={`${(lessonId==lessonSlug && ((!moduleSlug && moduleIndex==0) || (moduleSlug && getSlug(p.title)==moduleSlug)) )? "bg-rose-500 rounded-full":""}`} />
                                                        <Link href={`/learn/${subjectId}/${lessonSlug}/${getSlug(p.title)}`} className='text-left'>
                                                        {p.title}
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    }
                                    {
                                        mList.length==0 &&
                                        (   
                                            <>
                                                <p className='text-slate-700 ml-7 mb-4 mobile:text-left'>Sorry, currently no module available here.</p>
                                            </>
                                        )
                                    }
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })
                }
            </Accordion>
        </>
    )
}

function Sidebar({moduleList,lessons, subjectId, lessonId, moduleSlug}) {
  return (
    <>
        <div className='py-8 sticky top-[48px] max-h-[calc(100dvh-48px)] overflow-y-auto pr-4 mobile:hidden'>
            <Link href={`/subject/${subjectId}/overview`}>
                <h2 className='text-headingColor font-semibold text-lg mb-6'><Book className='inline-block' /> {getName(subjectId)}</h2>
            </Link>
            <SidebarContent
                lessonId={lessonId}
                lessons={lessons}
                moduleList={moduleList}
                moduleSlug={moduleSlug}
            />
        </div>

        <div className='hidden mobile:block px-4  sticky top-[48px]'>
            <Sheet>
                <SheetTrigger className="flex items-center gap-3 w-full bg-whitish border-b-2 py-2">
                    <Menu />
                    <span>Menu</span>
                </SheetTrigger>
                <SheetContent side="left" className="bg-white pb-10 overflow-auto">
                    <SheetHeader>
                    <SheetTitle>
                        <Link href={`/subject/${subjectId}/overview`}>
                            <h2 className='text-headingColor font-semibold text-lg mb-6 text-left'><Book className='inline-block' /> {getName(subjectId)}</h2>
                        </Link>
                    </SheetTitle>
                    <SidebarContent
                        lessonId={lessonId}
                        lessons={lessons}
                        moduleList={moduleList}
                        moduleSlug={moduleSlug}
                    />
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    </>
  )
}

export default Sidebar