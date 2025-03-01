import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/middleware/auth";
import { BlogPost } from "@/types/blog";

async function handler(req: NextRequest) {
  if (req.method === "POST") {
    const data = await req.json();
    const { title, content, locale } = data;
    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const post: BlogPost = {
      slug,
      title,
      content,
      date: new Date().toISOString(),
      excerpt: content.slice(0, 200),
      locale,
    };

    // 保存到 Cloudflare KV
    await BLOG_POSTS.put(`post:${locale}:${slug}`, JSON.stringify(post));

    return NextResponse.json({ success: true });
  }

  if (req.method === "PUT") {
    const data = await req.json();
    const { slug, title, content, locale } = data;

    const existingPost = await BLOG_POSTS.get(`post:${locale}:${slug}`);
    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const post = JSON.parse(existingPost);
    const updatedPost = {
      ...post,
      title,
      content,
      date: new Date().toISOString(),
      excerpt: content.slice(0, 200),
    };

    await BLOG_POSTS.put(`post:${locale}:${slug}`, JSON.stringify(updatedPost));

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export const POST = withAuth(handler);
export const PUT = withAuth(handler);
