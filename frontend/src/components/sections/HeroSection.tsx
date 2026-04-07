"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { SITE_CONFIG, STATS } from "@/lib/constants";

const statLine = STATS.map(
  (s) => `${s.value}${s.suffix} ${s.label}`
).join(" \u2022 ");

export default function HeroSection() {
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
          {SITE_CONFIG.name}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extralight tracking-tight leading-none text-4xl sm:text-display lg:text-hero text-white max-w-5xl"
        >
          WHERE VISION
          <br />
          MEETS <span className="text-gradient-gold">LEGACY</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-6 text-gray-light font-body text-base md:text-lg max-w-xl"
        >
          {SITE_CONFIG.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link href="/properties" className="btn-gold">
            Explore Properties
          </Link>
          <Link href="/about" className="btn-ghost">
            Our Vision
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
