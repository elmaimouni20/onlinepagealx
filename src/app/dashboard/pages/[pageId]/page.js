import Image from "next/image";

import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";


import connectDB from "@/lib/connectDB";
import PageModel from "@/models/Page";
import User from "@/models/User";
import PageType from "@/models/PageType";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"

import PreviewPage from "@/components/dashboard/page/PreviewPage";
import ElementsFlex from "@/components/dashboard/page/ElementsFlex";

import PageProvider from "@/components/Contexts/PageContext";
export default async function Page({params}) {

    
    const { isAuthenticated , getUser } = getKindeServerSession();
    const isAuth = await isAuthenticated()
    if(!isAuth) {
        redirect(`/api/auth/login?post_login_redirect_url=/dashboard/pages/${params.pageId}`)
    }
    await connectDB();
    const kindUser = await getUser();
    const user = await User.findOne({ kindId: kindUser.id });
    const pageModel = await PageModel.findOne({ pageSlug: params.pageId , owner: user._id});
    const TypePage = await PageType.findOne({ _id: pageModel.pageType });
    const pageModelObject = {
        _id: pageModel._id.toString(),
        pageSlug: pageModel.pageSlug,
        owner: pageModel.owner.toString(),
        elements: pageModel.elements,
        name : pageModel.name,
        type : {
            code : TypePage.code,
            name : TypePage.name
        }
    };
    
    return (
        <>
            <PageProvider>
                <div className="w-full h-[calc(100vh-81px)]">
                    <ResizablePanelGroup
                        direction="horizontal"
                        className="w-full h-full rounded-lg "
                    >
                        <ResizablePanel defaultSize={50} minSize={30} >
                            <PreviewPage currentPage={pageModelObject}/>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={50} maxSize={50} minSize={30} className="shadow-md ">
                            <ElementsFlex currentPage={pageModelObject}/>
                        </ResizablePanel>
                    </ResizablePanelGroup>    
                </div>
            </PageProvider>
        </>
    );
}
