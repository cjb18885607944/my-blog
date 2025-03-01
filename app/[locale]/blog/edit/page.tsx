"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function EditBlog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  async function fetchPost() {
    try {
      const response = await fetch(`/api/blog/${slug}`);
      const data = await response.json();
      setTitle(data.title);
      setContent(data.content);
    } catch (err) {
      setError("加载文章失败");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/blog", {
        method: slug ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "x-password": password,
        },
        body: JSON.stringify({
          slug,
          title,
          content,
          locale: "zh", // 默认中文，可以添加语言选择
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      router.push("/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存失败");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <Navbar />
      <div className="pt-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary-dark dark:text-primary mb-8">
          {slug ? "编辑文章" : "新建文章"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-primary-dark dark:text-primary mb-2">
              标题
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded-lg bg-white dark:bg-dark border border-primary-dark/20 dark:border-primary/20 text-primary-dark dark:text-primary"
              required
            />
          </div>

          <div>
            <label className="block text-primary-dark dark:text-primary mb-2">
              内容
            </label>
            <div data-color-mode="light" className="dark:hidden">
              <MDEditor
                value={content}
                onChange={(val) => setContent(val || "")}
                height={400}
              />
            </div>
            <div data-color-mode="dark" className="hidden dark:block">
              <MDEditor
                value={content}
                onChange={(val) => setContent(val || "")}
                height={400}
              />
            </div>
          </div>

          <div>
            <label className="block text-primary-dark dark:text-primary mb-2">
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg bg-white dark:bg-dark border border-primary-dark/20 dark:border-primary/20 text-primary-dark dark:text-primary"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 dark:text-red-400">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary-dark dark:bg-primary text-white dark:text-dark rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "保存中..." : "保存"}
          </button>
        </form>
      </div>
    </div>
  );
}
