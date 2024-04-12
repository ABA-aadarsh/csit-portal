"use client";
import { useEffect, useState } from "react";
export const useSemesterSubjects=(semester)=>{
    const fetchData=async (semester)=>{
        const res=await fetch("/api/semesterSubjects/"+semester)
        const {subjects}=await res.json()
        setData([...subjects])
    }
    const [data,setData]=useState([])
    useEffect(()=>{
        if(["1","2","3","4","5","6","7","8"].includes(semester)){
            fetchData(semester)
        }
    },[semester])
    return [data]
}