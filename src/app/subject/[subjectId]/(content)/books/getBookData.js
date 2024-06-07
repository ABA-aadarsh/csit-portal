import connectToDatabase from "@/dbconfig";
import BookModel from "@/models/bookModel";
import { unstable_cache } from "next/cache";
import subjectData from "@/json/subjectData.json"
import { getSlug } from "@/lib/myUtils";

export const getBooks = unstable_cache(async (subjectId)=>{
    try {
        await connectToDatabase()
        const data = await BookModel.find({sub:subjectId})
        return data
    } catch (error) {
        console.log(error.message)
        return []
    }
},
    ["books"],
    {
        tags:["books"]
    }
)

export const getSubjectIds = async ()=>{
    const {subjects} = subjectData
    return subjects.map(i=>(
        {subjectId: getSlug(i.name)}
    ))
}