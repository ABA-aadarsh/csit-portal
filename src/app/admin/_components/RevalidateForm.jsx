"use client"
import { Button } from '@/components/ui/button'
import React from 'react'

function RevalidateForm({revalidateAction}) {
  return (
    <div>
        <Button variant={"btnTypeA"} onClick={async ()=>{
                await revalidateAction()
        }}>Revalidate Modules</Button>
    </div>
  )
}

export default RevalidateForm