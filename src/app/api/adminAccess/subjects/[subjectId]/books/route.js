import connectToDatabase from "@/dbconfig"
import BookModel from "@/models/bookModel"
import ModuleModel from "@/models/moduleModel"
import { NextResponse } from "next/server"


export const GET = async (req,{params})=>{
    try {
        await connectToDatabase()
        const {subjectId}=params
        const data = await BookModel.find({sub:subjectId}).select("driveId name")
        return NextResponse.json(
            {payload:data},
            {status:200}
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {payload:error.message},
            {status:400}
        )
    }
}


export const POST = async (req,{params})=>{
    try {
        await connectToDatabase()
        const {subjectId}=params
        const {name,driveId}=await req.json()
        const newBook = BookModel(
            {
                name:name,
                driveId:driveId,
                sub:subjectId 
            }
        )
        await newBook.save()
        return NextResponse.json({message:"Done"},{status:200})
    } catch (error) {
        console.log(error.message)
        return NextResponse.json(
            {payload:error.message},
            {status:400}
        )
    }
}