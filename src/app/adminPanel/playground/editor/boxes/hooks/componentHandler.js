"use client";
import { v4 as uuidv4 } from 'uuid';
export const componentHandler=({idsList,setIdsList,datajson,setDatajson})=>{
    const createComponent=(type="text")=>{
        let obj
        switch(type){
            case "text":
                obj={
                    type: "text",
                    title:"untitled text",
                    props:{
                      content:JSON.stringify([
                        {
                          type: 'paragraph',
                          children: [
                            {
                              text: "Start writing now ... ",
                            }
                          ],
                        }
                      ])
                    }
                }
                break;
            case "video":
                obj={
                    type: "video",
                    title:"untitled videos",
                    list:[]
                }
                break;
            case "code":
                obj={
                    type:"code",
                    title:"untitled code",
                    language:"html",
                    code:""
                }
                break;
            case "eqn":
                obj={
                    type:"eqn",
                    title:"untitled eqn",
                    latex:""
                }
                break;
            case "image":
                obj={
                    type:"image",
                    title:"untitled image",
                    props:{
                        width:"",height:"",src:"", alt:""
                    }
                }
                break;
            case "recommendedLinks":
                obj={
                    type:"recommendedLinks",
                    title:"links topic",
                    list:[]
                }
                break
            default:
                return
        }
        const id=uuidv4()
        setDatajson(prev=>(
        [...prev,
            {
            id: id,
            ...obj
            }
        ]
        ))
        setIdsList(prev=>[...prev,id])
    }
    const updateTitle=({id, title})=>{
        setDatajson(prev=>{
          const o=prev.find(_=>_.id==id)
          o.title=title
          return [...prev]
        })
    }
    const updateCode=({id,code,language})=>{
        setDatajson(prev=>{
          const o = prev.findIndex(_=>_.id==id)
          prev[o].code=code
          prev[o].language=language
          return [...prev]
        })
    }
    const updateRecommendedLinks=({id,list})=>{
        setDatajson(prev=>{
          const o = prev.findIndex(_=>_.id==id)
          prev[o].list=list
          return [...prev]
        })
    }
    const deleteItem=(id)=>{
        setIdsList(prev=>prev.filter((_)=>_!=id))
        setDatajson(prev=>{
          return prev.filter(_=>_.id!=id)
        })
    }
    const updateImage=({id,props})=>{
        setDatajson(prev=>{
          const o = prev.findIndex(_=>_.id==id)
          prev[o].props=props
          return [...prev]
        })
    }
    const updateEqn=({id,latex})=>{
        setDatajson(prev=>{
          const o = prev.findIndex(_=>_.id==id)
          prev[o].latex=latex
          return [...prev]
        })
    }
    const updateText=({id,content})=>{
        setDatajson(prev=>{
          const o = prev.findIndex(_=>_.id==id)
          prev[o].props.content=content
          return [...prev]
        })
    }
    const updateVideo=({id,list})=>{
        setDatajson(prev=>{
            const o = prev.findIndex(_=>_.id==id)
            prev[o].list=list
            return [...prev]
          })
    }
    const moveComponent=({id,up})=>{
        const o = idsList.findIndex(_=>_==id)
        if((o==0 && up==true) || (o==(idsList.length-1) && up==false)){
          return
        }
        idsList.splice(o,1)
        if(up==true){
          idsList.splice(o-1,0,id)
        }else{
          idsList.splice(o+1,0,id)
        }
        setIdsList([...idsList])
    }
    return {createComponent,deleteItem,moveComponent,updateCode,updateEqn,updateImage,updateText,updateTitle,updateVideo,updateRecommendedLinks}
}