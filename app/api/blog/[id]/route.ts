import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongodb";
import Post from "../../../../models/post";

type Params = {
  id: string;
};

export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;
    const {
      newTitle: title,
      newCategories: categories,
      newImgUrl: imgUrl,
      newArticle: article,
      newAuthor: author,
    } = await request.json();

    await connectMongoDB();

    const existingPost = await Post.findById(id);

    if (!existingPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    await Post.findByIdAndUpdate(id, {
      title,
      categories,
      imgUrl,
      article,
      author,
    });

    return NextResponse.json({ message: "Post Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "Nenhum ID fornecido",
      });
    }

    await connectMongoDB();

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({
        success: false,
        error: "Post não encontrado",
      });
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "Nenhum ID fornecido",
      });
    }

    await connectMongoDB();

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({
        success: false,
        error: "Post não encontrada",
      });
    }

    await Post.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Post excluído",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Erro ao excluir post" },
      { status: 500 }
    );
  }
}
