import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/middleware/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const locale = "zh";

    const post = await BLOG_POSTS.get(`post:${locale}:${slug}`);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // 增加访问量
    const views = parseInt((await BLOG_STATS.get(`views:${slug}`)) || "0") + 1;
    await BLOG_STATS.put(`views:${slug}`, views.toString());

    return NextResponse.json(JSON.parse(post));
  } catch (error) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
}

async function deleteHandler(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const locale = "zh";

    await BLOG_POSTS.delete(`post:${locale}:${slug}`);
    await BLOG_STATS.delete(`views:${slug}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}

export const DELETE = withAuth(deleteHandler);
