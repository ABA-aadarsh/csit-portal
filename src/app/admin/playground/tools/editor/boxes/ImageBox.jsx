"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import Topbar from './components/Topbar';
const tailwindclasses = {
    input: "p-2 shadow-border border-2 rounded-md",
    inputSpan: "text-zinc-500"
}
function ImageBox({ id, update = ({ id, props }) => { } , title, updateTitle=({id,title})=>{},deleteItem=(id)=>{},moveComponent}) {
    const [props, setProps] = useState(
        {
            src: "/next.svg",
            width: 300,
            height: 300,
            alt: "A template alt"
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
            <div className='p-3 shadow-border border-2'>
                <div className='mb-4 flex gap-4 items-center'>
                    <h1 className='text-xl'>Image</h1>
                    <p className='text-zinc-400 text-sm'>{id}</p>
                </div>
                <div className='flex gap-2'>
                    <div className='flex gap-1 flex-col'>
                        <span className={tailwindclasses.inputSpan}>Width</span>
                        <input type="number" placeholder='Width' value={props.width}
                            onChange={(e) => {
                                props.width = (e.currentTarget.value) * 1
                                setProps({ ...props })
                            }}
                            className={tailwindclasses.input}
                        />
                    </div>
                    <div className='flex gap-1 flex-col'>
                        <span className={tailwindclasses.inputSpan}>Source</span>
                        <input type="text" placeholder='Source' value={props.src}
                            onChange={(e) => {
                                props.src = (e.currentTarget.value)
                                setProps({ ...props })
                            }}
                            className={tailwindclasses.input}
                        />
                    </div>
                    <div className='flex gap-1 flex-col'>
                        <span className={tailwindclasses.inputSpan}>Alt</span>
                        <input type="text" placeholder='Alternate Text' value={props.alt}
                            onChange={(e) => {
                                props.alt = (e.currentTarget.value)
                                setProps({ ...props })
                            }}
                            className={tailwindclasses.input}
                        />
                    </div>
                </div>
                <div className='my-2 border-t-stone-500 border-t-2'>
                    <div className='mb-4 flex gap-2 items-center'>
                        <p className="text-zinc-500">
                            view
                        </p>
                        <Button variant="primary"
                            onClick={
                                () => {
                                    update({ id, props })
                                }
                            }
                        >Save</Button>
                    </div>

                    <Image
                        src={props.src || ""}
                        alt={props.alt}
                        width={props.width != "" ? props.width : 0}
                        height={300}
                        className='border-2 m-auto'
                    />
                </div>
            </div>
        </div>
    )
}

export default ImageBox