import { NextResponse } from 'next/server'

import connectDB from '@/lib/connectDB'
import PageType from '@/models/PageType';


export async function GET(request) {
    
    await connectDB();

    const pageTypes = await PageType.find();

    return NextResponse.json({ pageTypes ,status: 200}, { status: 200 })
    
}