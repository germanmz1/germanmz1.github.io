"use client";
import { useLanguage } from "./LanguageProvider";

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-auto py-8">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400 max-w-6xl">
        © {new Date().getFullYear()} Germán MZ. 
      </div>
    </footer>
  );
}
