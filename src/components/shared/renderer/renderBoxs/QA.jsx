import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import React from 'react'
import Latex from "react-latex-next"

function QA({data}) {
  return (
    <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-2 border-slate-400/50 rounded-md px-3 bg-gray-100/5 my-8 ">
            <AccordionTrigger>
                <div className="w-full">
                    <p className=" text-left text-headingColor font-semibold text-lg mb-2">Question:</p>
                    <p className="text-left text-base "><Latex>{data.q}</Latex></p>
                    {
                        data.qImg !=""
                        &&
                        <img src={data.qImg}
                            style={
                                {
                                    maxWidth:"50%"
                                }
                            }
                            className="mt-3 mx-auto"
                        />
                    }
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="w-full my-4 pt-4 border-t-2 border-slate-500/20">
                    <p className="text-headingColor font-semibold text-lg mb-2">Answer:</p>
                    <p className="text-left text-base "><Latex>{data.a}</Latex></p>
                    {
                        data.aImg !=""
                        &&
                        <img src={data.aImg} className="mt-3 mx-auto"
                            style={
                                {
                                    maxWidth:"50%"
                                }
                            } 
                        />
                    }
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  )
}

export default QA