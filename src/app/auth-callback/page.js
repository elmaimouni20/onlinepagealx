
import Image from "next/image";

import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import connectDB from "@/lib/connectDB";
import User from "@/models/User";


export default async function Page({params,searchParams}) {
    await connectDB();
    const { isAuthenticated , getUser } = getKindeServerSession();
    const isAuth = await isAuthenticated()
    const kindUser = await getUser();
    const origin = searchParams?.origin || '/dashboard';
    if(!isAuth) {
        redirect(`/api/auth/login?post_login_redirect_url=${origin}`)
    }

    const user = await User.findOne({ kindId: kindUser.id });
    if(!user) {
        await User.create({ 
            kindId: kindUser.id,
            fullName : kindUser.given_name + " " + kindUser.family_name,
            email: kindUser.email,
            firstName: kindUser.given_name, 
            lastName: kindUser.family_name,
            picture: kindUser.picture
        });
    }

    redirect(origin || '/dashboard')

    
}
