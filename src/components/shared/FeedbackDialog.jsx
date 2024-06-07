import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import React, { useState } from 'react'
import { SendHorizontal } from "lucide-react"

function FeedbackDialog() {
    const [value,setValue]=useState("")
    const [mailStatus,setMailStatus]=useState("notSent")
    const submitHandler = async (e)=>{
        e.preventDefault()
        if(value=="") return;
        try{
            const res = await fetch("/api/feedback",{
                method:"POST",
                body: JSON.stringify({feedback:value})
            })
            if(res.status==200) setMailStatus("Thanks for your feedback.")
            if(res.status==400) setMailStatus("Mail Failed. Try again later")
        }catch(error){
            console.log(error.message)
            if(res.status==400) setMailStatus("Mail Failed")
        }
    }
    return (
        <Dialog>
            <DialogTrigger className="py-[2px] px-2 rounded-sm text-white bg-rose-500 hover:bg-rose-200 hover:text-rose-700 h-[35px]">
                Feedback
            </DialogTrigger>
            <DialogContent className="bg-white rounded-md mobile:w-[90%] mx-auto">
                <DialogHeader>
                    <DialogTitle className="text-headingColor text-left">Give your Feedback</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <textarea name="feedback" id="feedback"
                        className="w-full p-2 h-[200px] outline-none rounded-sm mb-4 resize-none border-zinc-700/70 border-2"
                        placeholder="Write your feedback here..."
                        value={value}
                        onChange={(e)=>setValue(e.target.value)}
                    ></textarea>
                    <span className="block mb-5">{mailStatus!="notSent" && mailStatus}</span>
                    <button className={`bg-rose-500 hover:bg-rose-700 text-white p-3 rounded-sm flex items-center gap-3 ${value=="" && "bg-rose-400 hover:bg-rose-400"}`}
                        type="submit"
                        disabled={value==""}
                    >
                        <span>
                            Send
                        </span>
                        <SendHorizontal />
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default FeedbackDialog