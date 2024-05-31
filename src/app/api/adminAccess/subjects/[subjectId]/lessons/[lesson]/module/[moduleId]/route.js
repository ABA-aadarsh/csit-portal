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


export const PATCH = async (req,{params})=>{
    try{
        await connectToDatabase()
        const {moduleId} = params
        const {content,title}=await ModuleModel.findByIdAndUpdate(moduleId)
        return NextResponse.json(
            {
                message:"Updation Complete"
            },{status:200}
        )

    }catch(error){
        console.log(error)
        return NextResponse.json(
            {
                message:"Error while updating module, error message: "+error.message
            },{status:405}
        )
    }
}