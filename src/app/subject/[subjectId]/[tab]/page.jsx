"use client";
import { buttonVariants } from '@/components/ui/button'
import Navbar from '@/myComponents/Navbar/Navbar'
import React, { useEffect } from 'react'
import Overview from './Overview';
import Reports from './Reports';
import Link from 'next/link';
import Sidebar from './Sidebar';
import {useParams} from 'next/navigation'
import { useSubjectDetails } from '@/hooks/useSubjectDetails';
function page() {
  const params=useParams()
  const [subjectData]=useSubjectDetails(params.subjectId)
  const renderTabComponent=()=>{
    switch(params.tab.toLowerCase()){
      case "overview":
        return <Overview subjectData={subjectData}/>;
      case "reports":
        return <Reports/>;
      default:
        return null;
    }
  }
  return (
    <div className='h-dvh flex flex-col w-dvw'>
        <Navbar/>
        <div className='flex flex-grow'>
          <Sidebar params={params} subjectName={subjectData?.name || ""}/>
          <div className='flex-grow p-2'>
            {
              subjectData &&
              renderTabComponent()
            }
          </div>
        </div>
    </div>
  )
}

export default page