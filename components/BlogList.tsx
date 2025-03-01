"use client";

import Link from "next/link";
import { BlogPost } from "@/types/blog";

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article
          key={post.slug}
          className="p-6 rounded-lg border border-primary-dark/20 dark:border-primary/20 hover:border-primary-dark dark:hover:border-primary transition-colors"
        >
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl font-bold text-primary-dark dark:text-primary mb-2">
              {post.title}
            </h2>
          </Link>
          <time className="text-sm text-primary-dark/60 dark:text-primary/60">
            {new Date(post.date).toLocaleDateString()}
          </time>
          <p className="mt-4 text-primary-dark/80 dark:text-primary/80">
            {post.excerpt}
          </p>
        </article>
      ))}
    </div>
  );
}
