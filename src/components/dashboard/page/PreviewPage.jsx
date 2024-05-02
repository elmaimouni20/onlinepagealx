"use client"
import * as React from "react"

import { usePage } from "@/components/Contexts/PageContext"; 
import Profilev001 from "@/components/dashboard/page/elements/cv-profiles/Profilev001";
export default function PreviewPage({currentPage}) {
    const [pageContext, setPageContext] = usePage();
    
    return (
        <>
            {
                pageContext.elements.length <= 0 && 
                <div className="h-full ">
                    <div className="flex items-center justify-center w-full h-full ">
                        <div className="h-[50%] w-[60%] shadow-md flex flex-col justify-start items-start bg-muted rounded-xl p-2 opacity-50">
                            <div className="flex items-center justify-between w-full px-1 py-1">
                                <div className="rounded-xl h-[15px] w-[30px] aspect-square bg-slate-200">
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="rounded-xl h-[15px] w-[15px] aspect-square bg-slate-200">
                                    </div>
                                    <div className="rounded-xl h-[15px] w-[15px] aspect-square bg-slate-200">
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center flex-grow w-full mt-3 bg-slate-200/50 rounded-xl">
                                <span className="font-bold">
                                    Your page is empty
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                pageContext.elements.length > 0 && pageContext.elements.map((element,index) => (
                    {
                        "cv/profile" : <Profilev001 key={index} data={element.data} />,
                    }[`${element.pageType}/${element.type}`]
                ))
            }
        </>
    )
}
