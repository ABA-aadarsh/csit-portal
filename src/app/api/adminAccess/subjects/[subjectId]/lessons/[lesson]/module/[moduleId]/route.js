import connectToDatabase from "@/dbconfig"
import { getSlug } from "@/lib/myUtils"
import ModuleModel from "@/models/moduleModel"
import { NextResponse } from "next/server"

// for getting particular module
export const GET = async (req, {params})=>{
    try {
        await connectToDatabase()
        const {moduleId}=params
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

// for updating content and title of particular module
export const PATCH = async (req,{params})=>{
    try{
        await connectToDatabase()
        const {moduleId} = params
        const body= await req.json()
        const {content, title} = body
        await ModuleModel.findByIdAndUpdate(moduleId, {
            content,title,slug:getSlug(title)
        })
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


// for deleting a particular module
export const DELETE = async (req,{params})=>{
    try {
        await connectToDatabase()
        const {moduleId}=params
        await ModuleModel.findByIdAndDelete(moduleId)
        return NextResponse.json(
            {
                message:"Module Deleted Successfully"
            },{status: 200}
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                message:"Failed to delete the module"
            },{status: 403}
        )
    }
}


// for changing view- public or private
export const POST = async (req,{params})=>{
    try {
        await connectToDatabase()
        const {moduleId} = params
        const {viewAvailable}= await req.json()
        await ModuleModel.findByIdAndUpdate(moduleId, {
            viewAvailable: viewAvailable
        })
        return NextResponse.json(
            {
                message:"View Changed Complete"
            },{status:200}
        )
    } catch (error) {
        console.log(error.message)
        return NextResponse.json(
            {
                message:"Failed to change view of module"
            },{status:403}
        )
    }
}