import connectToDatabase from "@/dbconfig"
import { getSlug } from "@/lib/myUtils"
import ModuleModel from "@/models/moduleModel"
import { NextResponse } from "next/server"


export const POST = async (req,{params})=>{
    await connectToDatabase()
    // creating a new module
    const {subjectId, lesson} = params
    const {content,title} = await req.json()
    try {
        const newModule = new ModuleModel(
            {
                sub: subjectId,
                lesson: lesson,
                content: content,
                title: title,
                slug: getSlug(title)
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
    await connectToDatabase()
    const {subjectId,lesson}=params
    try {
        const data = await ModuleModel.find({sub:subjectId,lesson:lesson}).select("_id title viewAvailable")
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