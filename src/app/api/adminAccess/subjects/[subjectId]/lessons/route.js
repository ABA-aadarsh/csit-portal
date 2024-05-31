import subjectData from "@/json/subjectData.json"
import { getName } from "@/lib/myUtils"
import { NextResponse } from "next/server"
export const GET = async (req,{params})=>{
    try{
        const subjectId=params.subjectId
        const subjectName = getName(subjectId)
        const sub = subjectData["subjects"].find(i=>i.name==subjectName)
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