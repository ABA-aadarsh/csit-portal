"use client";
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import Renderer from './renderer/renderer';
import Editor from './editor/editor';

function Playground() {
    const [activeTab,setActiveTab]=useState("editor")
    const [datajson,setDatajson]=useState([])
    const [previewData,setPreviewData]=useState([])
  return (
    <div>
        <div className='p-2 flex justify-end'>
            <div className='flex gap-2'>
                <Button className={`${activeTab=="editor"?"bg-slate-400 hover:bg-slate-400":""}`} variant="outline"
                    onClick={
                        ()=>{
                            setActiveTab("editor")
                        }
                    }
                >
                    <span>Editor</span>
                </Button>
                <Button className={`${activeTab=="preview"?"bg-slate-400 hover:bg-slate-400":""}`} variant="outline"
                    onClick={
                        ()=>{
                            setActiveTab("preview")
                            setPreviewData([...datajson])
                        }
                    }
                >
                    <span>Preview</span>
                </Button>
            </div>
        </div>
        <div>
            <div className={`${activeTab=="preview"?"block":"hidden"}`}>
                <Renderer data={previewData}/>
            </div>
            <div className={`${activeTab=="editor"?"block":"hidden"}`}>
                <Editor datajson={datajson} setDatajson={setDatajson}/>
            </div>
        </div>
    </div>
  )
}

export default Playground