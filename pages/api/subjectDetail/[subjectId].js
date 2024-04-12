import { promises as fs } from 'fs';
import path from "path";
export default async function Page(req,res) {
    try{
        const {subjectId}=req.query
        const directory=path.join(process.cwd(),"json")
        const loadedData = await fs.readFile(directory + '/subjectData.json', 'utf8');
        const allSubjects=JSON.parse(loadedData).subjects
        const data=allSubjects.find(i=>i.subjectId==subjectId)
        res.status(200).json({data:data})
    }catch(err){
        console.log(err)
        res.status(403).send("Failed to get subject data")
    }
}