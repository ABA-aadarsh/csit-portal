import connectToDatabase from "@/dbconfig"
import BookModel from "@/models/bookModel"
import { NextResponse } from "next/server"

export const DELETE = async (req,{params})=>{
    try {
        await connectToDatabase()
        const {bookId}=params
        await BookModel.findOneAndDelete({driveId:bookId})
        return NextResponse.json(
            {message:"Deleted"},
            {status:200}
        )
    } catch (error) {
        console.log(error.message)
        return NextResponse.json(
            {message:"Failed to delete"},
            {status:400}
        )
    }
}