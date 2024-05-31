import subjectData from "@/json/subjectData.json"

export const getSemesterSubjects= async ({semester})=>{
    try{
        const allSubjects=subjectData.subjects
        const requiredSubjects=allSubjects.filter(i=>i.semester==semester).map(i=>({
            subjectCode:i.subjectCode,
            name:i.name,
            desc:i.desc
        }))
        return {success:true, payload:requiredSubjects}
    }catch(error){
        console.log(error)
        return {success:false, payload:error}
    }   
}