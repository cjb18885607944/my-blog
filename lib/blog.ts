import { BlogPost } from "@/types/blog";

// 模拟文章数据
const posts: Record<string, BlogPost[]> = {
  zh: [
    {
      slug: "frontend-tools",
      title: "前端开发常用框架和工具",
      date: "2024-02-28",
      content: `
# 前端开发常用框架和工具

## React
React 是一个用于构建用户界面的 JavaScript 库。由 Facebook 开发和维护。
- 官网：[https://react.dev](https://react.dev)
- 特点：组件化、虚拟 DOM、单向数据流

## Vue
Vue 是一个渐进式的 JavaScript 框架，易学易用。
- 官网：[https://vuejs.org](https://vuejs.org)
- 特点：双向绑定、组件化、轻量级

## Next.js
基于 React 的全栈框架，支持 SSR 和静态生成。
- 官网：[https://nextjs.org](https://nextjs.org)
- 特点：零配置、自动路由、API 路由

## TypeScript
JavaScript 的超集，添加了类型系统。
- 官网：[https://www.typescriptlang.org](https://www.typescriptlang.org)
- 特点：类型安全、更好的开发体验

## Tailwind CSS
实用优先的 CSS 框架。
- 官网：[https://tailwindcss.com](https://tailwindcss.com)
- 特点：高度可定制、无需写 CSS
      `,
      excerpt:
        "介绍当前流行的前端开发框架和工具，包括 React、Vue、Next.js、TypeScript 和 Tailwind CSS 等。",
      locale: "zh",
    },
  ],
  en: [
    {
      slug: "frontend-tools",
      title: "Popular Frontend Frameworks and Tools",
      date: "2024-02-28",
      content: `
# Popular Frontend Frameworks and Tools

## React
React is a JavaScript library for building user interfaces. Developed by Facebook.
- Website: [https://react.dev](https://react.dev)
- Features: Component-based, Virtual DOM, Unidirectional data flow

## Vue
Vue is a progressive JavaScript framework, easy to learn and use.
- Website: [https://vuejs.org](https://vuejs.org)
- Features: Two-way binding, Component-based, Lightweight

## Next.js
Full-stack framework based on React, supporting SSR and static generation.
- Website: [https://nextjs.org](https://nextjs.org)
- Features: Zero config, Auto routing, API routes

## TypeScript
A typed superset of JavaScript.
- Website: [https://www.typescriptlang.org](https://www.typescriptlang.org)
- Features: Type safety, Better development experience

## Tailwind CSS
A utility-first CSS framework.
- Website: [https://tailwindcss.com](https://tailwindcss.com)
- Features: Highly customizable, No CSS required
      `,
      excerpt:
        "Introduction to popular frontend development frameworks and tools, including React, Vue, Next.js, TypeScript, and Tailwind CSS.",
      locale: "en",
    },
  ],
};

export async function getBlogPosts(locale: string): Promise<BlogPost[]> {
  // 这里需要在 Cloudflare Workers 中实现列表功能
  // 可以使用 KV.list() 或维护一个文章索引
  const posts = await BLOG_POSTS.get(`posts:${locale}`);
  return posts ? JSON.parse(posts) : [];
}

export async function getBlogPost(
  slug: string,
  locale: string
): Promise<BlogPost | null> {
  const post = await BLOG_POSTS.get(`post:${locale}:${slug}`);
  return post ? JSON.parse(post) : null;
}
