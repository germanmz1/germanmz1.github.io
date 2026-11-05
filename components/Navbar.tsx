"use client";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";

export function Navbar() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
        <Link href="/" className="font-bold text-xl tracking-tight">
          <span className="text-blue-600 dark:text-blue-400">Germán Martínez</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {t.nav.home}
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {t.nav.about}
          </Link>
          <Link href="/como-se-construyo" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {t.nav.howItWasBuilt}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
