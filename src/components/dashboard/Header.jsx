
'use client'

import { Home , Plus , Circle ,LogOut,Search ,Menu   } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import TextTruncate from 'react-text-truncate';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import {useSideBar} from "@/components/Contexts/SideBarContext";

export default function Header({className}) {
    const [sidebar,setSidebar] = useSideBar();
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const openSideBar = () =>{
        if(!isDesktop){
            setSidebar((prev)=>{
                return {...prev,isSideBarOpen:true}
            })
        }
    }
  return (
    <div className={cn("flex flex-col items-start justify-start w-full p-4 border-b  border-gray-100 ",className)}>
        <div className='flex items-center justify-between w-full'>
            <div className='flex items-center justify-start gap-2'>
                <Button onClick={openSideBar} variant="outline" size="icon"  className="rounded-full md:hidden"> 
                    <Menu size={20}/>
                </Button>
                <div className='flex items-center justify-start gap-2 text-slate-400'>
                    <Search size={20}/>
                    <span className='text-sm leading-relaxed'>Tap to search</span>
                </div>
            </div>
            <div className='flex items-center justify-start gap-2'>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex-col items-start hidden md:flex'>
                    <TooltipProvider>
                        <Tooltip >
                            <TooltipTrigger>
                                <h4 className='text-lg font-semibold max-w-[187px]' >
                                    Salma Elmamouni
                                </h4>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>Salma Elmamouni</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <span className='text-sm text-slate-400'>FullStack Dev</span>
                </div>
            </div>
        </div>
    </div>
  );
}
