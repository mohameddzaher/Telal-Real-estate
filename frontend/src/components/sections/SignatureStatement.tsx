"use client";

import { motion } from "framer-motion";

export default function SignatureStatement() {
  return (
    <section className="relative section-padding bg-black bg-noise overflow-hidden">
      <div className="container-luxury flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-24">
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1"
        >
          <p className="font-display text-2xl sm:text-3xl md:text-4xl font-light leading-snug text-white/90">
            For over sixteen years, Telal Development has been crafting spaces
            where{" "}
            <span className="text-gradient-gold">
              ambition finds its address
            </span>{" "}
            and{" "}
            <span className="text-gradient-gold">
              vision finds its home
            </span>
            .
          </p>
          <p className="mt-8 font-display text-xl sm:text-2xl md:text-3xl font-light leading-snug text-white/70">
            We don&apos;t build properties &mdash; we build{" "}
            <span className="text-gradient-gold">legacies</span>.
          </p>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex-shrink-0 flex flex-col items-end"
        >
          <span className="block w-px h-16 bg-gold/30 mb-4" />
          <span className="font-display text-lg text-gold/60 tracking-wider">
            est. 2008
          </span>
        </motion.div>
      </div>
    </section>
  );
}
