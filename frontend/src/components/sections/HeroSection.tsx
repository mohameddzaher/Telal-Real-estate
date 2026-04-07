"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { useTranslation } from "@/hooks/useTranslation";
import { localized } from "@/lib/translations";
import { useContentStore } from "@/store/content";

export default function HeroSection() {
  const { t, locale } = useTranslation();
  const homepage = useContentStore((s) => s.homepage);

  // Build stats from content store values
  const dynamicStats = [
    { value: homepage.statProjects, suffix: "+", label: "Projects Completed", labelAr: "مشروع مكتمل" },
    { value: homepage.statUnits, suffix: "+", label: "Units Delivered", labelAr: "وحدة تم تسليمها" },
    { value: homepage.statPortfolio, suffix: "B+", label: "SAR Portfolio Value", labelAr: "مليار ريال قيمة المحفظة" },
    { value: homepage.statYears, suffix: "+", label: "Years of Excellence", labelAr: "سنة من التميز" },
  ];

  const statLine = dynamicStats.map(
    (s) => `${s.value}${s.suffix} ${localized(s.label, s.labelAr, locale)}`
  ).join(" \u2022 ");

  // Derive hero text from store, with last word highlighted
  const heroTitle = locale === "ar" ? homepage.heroTitleAr : homepage.heroTitle;
  const heroWords = heroTitle.split(" ");
  const lastWord = heroWords.pop() || "";
  const titleMain = heroWords.join(" ");
  const heroSubtitle = locale === "ar" ? homepage.heroSubtitleAr : homepage.heroSubtitle;

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black-deep via-black to-black-surface" />
      <div className="absolute inset-0 bg-noise opacity-40" />
      <div className="absolute inset-0 bg-radial-gold opacity-30" />

      {/* Content */}
      <div className="relative z-10 container-luxury flex flex-col items-center text-center pt-32 pb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="eyebrow mb-6"
        >
          {localized(SITE_CONFIG.name, SITE_CONFIG.nameAr, locale)}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extralight tracking-tight leading-none text-4xl sm:text-display lg:text-hero text-white max-w-5xl"
        >
          {titleMain}{" "}
          <span className="text-gradient-gold">{lastWord}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-6 text-gray-light font-body text-base md:text-lg max-w-xl"
        >
          {heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link href="/properties" className="btn-gold">
            {t.hero.cta1}
          </Link>
          <Link href="/about" className="btn-ghost">
            {t.hero.cta2}
          </Link>
        </motion.div>
      </div>

      {/* Stats ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="relative z-10 border-t border-black-border"
      >
        <div className="container-luxury py-6 flex justify-center">
          <p className="text-xs sm:text-sm tracking-widest uppercase text-gray-mid font-body">
            {statLine}
          </p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="block w-px h-12 bg-gradient-to-b from-gold to-transparent animate-gold-pulse" />
        <ArrowDown className="w-4 h-4 text-gold animate-float" />
      </motion.div>
    </section>
  );
}
