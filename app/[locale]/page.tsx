"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { runConfetti } from "@/lib/confetti";

const FRONTEND_TOOLS = [
  {
    name: "VS Code",
    url: "https://code.visualstudio.com/",
    icon: "🎯",
  },
  {
    name: "CodeSandbox",
    url: "https://codesandbox.io/",
    icon: "📦",
  },
  {
    name: "Can I Use",
    url: "https://caniuse.com/",
    icon: "🔍",
  },
  {
    name: "MDN",
    url: "https://developer.mozilla.org/",
    icon: "📚",
  },
  {
    name: "DevTools",
    url: "https://developer.chrome.com/docs/devtools/",
    icon: "🛠️",
  },
];

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const t = useTranslations("home");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    const colors = ["#b8fe3a33", "#1a4d1c33"];

    function drawWave(
      color: string,
      amplitude: number,
      frequency: number,
      offset: number
    ) {
      if (!ctx || !canvas) return;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let x = 0; x < canvas.width; x++) {
        const y =
          Math.sin(x * frequency + time + offset) * amplitude +
          canvas.height / 2;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      colors.forEach((color, i) => {
        drawWave(color, 50 + i * 20, 0.01, (i * Math.PI) / 4);
        drawWave(color, 30 + i * 15, 0.02, (i * Math.PI) / 3);
      });

      time += 0.02;
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="relative min-h-screen bg-light dark:bg-dark">
      <Navbar />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30"
      />
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="text-center">
            <div className="inline-block">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent mb-6 animate-fade-in">
                {t("title")}
              </h1>
              <div className="mt-2 flex justify-center">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-primary-dark/60 dark:text-primary/60 ring-1 ring-primary-dark/10 dark:ring-primary/10 hover:ring-primary-dark/20 dark:hover:ring-primary/20">
                  新增文章{" "}
                  <a
                    href="/blog"
                    className="font-semibold text-primary-dark dark:text-primary"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    查看更多 <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
            <p className="mt-6 text-lg leading-8 text-primary-dark/80 dark:text-primary/80 max-w-[640px] mx-auto">
              {t("subtitle")}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/blog"
                onClick={() => runConfetti()}
                className="group relative inline-flex items-center gap-2 rounded-lg bg-primary-dark dark:bg-primary px-6 py-3 text-lg font-semibold text-white dark:text-dark shadow-sm transition-all duration-300 hover:scale-105"
              >
                开始阅读
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 rounded-lg px-6 py-3 text-lg font-semibold text-primary-dark dark:text-primary transition-all duration-300 hover:scale-105"
              >
                GitHub
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-[1152px] px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary-dark dark:text-primary">
                技术栈
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-primary-dark dark:text-primary sm:text-4xl">
                全栈开发经验
              </p>
              <p className="mt-6 text-lg leading-8 text-primary-dark/80 dark:text-primary/80">
                从前端到后端，从Web2到Web3，全面的开发技术栈
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="group relative flex flex-col"
                  >
                    <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-primary-dark/50 to-primary/50 opacity-0 group-hover:opacity-100 blur transition duration-300" />
                    <div className="relative rounded-lg bg-light dark:bg-dark border border-primary-dark/20 dark:border-primary/20 p-8 hover:border-transparent transition duration-300">
                      <dt className="text-xl font-semibold leading-7 text-primary-dark dark:text-primary">
                        {feature.title}
                      </dt>
                      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-primary-dark/80 dark:text-primary/80">
                        <p className="flex-auto">{feature.description}</p>
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-[1152px] px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary-dark dark:text-primary">
                开发工具
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-primary-dark dark:text-primary sm:text-4xl">
                提升开发效率
              </p>
              <p className="mt-6 text-lg leading-8 text-primary-dark/80 dark:text-primary/80">
                精选高效的开发工具，助力开发效率提升
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              {FRONTEND_TOOLS.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-primary-dark/50 to-primary/50 opacity-0 group-hover:opacity-100 blur transition duration-300" />
                  <div className="relative flex flex-col items-center justify-center rounded-lg bg-light dark:bg-dark border border-primary-dark/20 dark:border-primary/20 p-6 hover:border-transparent transition duration-300">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <div className="font-medium text-primary-dark dark:text-primary">
                      {tool.name}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const features = [
  {
    title: "前端开发",
    description: "React, Vue, TypeScript 等现代前端技术栈",
  },
  {
    title: "Web3 开发",
    description: "区块链, DApp, Smart Contract 开发经验",
  },
  {
    title: "面试经验",
    description: "前端面试题解析和实战经验分享",
  },
];
