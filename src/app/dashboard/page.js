import Image from "next/image";

import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";


import connectDB from "@/lib/connectDB";
import User from "@/models/User";




export default async function Page() {
    await connectDB();
    const { isAuthenticated , getUser } = getKindeServerSession();
    const isAuth = await isAuthenticated()
    if(!isAuth) {
        redirect('/api/auth/login?post_login_redirect_url=/dashboard')
    }
    // check if user exists in the database
    const kindUser = await getUser();
    const user = await User.findOne({ kindId: kindUser.id });
    if(!user) {
        redirect('/auth-callback?origin=/dashboard')
    }
    
    return (
        <>
            <div>content</div>
        </>
    );
}
