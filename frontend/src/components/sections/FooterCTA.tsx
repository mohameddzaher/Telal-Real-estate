"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function FooterCTA() {
  const { t } = useTranslation();

  return (
    <section className="relative section-padding bg-black overflow-hidden">
      <div className="absolute inset-0 bg-radial-gold opacity-20" />
      <div className="absolute inset-0 bg-noise opacity-30" />

      <div className="relative z-10 container-luxury text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-display font-light text-white leading-tight mb-6">
            {t.sections.readyToFind}{" "}
            <span className="text-gradient-gold">{t.sections.legacy}</span>?
          </h2>
          <p className="body-text max-w-xl mx-auto mb-10">
            {t.sections.readyBody}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-gold">
              {t.common.contactUs}
            </Link>
            <Link href="/properties" className="btn-ghost">
              {t.common.browseProperties}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
