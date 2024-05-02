"use client"
import * as React from "react"
import { useRouter } from 'next/navigation'

import CFetch from "@/lib/fetch"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LoaderCircle } from 'lucide-react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Skeleton } from "@/components/ui/skeleton"

import { RouteApiListPageTypes , RouteApiPagesStore } from "@/lib/routesList"

import {useSideBar} from "@/components/Contexts/SideBarContext";


export default function DrawerDialog({openDialog, setOpenDialog}) {
    
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="sm:max-w-[425px]">
                <PageForm setOpenDialog={setOpenDialog}/>
            </DialogContent>
        </Dialog>
        )
    }

    return (
        <Drawer open={openDialog} onOpenChange={setOpenDialog}>
        <DrawerContent>
            <PageForm className="px-4"  setOpenDialog={setOpenDialog}/>
            <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
        </Drawer>
    )
}

function PageForm({ className,setOpenDialog }) {
    const router   = useRouter()
    const [sidebar,setSidebar] = useSideBar();
    const [listPageTypes , setListPageTypes ] = React.useState([]);
    const [loading , setLoading ] = React.useState(true);
    const [submitLoading , setSubmitLoading ] = React.useState(false);
    const [formData, setFormData] = React.useState({})
    const handleInputChange = (e) => {
        let { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitLoading(true);
        CFetch({
            url : RouteApiPagesStore,
            method:"POST",
            body : {...formData},
            afterSuccess : (res) =>{
                setSubmitLoading(false);
                setSidebar((prev)=>({...prev,listPages: [...prev.listPages,res.page]}));
                setFormData({})
                setOpenDialog(false);
                router.push(`/dashboard/pages/${res.page.pageSlug}`);
            },
            afterError:(err)=>{
                console.log(err);
                if(err.code == "pageSlugDuplicate"){

                }
            }
        })
        
        
    }

    React.useEffect(()=>{
        setLoading(true);
        CFetch({
            url : RouteApiListPageTypes,
            afterSuccess : ({pageTypes}) =>{
                setListPageTypes(pageTypes);
                setLoading(false);
            },
            afterError:(err)=>{
                console.log(err);
            }
        })
    },[])
    return (
        <form onSubmit={handleSubmit} className={cn("grid items-start gap-4", className)}>
            {
                loading == true && 
                <>
                    <div className="grid gap-2">
                        <Skeleton className="w-[67px] h-[14px] rounded-xl"/>
                        <Skeleton className="w-full h-[40px] rounded-xl"/>
                    </div>
                    <div className="grid gap-2">
                        <Skeleton className="w-[67px] h-[14px] rounded-xl"/>
                        <Skeleton className="w-full h-[90px] rounded-xl"/>
                    </div>
                    <div className="grid gap-2">
                        <Skeleton className="w-full h-[40px] rounded-xl"/>
                    </div>
                    <Skeleton className="w-full h-[40px] rounded-xl"/>
                </>
            }
            {
                loading == false && 
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="page_name">Name</Label>
                        <Input type="text" value={formData?.page_name??""} onInput={handleInputChange} name="page_name" id="page_name"  placeholder="My Frist Page" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea name="description" value={formData?.description??""} onInput={handleInputChange} id="description" />
                    </div>
                    <div className="grid gap-2">
                        <Select value={formData?.type_page??""} onValueChange={(val)=>{handleInputChange({target:{value:val,name:"type_page"}})}}>
                            <SelectTrigger>
                                <SelectValue placeholder="Page Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    listPageTypes.length > 0 && listPageTypes.map((item,index)=>(
                                        <SelectItem key={index} value={item._id}>{item.name}</SelectItem>
                                    ))
                                }
                                
                            </SelectContent>
                        </Select>
                    </div>
                    {
                        submitLoading == true &&
                        <Button type="button" disabled> 
                            <LoaderCircle className="animate-spin"/> 
                        </Button>
                    }
                    {
                        submitLoading == false &&
                        <Button type="submit"> Save page </Button>
                    }
                </>
            }
            
        </form>
    )
}
