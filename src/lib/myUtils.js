export const getName=(string)=>{
    let r = string.split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
     return r
}
export const getSlug=(string)=>{
    let r = string.toLowerCase().trim().replace(/ /g,"-")
    return r
}