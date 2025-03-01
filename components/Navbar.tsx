"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { GithubIcon, Web3Icon } from "./icons";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitch from "./LanguageSwitch";

export default function Navbar() {
  const t = useTranslations("nav");

  return (
    <nav className="fixed top-0 w-full bg-light dark:bg-dark border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent hover:opacity-80 transition-all duration-300 transform hover:scale-105"
            >
              Blog
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link href="/" className="relative group">
              <span className="text-primary-dark dark:text-primary group-hover:bg-gradient-to-r group-hover:from-primary-dark group-hover:to-primary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {t("home")}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-dark to-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/resume" className="relative group">
              <span className="text-primary-dark dark:text-primary group-hover:opacity-80 transition-opacity">
                {t("resume")}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-dark to-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/blog" className="relative group">
              <span className="text-primary-dark dark:text-primary group-hover:opacity-80 transition-opacity">
                {t("blog")}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-dark to-primary group-hover:w-full transition-all duration-300" />
            </Link>

            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-primary-dark dark:text-primary transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-6 h-6" />
              </a>
              <a
                href="https://web3.example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-primary-dark dark:text-primary transition-colors"
                aria-label="Web3"
              >
                <Web3Icon className="w-6 h-6" />
              </a>

              <ThemeToggle />

              <LanguageSwitch />
            </div>
            <span className="ml-8 text-sm text-primary-dark/60 dark:text-primary/60">
              访问量: 1,234
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
