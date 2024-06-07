import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
export const POST = async (req)=>{
    try{
        const {feedback} = await req.json()
        const transporter=nodemailer.createTransport(
            {
                host:"smtp.gmail.com",
                secure:true,
                auth:{
                    user: process.env.NODEMAILER_EMAIL,
                    pass: process.env.NODEMAILER_PASSWORD
                }
            }
        )
        const mail=await transporter.sendMail(
            {
                from:process.env.NODEMAILER_EMAIL,
                to:"aadarshbandhuaryal@gmail.com",
                subject:"Feedback for CSIT PORTAL",
                html:`
                    <div>
                        <div>
                            <h3>Feedback</h3>
                            <p>${feedback}</p>
                        </div>
                    </div>
                `
            }
        )
        return NextResponse.json(
            {message:"Mail sent!"},
            {status:200}
        )
    }catch(error){
        console.log(error.message)
        return NextResponse.json(
            {message:"Mail failed"},
            {status:400}
        )
    }
}