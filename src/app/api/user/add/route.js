import { NextResponse } from 'next/server'
import connectDB from '@/lib/connectDB'
import User from '@/models/User'



export async function POST(request) {
    const { name, age } = await request.json();
    await connectDB();
    const newUser = new User({ name, age });
    await newUser.save();
    
    return NextResponse.json({ message: "success"}, { status: 200 })
    
}