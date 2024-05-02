"use client"
import * as React from "react"
// import Image from "next/image"
// import { Image } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function Profilev001({data}) {
    
    return (
        <>
            <div className="flex flex-col items-center justify-start w-full py-4">
                <div className="flex flex-col items-center justify-start p-4 rounded-lg shadow-md bg-muted">
                    {/* <div className="flex items-center justify-center w-full">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div> */}
                    <div className="flex items-center justify-center w-full ">
                        <h1 className="flex items-center justify-center gap-2 text-xl font-bold uppercase">
                            <span className="text-primary">{data?.first_name??"john"}</span>
                            <span>{data?.last_name??"doe"}</span>
                        </h1>
                    </div>
                    <div className="flex items-center justify-center w-full ">
                        <h2 className="text-lg font-medium text-slate-500">
                            {data?.role??"Tester"}
                        </h2>
                    </div>
                    <div className="flex items-center justify-center w-full gap-2 mt-2">
                        <span className="px-2 rounded-full ring-1 ring-primary">{data?.email??"johndoe@web.com"}</span>
                        <span className="px-2 rounded-full ring-1 ring-primary">{data?.phone??"0675748383"}</span>
                    </div>
                    <div className="flex items-center justify-center w-full gap-2 mt-4">
                        <p className="max-w-[444px] text-pretty text-start ">
                            {data?.description??"some description here"}
                        </p>
                    </div>
                    
                </div>
            </div>
        </>
    )
}
