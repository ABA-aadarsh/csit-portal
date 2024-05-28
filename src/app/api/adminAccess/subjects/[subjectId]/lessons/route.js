import subjectData from "@/json/subjectData.json"
import { NextResponse } from "next/server"
export const GET = async (req,{params})=>{
    try{
        const subjectId=params.subjectId
        const sub = subjectData["subjects"].find(i=>i.subjectId==subjectId)
        return NextResponse.json(
            {
                payload: sub.lessons
            },{status:200}
        )
    }catch(error){
        console.log(error)
        return NextResponse.json({message:"Error aayo"},{status:405})
    }
}