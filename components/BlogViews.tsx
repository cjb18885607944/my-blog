"use client";

import { useEffect, useState } from "react";

export default function BlogViews({ slug }: { slug: string }) {
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    async function fetchViews() {
      const response = await fetch(`/api/stats/${slug}`);
      const data = await response.json();
      setViews(data.views);
    }
    fetchViews();
  }, [slug]);

  return <span>访问量：{views}</span>;
}
