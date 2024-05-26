import path from "path"
import { promises as fs } from "fs"
export const getSemesterSubjects= async ({semester})=>{
    try{
        const directory=path.join(process.cwd(),"json")
        const loadedData = await fs.readFile(directory + '/subjectData.json', 'utf8');
        const allSubjects=JSON.parse(loadedData).subjects
        const requiredSubjects=allSubjects.filter(i=>i.semester==semester).map(i=>({
            subjectId:i.subjectId,
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