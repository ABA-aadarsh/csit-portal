import connectToDatabase from "@/dbconfig"
import ModuleModel from "@/models/moduleModel"
import { unstable_cache } from "next/cache"
import subjectData from "@/json/subjectData.json"
import { getName, getSlug } from "@/lib/myUtils"

export const getSidebarData = unstable_cache(
    async ({subjectId})=>{
        try {
            await connectToDatabase()
            const data = await ModuleModel.find({sub: subjectId, viewAvailable: true}).select("title lesson")
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
        try {
            await connectToDatabase()
            const res = await ModuleModel.findOne({sub:subjectId, lesson: lesson, slug: moduleSlug, viewAvailable: true}).select("content")
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



export const getDefaultModule = 
unstable_cache(
    async ({lesson, subjectId})=>{
        try {
            await connectToDatabase()
            const res = await ModuleModel.findOne({sub: subjectId, lesson: lesson, viewAvailable: true}).select("content")
            return res.content          
        } catch (error) {
            console.log(error.message)
            return false
        }
    }
    ,["modules"],
    {
        tags: ["modules"]
    }
)


export const getDefaultModuleParams =async ()=>{
    try {
        const {subjects}=subjectData
        const list =[]
        subjects.forEach(sub=>{
            const subjectId = getSlug(sub.name)
            for(let i=0; i<sub.lessons.length;i++){
                list.push(
                    {
                        subjectId,
                        lesson: getSlug(sub.lessons[i].name)
                    }
                )
            }
        })
        return list
    } catch (error) {
        console.log(error)
        return []
    }
}

export const getModuleParams = async ()=>{
    try {
        await connectToDatabase()
        const data = await ModuleModel.find({viewAvailable:true}).select("lesson sub slug")
        const list = data.map(i=>(
            {
                subjectId: i.sub,
                lesson: i.lesson,
                moduleSlug: i.slug
            }
        ))
        console.log(list)
        return list
    } catch (error) {
        console.log(error.message)
        return []
    }
}