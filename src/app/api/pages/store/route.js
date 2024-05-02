import { NextResponse } from 'next/server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import connectDB from '@/lib/connectDB'
import User from '@/models/User'
import Page from '@/models/Page';

import slugify from 'slugify';

export async function POST(request) {
    const { page_name,description,type_page } = await request.json();
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

    try {
        const newPage = await Page.create({
            name: page_name,
            pageSlug: slugify(page_name),
            descrition: description,
            elementsList:[],
            pageType: type_page,
            owner:user._id
        })
        await newPage.save();
        return NextResponse.json({ page:newPage ,status: 200}, { status: 200 })
    } catch (error) {
        if(error.errorResponse.code ===  11000){
            return NextResponse.json({ code:"pageSlugDuplicate" ,status: 422}, { status: 422 })
        }
        return NextResponse.json({ code:"serverError",status: 500}, { status: 500 })
    }
    
}