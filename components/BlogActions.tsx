"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BlogActions({ slug }: { slug: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/blog/${slug}`, {
        method: "DELETE",
        headers: {
          "x-password": password,
        },
      });

      if (!response.ok) {
        throw new Error("删除失败");
      }

      router.push("/blog");
    } catch (error) {
      alert(error instanceof Error ? error.message : "删除失败");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <div className="flex gap-4">
        <Link
          href={`/blog/edit?slug=${slug}`}
          className="px-4 py-2 bg-primary-dark dark:bg-primary text-white dark:text-dark rounded-lg hover:opacity-90 transition-opacity"
        >
          编辑
        </Link>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          删除
        </button>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark p-6 rounded-lg max-w-md w-full mx-4">
            {/* 弹窗内容保持不变 */}
          </div>
        </div>
      )}
    </>
  );
}
