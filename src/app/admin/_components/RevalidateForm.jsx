"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { toast } from 'react-toastify'

function RevalidateForm({revalidateAction, title=""}) {
  return (
    <div>
        <Button variant={"btnTypeA"} onClick={async ()=>{
              const res =  await revalidateAction()
              if(res){
                toast.success(title +" Revalidated Globally")
              }else{
                toast.error( title + " Revalidation Failed")
              }
        }}>{title}</Button>
    </div>
  )
}

export default RevalidateForm