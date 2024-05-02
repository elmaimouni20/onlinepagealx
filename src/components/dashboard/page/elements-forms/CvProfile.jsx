"use client"
import * as React from "react"
import { Image } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { usePage } from "@/components/Contexts/PageContext"; 


export default function CvProfile({}) {
    const [pageContext, setPageContext] = usePage();
    const [formData , setFormData] = React.useState({});

    const handleInputChange = (e) => {
        let { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    const isAnyFieldEmpty = () => {
        return Object.values(formData).some((value) => value == "");
    }
    React.useEffect(() => {
        if(isAnyFieldEmpty() || Object.keys(formData).length <= 0){
            // find the element in the page who hase pagetype cv and type profile an remove it from page
            setPageContext((prev) => ({ ...prev, elements: prev.elements.filter((element) => element.pageType !== "cv" && element.type !== "profile") }));
        }else{
            let tempPageElements = pageContext.elements.filter((element) => element.pageType !== "cv" && element.type !== "profile");
            tempPageElements.push({
                pageType:"cv",
                type: "profile",
                data: formData
            });
            setPageContext((prev) => ({ ...prev, elements: tempPageElements }));
        }
        
    }, [formData]);
    
    return (
        <>
            <div className="flex flex-col items-start justify-start w-full gap-2 p-2 ">
                {/* <div className="flex items-center justify-center w-full">
                    <div className="relative flex flex-col items-center justify-center gap-2 p-10 rounded-full outline-dashed outline-1 outline-slate-400 bg-secondary">
                        <Image size={20} alt="Profile"/>
                        <input type="file"  className="absolute w-full h-full opacity-0"/>
                    </div>
                </div> */}
                <div className="grid w-full gap-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input type="text" name="first_name" id="first_name" onInput={handleInputChange} placeholder="Frist Name" />
                </div>
                <div className="grid w-full gap-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input type="text" name="last_name" id="last_name" onInput={handleInputChange} placeholder="Last Name" />
                </div>
                <div className="grid w-full gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Input type="text" name="role" id="role" onInput={handleInputChange} placeholder="Role" />
                </div>
                <div className="grid w-full gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="text" name="email" id="email" onInput={handleInputChange} placeholder="Email" />
                </div>
                <div className="grid w-full gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input type="text" name="phone" id="phone" onInput={handleInputChange} placeholder="Phone" />
                </div>
                <div className="grid w-full gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea className="resize-none" name="description" onInput={handleInputChange} id="description"  />
                </div>
                

            </div>
            
        </>
    )
}
