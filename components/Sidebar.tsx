import Link from "next/link";
import { BlogPost } from "@/types/blog";

export default function Sidebar({
  posts,
  currentSlug,
}: {
  posts: BlogPost[];
  currentSlug: string;
}) {
  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-20">
        <h2 className="text-xl font-bold text-primary-dark dark:text-primary mb-4">
          所有文章
        </h2>
        <nav className="space-y-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`
                block p-2 rounded-lg transition-colors
                ${
                  post.slug === currentSlug
                    ? "bg-primary-dark/10 dark:bg-primary/10"
                    : "hover:bg-primary-dark/5 dark:hover:bg-primary/5"
                }
              `}
            >
              <span className="text-primary-dark dark:text-primary">
                {post.title}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
