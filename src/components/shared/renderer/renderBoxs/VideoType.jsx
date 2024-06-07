"use client";
import React, { useEffect, useState } from 'react'
import {
Tooltip,
TooltipContent,
TooltipProvider,
TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from 'lucide-react';
import Image from 'next/image';
  
function VideoType({list=[], title}) {
    const [selectedVideo,setSelectedVideo]=useState(list[0] || null)
  return (
    <div className='my-10'>
        <h1 className=' mb-6 text-xl text-headingColor font-semibold '>{title} by videos</h1>
        <div className='bg-zinc-600 mb-6 w-full mobile:h-[180px]  max-h-[360px]'>
            {
                selectedVideo &&
                <iframe className='w-full h-full' allowFullScreen="1"  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?origin=*`} data-title="video_title" title="video_title" frameBorder="0"></iframe>
            }
        </div>
        {
            list.length>1 &&
            <div className=''>
                <div className='flex gap-2 items-center mb-4'>
                    <p>Alternate Videos</p>
                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger><Info className='text-slate-500' size={20}/></TooltipTrigger>
                            <TooltipContent className="bg-slate-100 max-w-[500px]">
                            <p className='font-medium mb-2'>Watched a video but still have some doubts watch another one.</p>
                            <p>It is not necessary to watch all the videos in this list, they are alternatives</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className='flex gap-2 items-center w-full overflow-auto'>
                    {
                        list.map(i=>(
                            <div key={i.id} className='cursor-pointer relative shrink-0 w-[160px] h-[120px] bg-slate-400 ' onClick={()=>{
                                setSelectedVideo(i)
                            }}
                                title='Select this video'
                            >
                                <div className={`absolute z-50 bg-slate-950 w-full h-full transition-opacity duration-300 ${selectedVideo.id==i.id?"opacity-90":"opacity-0"} flex items-center justify-center`}>
                                    <p className='text-blue-500 font-bold'>Selected</p>
                                </div>
                                {/* <div className={`absolute z-30 bg-slate-950 w-full h-full transition-opacity duration-1000 animate-pulse`}>
                                </div> */}
                                <Image
                                    src={`https://img.youtube.com/vi/${i.videoId}/hqdefault.jpg`}
                                    width={160}
                                    height={120}
                                    alt={"Youtube Video"}
                                    className='relative z-40'
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        }
    </div>
  )
}

export default VideoType