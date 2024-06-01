"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { toast } from 'react-toastify'

function RevalidateForm({revalidateAction}) {
  return (
    <div>
        <Button variant={"btnTypeA"} onClick={async ()=>{
              const res =  await revalidateAction()
              if(res){
                toast.success("Modules Revalidated Globally")
              }else{
                toast.error("Modules Revalidation Failed")
              }
        }}>Revalidate Modules</Button>
    </div>
  )
}

export default RevalidateForm