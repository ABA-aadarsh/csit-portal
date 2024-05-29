import connectToDatabase from "@/dbconfig"
import ModuleModel from "@/models/moduleModel"
import { NextResponse } from "next/server"

export const GET = async (req, {params})=>{
    await connectToDatabase()
    const {subjectId,lesson,moduleId}=params
    try {
        const {content, title} = await ModuleModel.findById(moduleId)
        return NextResponse.json(
            {
                content, title
            },{status: 200}
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                message:"Error"
            },{status: 403}
        )
    }
}