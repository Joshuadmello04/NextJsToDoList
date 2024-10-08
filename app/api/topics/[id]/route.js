//get and put request..so to retrieve/update
//for id specific routing
import connectMongoDB from '@/app/libs/mongodb';
import Topic from '@/app/models/topic';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
    try {
        const { id } = params; // Capture the id from the URL params
        const { newTitle: title, newDescription: description } = await request.json(); // Await the request body
        await connectMongoDB();

        // Check if the topic exists before updating
        const topic = await Topic.findByIdAndUpdate(id, { title, description }, { new: true });
        if (!topic) {
            return NextResponse.json({ message: "Topic not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Topic updated", topic }, { status: 200 });
    } catch (error) {
        console.error('Error during PUT request:', error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


export async function GET(request,{params}){
    const {id} = params;
    await connectMongoDB();
    const topic = await Topic.findOne({_id:id});
    return NextResponse.json({topic}, {status: 200});
}