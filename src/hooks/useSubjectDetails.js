"use client";
import { useEffect, useState } from "react";
export const useSubjectDetails=(subjectId)=>{
    const fetchData=async (subjectId)=>{
        const res=await fetch("/api/subjectDetail/"+subjectId)
        const {data}=await res.json()
        setData(data)
    }
    const [data,setData]=useState(null)
    useEffect(()=>{
        fetchData(subjectId)
    },[subjectId])
    return [data]
}