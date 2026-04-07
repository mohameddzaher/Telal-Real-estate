"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FooterCTA() {
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
            Ready to Find Your{" "}
            <span className="text-gradient-gold">Legacy</span>?
          </h2>
          <p className="body-text max-w-xl mx-auto mb-10">
            Whether you are looking for a forever home, a strategic investment,
            or a landmark commercial space, our team is ready to guide you
            through every step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-gold">
              Contact Us
            </Link>
            <Link href="/properties" className="btn-ghost">
              Browse Properties
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
