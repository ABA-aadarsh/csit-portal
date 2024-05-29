import connectToDatabase from "@/dbconfig"
import ModuleModel from "@/models/moduleModel"
import { NextResponse } from "next/server"


export const POST = async (req,{params})=>{
    console.log("hey")
    await connectToDatabase()
    // creating a new module
    const {subjectId, lesson} = params
    const {content,title} = await req.json()
    console.log(subjectId,content,title,lesson)
    try {
        const newModule = new ModuleModel(
            {
                sub: subjectId,
                lesson: lesson,
                content: content,
                title: title
            }
        )
        await newModule.save()
        return NextResponse.json({message:"sucess"},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"error"},{status:405})
    }
}



export const GET = async (req,{params})=>{
    console.log("what")
    await connectToDatabase()
    const {subjectId,lesson}=params
    try {
        const data = await ModuleModel.find({sub:subjectId,lesson:lesson}).select("_id title")
        return NextResponse.json(
            {
                payload: data
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