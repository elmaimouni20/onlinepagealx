"use client"
import * as React from "react"
import { Contact , BriefcaseBusiness , Notebook , Cone , SwatchBook } from 'lucide-react';
import { ScrollArea , ScrollBar} from "@/components/ui/scroll-area"

import { Button } from "@/components/ui/button";
import CvProfile from "./elements-forms/CvProfile";
export default function ElementsFlex({currentPage}) {

    
    
    return (
        <>
            <div className="flex items-center justify-center h-full rounded-xl">
                <div className="flex flex-col items-start justify-between w-full h-full">
                    <div className="flex flex-col items-start justify-start ">
                        <nav className="flex items-center justify-between w-full p-3 border-b border-slate-100">
                            <h2 className="text-lg font-semibold">Elements</h2>
                            <span className="px-2 text-sm font-semibold rounded-full bg-secondary text-secondary-foreground">
                                {
                                    currentPage?.type?.name
                                }
                            </span>
                        </nav>
                        <ScrollArea className="w-full overflow-auto">
                            <div className="flex items-center justify-start p-3 space-x-8 border-b w-max border-slate-100">
                                <div className="flex items-center justify-start gap-2 ">
                                    <div className="rounded h-[30px] w-[30px] bg-primary text-primary-foreground aspect-square flex justify-center items-center ">
                                        <Contact size={20} />
                                    </div>
                                    <span className="text-sm font-semibold text-primary">Pofile</span>
                                </div>
                                <div className="flex items-center justify-start gap-2">
                                    <div className="rounded h-[30px] w-[30px] aspect-square flex justify-center items-center bg-slate-100">
                                    <BriefcaseBusiness size={20} />
                                    </div>
                                    <span className="text-sm font-semibold">Experience</span>
                                </div>
                                <div className="flex items-center justify-start gap-2">
                                    <div className="rounded h-[30px] w-[30px] aspect-square flex justify-center items-center bg-slate-100">
                                        <Notebook size={20} />
                                    </div>
                                    <span className="text-sm font-semibold">Education</span>
                                </div>
                                <div className="flex items-center justify-start gap-2">
                                    <div className="rounded h-[30px] w-[30px] aspect-square flex justify-center items-center bg-slate-100">
                                        <Cone size={20} />
                                    </div>
                                    <span className="text-sm font-semibold">Skills</span>
                                </div>
                                <div className="flex items-center justify-start gap-2">
                                    <div className="rounded h-[30px] w-[30px] aspect-square flex justify-center items-center bg-slate-100">
                                        <SwatchBook size={20} />
                                    </div>
                                    <span className="text-sm font-semibold">Portfolio</span>
                                </div>
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                        <div className="w-full overflow-hidden max-h-[100%-107px]">
                            <ScrollArea className="w-full h-full overflow-hidden">
                                <CvProfile />
                            </ScrollArea>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full p-4 border-t border-slate-100">
                        <Button  variant="outline" disabled>Previous</Button>
                        <Button >Next</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
