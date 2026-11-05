"use client";
import * as React from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export function LanguageToggle() {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors font-medium text-sm"
      aria-label={t.common.toggleLang}
    >
      <Languages className="h-[1.2rem] w-[1.2rem]" />
      <span className="uppercase">{lang}</span>
    </button>
  );
}
