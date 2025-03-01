"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitch() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const currentLang = pathname.startsWith("/en") ? "en" : "zh";
    const newLang = currentLang === "zh" ? "en" : "zh";

    startTransition(() => {
      const newPathname = pathname.replace(`/${currentLang}`, `/${newLang}`);
      router.push(newPathname);
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className={`
        p-2 rounded-lg 
        hover:bg-gray-100 dark:hover:bg-gray-800
        text-primary-dark dark:text-primary
        ${isPending ? "opacity-50" : ""}
      `}
    >
      {pathname.startsWith("/en") ? "中" : "EN"}
    </button>
  );
}
