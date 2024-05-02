import { NextResponse } from 'next/server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import connectDB from '@/lib/connectDB'
import User from '@/models/User'
import Page from '@/models/Page';



export async function GET(request) {
    
    // const { name, age } = await request.json();
    const { isAuthenticated , getUser } = getKindeServerSession();
    const isAuth = await isAuthenticated()
    if(!isAuth) {
        return NextResponse.json({ message: "not authenticated",status: 401}, { status: 401 });
    }
    await connectDB();
    // check if user exists in the database
    const kindUser = await getUser();
    const user = await User.findOne({ kindId: kindUser.id });
    if(!user) {
        return NextResponse.json({ message: "not authenticated",status: 401}, { status: 401 });
    }
    

    const pages = await Page.find({owner: user._id});

    return NextResponse.json({ pages ,status: 200}, { status: 200 })
    
}