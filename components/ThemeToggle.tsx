"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "./LanguageProvider";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
      aria-label={t.common.toggleTheme}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{t.common.toggleTheme}</span>
    </button>
  );
}
