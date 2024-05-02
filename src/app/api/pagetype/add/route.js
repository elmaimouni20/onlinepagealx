import { NextResponse } from 'next/server'

import connectDB from '@/lib/connectDB'
import PageType from '@/models/PageType';



export async function GET(request) {
    
    await connectDB();

    // const type = new PageType({
    //     name:"Curriculum Vitae",
    //     code:"cv"
    // })
    // await type.save();
    return NextResponse.json({  }, { status: 200 })
    
}