import connectMongoDB from "../../../lib/mongodb";
import Post from "../../../models/post";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  try {
    const { title, categories, imgUrl, article, author } = await request.json();

    await connectMongoDB();
    const newPost = new Post({
      title,
      categories,
      imgUrl,
      article,
      author,
    });

    await newPost.save();
    return NextResponse.json({ message: "Post Created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const post = await Post.find();
    console.log("Get");
    return NextResponse.json({ post });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}
