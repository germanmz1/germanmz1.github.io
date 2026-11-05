"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-32 flex flex-col items-center justify-center text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        {t.hero.title}
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed">
        {t.hero.subtitle}
      </p>
      <Link 
        href="/#proyectos" 
        className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-full font-medium transition-all hover:scale-105"
      >
        {t.hero.cta}
        <ArrowRight className="w-5 h-5" />
      </Link>
    </section>
  );
}
