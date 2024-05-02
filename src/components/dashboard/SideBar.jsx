"use client"

import * as React from "react"
import { Home , Plus , Circle ,LogOut ,X} from 'lucide-react';
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { useMediaQuery } from "@/hooks/use-media-query"
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
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"

import { RouteApiListPages } from "@/lib/routesList";

import CreateNewPage from "@/components/dashboard/page/CreateNewPage"
import {useSideBar} from "@/components/Contexts/SideBarContext";

export default function SideBar({}) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false);
  const [createNewPageOpen , setCreateNewPageOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [sidebar,setSidebar] = useSideBar();
  const [loading,setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch(RouteApiListPages).then(res=>res.json()).then(data=>{
      setSidebar((prev)=>({...prev,listPages:data.pages}))
      setLoading(false)
    }).catch(err=>{
      console.log(err)
    })
  },[])


  React.useEffect(() => {
    if(open == true && isDesktop){
      setOpen(false)
    }
  },[open])


  const handleCloseDrawer = ()=>{
    setSidebar((prev=>({...prev,isSideBarOpen:false})))
  }

  return (
    <>
      <div className="md:flex flex-col items-start justify-start h-full p-4 overflow-hidden shadow-md md:w-[260px] xl:w-[310px] hidden">
        <div className="h-[140px] flex justify-start items-start p-2 w-full">
            <h1 className='text-xl font-bold'>OnlinePage.</h1>
        </div>
        {
          loading == true && 
          <>
            <div className="flex-grow w-full">
              <ul className='flex flex-col justify-start w-full gap-2 font-medium  [&>li]:hover:cursor-pointer'>
                  
                  <Skeleton className="w-full h-[44px] rounded-xl" />
                  <Skeleton className="w-full h-[44px] rounded-xl" />
                  <Skeleton className="w-full h-[44px] rounded-xl" />
                  <Skeleton className="w-full h-[44px] rounded-xl" />
                  <Skeleton className="w-full h-[44px] rounded-xl" />
              </ul>
            </div>
            <div className="h-[50px] w-full flex justify-start items-center">
              <Skeleton className="w-full h-[44px] rounded-xl" />
            </div>
          </>
        }
        {
          loading == false && 
          <>
          
              <ScrollArea className="flex-grow w-full overflow-auto py-2">
                <ul className='flex flex-col justify-start w-full gap-2 font-medium  [&>li]:hover:cursor-pointer'>
                    <Link href={`/dashboard`}>
                      <li className={`flex items-center justify-start gap-2 px-3 py-2 rounded-xl ${pathname == "/dashboard" ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground' }`}>
                          <span className='icon'>
                            <Home size={20}/>
                          </span>
                          <span>Dashboard</span>
                      </li>
                    </Link>
                    {
                      sidebar.listPages.length > 0 && sidebar.listPages.map((page,index)=>(
                        <Link key={index} href={`/dashboard/pages/${page.pageSlug}`}>
                          <li  className={`flex items-center justify-start gap-2 px-3 py-2 rounded-xl ${pathname == "/dashboard/pages/"+page.pageSlug ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground' }`}>
                            <span className='icon'>
                              <Circle size={20}/>
                            </span>
                            <span>
                              {page.name}
                            </span>
                          </li>
                        </Link>
                      ))
                    }
                    <li onClick={()=>{setCreateNewPageOpen(true)}} className='flex items-center justify-start gap-2 px-3 py-2 bg-secondary rounded-xl text-primary '>
                        <span className='icon'>
                          <Plus size={20}/>
                        </span>
                        <span>Create New Page</span>
                    </li>
                </ul>
              </ScrollArea>
              <div className="h-[50px] w-full flex justify-start items-center">
                  <LogoutLink className='flex items-center justify-start flex-grow gap-2 px-3 py-2 font-medium transition-all cursor-default hover:text-destructive hover:bg-white ring-2 ring-transparent hover:ring-destructive rounded-xl bg-secondary'>
                    <span className='icon'>
                      <LogOut size={20}/>
                    </span>
                    <span>Log Out</span>
                  </LogoutLink>
              </div>
          </>
        }
      </div>
      <div className='flex'>
        <Drawer open={sidebar.isSideBarOpen} onClose={handleCloseDrawer} >
          <DrawerContent className="h-[80%]">
            <div className='flex flex-col w-full h-full '>
              <div className="relative flex items-center justify-center w-full p-4">
                  <h1 className='text-xl font-bold'>OnlinePage.</h1>
                  <button onClick={handleCloseDrawer} className='absolute top-[50%] right-10 translate-y-[-50%]'>
                    <X size={20}/>
                  </button>
              </div>
              {
                loading == true && 
                <>
                    <div className="flex-grow w-full">
                      <ul className='flex flex-col justify-start w-full gap-2 font-medium  [&>li]:hover:cursor-pointer p-4'>
                          
                          <Skeleton className="w-full h-[44px] rounded-xl" />
                          <Skeleton className="w-full h-[44px] rounded-xl" />
                          <Skeleton className="w-full h-[44px] rounded-xl" />
                          <Skeleton className="w-full h-[44px] rounded-xl" />
                          <Skeleton className="w-full h-[44px] rounded-xl" />
                          
                      </ul>
                    </div>
                    <div className="h-[50px] w-full flex justify-start items-center p-4 mb-4">
                          <Skeleton className="w-full h-[44px] rounded-xl" />
                    </div>
                </>
              }
              {
                loading == false &&
                <>
                    <div className="flex-grow w-full">
                      <ul className='flex flex-col justify-start w-full gap-2 font-medium  [&>li]:hover:cursor-pointer p-4'>
                          <Link href={`/dashboard`}>
                            <li className={`flex items-center justify-start gap-2 px-3 py-2 rounded-xl ${pathname == "/dashboard" ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground' }`}>
                                <span className='icon'>
                                  <Home size={20}/>
                                </span>
                                <span>Dashboard</span>
                            </li>
                          </Link>
                          {
                            sidebar.listPages.length > 0 && sidebar.listPages.map((page,index)=>(
                              <Link key={index} href={`/dashboard/pages/${page.pageSlug}`}>
                                <li  className={`flex items-center justify-start gap-2 px-3 py-2 rounded-xl ${pathname == "/dashboard/pages/"+page.pageSlug ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground' }`}>
                                  <span className='icon'>
                                    <Circle size={20}/>
                                  </span>
                                  <span>
                                    {page.name}
                                  </span>
                                </li>
                              </Link>
                            ))
                          }
                          <li onClick={()=>{setCreateNewPageOpen(true)}} className='flex items-center justify-start gap-2 px-3 py-2 bg-secondary rounded-xl text-primary '>
                              <span className='icon'>
                                <Plus size={20}/>
                              </span>
                              <span>Create New Page</span>
                          </li>
                      </ul>
                    </div>
                    <div className="h-[50px] w-full flex justify-start items-center p-4 mb-4">
                        <LogoutLink className='flex items-center justify-start flex-grow gap-2 px-3 py-2 font-medium transition-all cursor-default hover:text-destructive hover:bg-white ring-2 ring-transparent hover:ring-destructive rounded-xl bg-secondary'>
                          <span className='icon'>
                            <LogOut size={20}/>
                          </span>
                          <span>Log Out</span>
                        </LogoutLink>
                    </div>
                </>
              }
              
            </div>
          </DrawerContent >
        </Drawer>
      </div>
      <CreateNewPage openDialog={createNewPageOpen} setOpenDialog={setCreateNewPageOpen} />
    </>
  );
}
