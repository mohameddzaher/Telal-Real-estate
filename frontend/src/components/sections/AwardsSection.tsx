"use client";

import { motion } from "framer-motion";

const awards = [
  { name: "Saudi Real Estate Award", year: "2023" },
  { name: "MENA Green Building", year: "2023" },
  { name: "Best Luxury Developer KSA", year: "2022" },
  { name: "Arabian Property Award", year: "2022" },
  { name: "LEED Gold Certified", year: "2021" },
  { name: "Vision 2030 Excellence", year: "2021" },
  { name: "GCC Developer of the Year", year: "2020" },
  { name: "ISO 9001 Certified", year: "2019" },
];

export default function AwardsSection() {
  return (
    <section className="section-padding bg-black border-t border-b border-black-border">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <p className="eyebrow mb-4">Recognition</p>
          <h2 className="heading-section text-white">
            Awards &amp; Certifications
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {awards.map((award, i) => (
            <motion.div
              key={award.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group px-6 py-4 border border-black-border rounded-sm transition-all duration-500 ease-luxury hover:border-gold/50 hover:gold-glow cursor-default"
            >
              <p className="text-sm font-body text-gray-mid group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                {award.name}
              </p>
              <p className="text-xs font-body text-gray-mid/50 group-hover:text-gold/60 transition-colors duration-300 mt-1">
                {award.year}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
