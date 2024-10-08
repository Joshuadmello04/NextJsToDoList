import connectMongoDB from "@/app/libs/mongodb";
import Topic from "@/app/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { title, description } = await request.json();
    await connectMongoDB();
    await Topic.create({ title, description })
    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}


export async function GET() {
   await connectMongoDB();
   const topics = await Topic.find();
   return NextResponse.json({topics})
}

export async function DELETE(request) {
    try {
      const id = request.nextUrl.searchParams.get("id");
  
      if (!id) {
        return NextResponse.json({ message: "ID not provided" }, { status: 400 });
      }
  
      await connectMongoDB();
      const topic = await Topic.findByIdAndDelete(id);
  
      if (!topic) {
        return NextResponse.json({ message: "Topic not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Topic Deleted" }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }
  