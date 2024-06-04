"use client";
import React, { useState } from 'react'
import Latex from 'react-latex-next';
import Topbar from './components/Topbar';
import { buttonVariants } from '@/components/ui/button';

function QABox(
    {
        id, 
        update = ({id,q,a,qImg,aImg})=>{},
        deleteItem = (id)=>{},
        title,
        updateTitle =({id,title})=>{},
        moveComponent=()=>{},
        initialData
    }
) {
    const [data,setData]=useState(
        initialData ||
        {
            question:"",
            questionImg:"",
            answer:"",
            answerImg:""
        }
    )
  return (
    <div className='border-2 shadow-border rounded-lg overflow-hidden'
    id={id}>
        <Topbar
                deleteItem={deleteItem}
                moveComponent={moveComponent}
                title={title}
                updateTitle={updateTitle}
                id={id}
        />
        <form
            onSubmit={e=>{
                e.preventDefault()
                update(
                    {
                        id,
                        q:data.question,
                        a:data.answer,
                        qImg: data.questionImg,
                        aImg: data.answerImg
                    }
                )
            }}
            className='p-2'
        >
            <div className='flex flex-col gap-2'>
                <span>Question</span>
                <input type="text" value={data.question}
                    onChange={(e)=>setData(prev=>({...prev,question:e.target.value}))}
                    className='p-2 border-2'
                />
            </div>
            <div className='flex flex-col gap-2'>
                <span>Question Image</span>
                <input type="text" value={data.questionImg}
                    onChange={(e)=>setData(prev=>({...prev,questionImg:e.target.value}))}
                    className='p-2 border-2'
                />
            </div>
            <div className='flex flex-col gap-2'>
                <span>Answer</span>
                <input type="text" value={data.answer}
                    onChange={(e)=>setData(prev=>({...prev,answer:e.target.value}))}
                    className='p-2 border-2'
                />
            </div>
            <div className='flex flex-col gap-2'>
                <span>Answer Image</span>
                <input type="text" value={data.answerImg}
                    onChange={(e)=>setData(prev=>({...prev,answerImg:e.target.value}))}
                    className='p-2 border-2'
                />
            </div>
            <button className={buttonVariants({variant:"outline"})} type='submit'>Save</button>
        </form>
        <div className='p-2'>
            <p className='text-center'>Preview</p>
            <div>
                <p>Question</p>
                <Latex>
                    {data.question}
                </Latex>
            </div>
            <div>
                <p>Answer</p>
                <Latex>
                    {data.answer}
                </Latex>
            </div>
        </div>
    </div>
  )
}

export default QABox


/* 
for now questions and answers would be saved in latex format for ease
additional one image for question and one for answer are alloted
*/