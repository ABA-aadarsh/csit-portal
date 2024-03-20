import { promises as fs } from 'fs';
import path from "path";

export default async function Page(req,res) {
    try{
        const {semester}=req.query
        const directory=path.join(process.cwd(),"json")
        const loadedData = await fs.readFile(directory + '/subjectData.json', 'utf8');
        const allSubjects=JSON.parse(loadedData).subjects
        const requiredSubjects=allSubjects.filter(i=>i.semester==semester)
        res.status(200).json({subjects:requiredSubjects})
    }catch(err){
        console.log(err)
        res.status(403).send("Failed to get subject data")
    }
}