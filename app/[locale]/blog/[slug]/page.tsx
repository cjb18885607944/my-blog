import { Metadata } from "next";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Markdown from "@/components/Markdown";
import BlogActions from "@/components/BlogActions";

interface Props {
  params: { slug: string; locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug, params.locale);
  return {
    title: `${post?.title || "文章"} | My Blog`,
    description: post?.excerpt,
  };
}

export async function generateStaticParams() {
  const locales = ["zh", "en"];
  const allParams = [];

  for (const locale of locales) {
    const posts = await getBlogPosts(locale);
    const params = posts.map((post) => ({
      slug: post.slug,
      locale,
    }));
    allParams.push(...params);
  }

  return allParams;
}

export default async function BlogPost({ params }: Props) {
  const post = await getBlogPost(params.slug, params.locale);
  const posts = await getBlogPosts(params.locale);

  if (!post) return null;

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <Navbar />
      <div className="pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* 侧边栏 */}
            <Sidebar posts={posts} currentSlug={params.slug} />

            {/* 主内容 */}
            <main className="lg:col-span-9">
              <article className="prose dark:prose-invert prose-primary max-w-none">
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-4xl font-bold text-primary-dark dark:text-primary">
                    {post.title}
                  </h1>
                  <BlogActions slug={post.slug} />
                </div>
                <div className="flex items-center text-primary-dark/60 dark:text-primary/60 mb-8">
                  <time>{new Date(post.date).toLocaleDateString()}</time>
                </div>
                <Markdown content={post.content} />
              </article>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
