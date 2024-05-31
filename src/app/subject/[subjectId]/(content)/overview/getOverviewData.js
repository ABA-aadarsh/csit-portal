import subjectData from "@/json/subjectData.json"

function getName(string) {
    let r = string.split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
     return r
}
function getSlug(string){
    let r = string.toLowerCase().trim().replace(/ /g,"-")
    return r
}

export const getSubjectData = async ({subjectId})=>{
    try {
        const subjectName = getName(subjectId)
        const {subjects} = subjectData
        const data = subjects.find(i=>i.name == subjectName)
        return {payload: data, success:true}
    } catch (error) {
        console.log(error)
        return {payload: error.message, success: false}
    }
}

export const getSubjectIds = async ()=>{
    const {subjects} = subjectData
    return subjects.map(i=>(
        {subjectId: getSlug(i.name)}
    ))
}