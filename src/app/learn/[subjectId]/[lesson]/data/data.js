import connectToDatabase from "@/dbconfig"
import ModuleModel from "@/models/moduleModel"
import { unstable_cache } from "next/cache"
import subjectData from "@/json/subjectData.json"
import { getName } from "@/lib/myUtils"

export const getSidebarData = unstable_cache(
    async ({subjectId})=>{
        try {
            await connectToDatabase()
            const data = await ModuleModel.find({sub: subjectId}).select("title lesson")
            console.log("I made database call again")
            return data
        } catch (error) {
            console.log(error)
            return false
        }
    },
    ["modules"],
    {
        tags: ["modules"]
    }
) 

export const getLessons = async ({subjectId})=>{
    try{
        const subjectName = getName(subjectId)
        const {subjects} = subjectData
        const s = subjects.find(i=>i.name == subjectName)
        return s.lessons
    }catch(error){
        console.log(error)
        return []
    }
}


export const getModuleData = 
unstable_cache(
    async ({moduleSlug, lesson, subjectId})=>{
        console.log("Called it again")
        try {
            const res = await ModuleModel.findOne({sub:subjectId, lesson: lesson, slug: moduleSlug})
            return res.content
        } catch (error) {
            console.log(error.message)
            return false
        }
    },
    ["modules"],
    {
        tags:["modules"]
    }
)
