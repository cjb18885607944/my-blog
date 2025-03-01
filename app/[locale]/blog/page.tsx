import { Metadata } from "next";
import { getBlogPosts } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import BlogList from "@/components/BlogList";
import Link from "next/link";

export const metadata: Metadata = {
  title: "博客文章列表 | My Blog",
  description: "前端开发博客文章列表，包含面试题解析和技术分享",
};

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const posts = await getBlogPosts(locale);

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <Navbar />
      <div className="pt-16 lg:pt-20">
        <div className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <Sidebar posts={posts} currentSlug="" />

            <main className="lg:col-span-9">
              <div className="prose dark:prose-invert prose-primary mb-12">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-4xl font-bold text-primary-dark dark:text-primary">
                    技术博客
                  </h1>
                  <Link
                    href="/blog/edit"
                    className="px-4 py-2 bg-primary-dark dark:bg-primary text-white dark:text-dark rounded-lg hover:opacity-90 transition-opacity"
                  >
                    新建文章
                  </Link>
                </div>
                <p className="text-xl text-primary-dark/80 dark:text-primary/80">
                  分享前端开发经验、面试题解析和技术心得
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                  {categories.map((category) => (
                    <div key={category.title} className="group relative">
                      <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-primary-dark/50 to-primary/50 opacity-0 group-hover:opacity-100 blur transition duration-300" />
                      <div className="relative p-6 rounded-lg bg-light dark:bg-dark border border-primary-dark/20 dark:border-primary/20 hover:border-transparent transition duration-300">
                        <h3 className="text-xl font-semibold text-primary-dark dark:text-primary mb-2">
                          {category.title}
                        </h3>
                        <p className="text-primary-dark/80 dark:text-primary/80">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <BlogList posts={posts} />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

const categories = [
  {
    title: "面试题解析",
    description: "常见前端面试题详解和答题技巧",
  },
  {
    title: "技术分享",
    description: "前端框架使用心得和最佳实践",
  },
];
