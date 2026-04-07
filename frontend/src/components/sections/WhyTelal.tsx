"use client";

import { motion } from "framer-motion";

const differentiators = [
  {
    number: "01",
    title: "Investment Security",
    description:
      "Every Telal project is backed by transparent financials, regulated escrow accounts, and a track record of delivering consistent returns. Your investment is protected from day one.",
  },
  {
    number: "02",
    title: "Master Planning",
    description:
      "We design complete communities, not isolated buildings. Our master-planned developments integrate infrastructure, green spaces, and amenities to create thriving neighborhoods.",
  },
  {
    number: "03",
    title: "Quality Assurance",
    description:
      "From foundation to finishing, every detail is held to the highest international standards. Independent quality audits and premium material sourcing ensure lasting excellence.",
  },
  {
    number: "04",
    title: "Lifestyle Curation",
    description:
      "Beyond bricks and mortar, we curate experiences. Concierge services, community programming, and bespoke interior design transform a property into a way of life.",
  },
];

export default function WhyTelal() {
  return (
    <section className="section-padding bg-black">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="eyebrow mb-4">The Telal Difference</p>
          <h2 className="heading-section text-white">Why Telal</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="relative"
            >
              {/* Large background number */}
              <span className="absolute -top-6 -left-2 font-display text-[8rem] leading-none font-light text-white/[0.04] select-none pointer-events-none">
                {item.number}
              </span>

              <div className="relative z-10 pt-8">
                <h3 className="font-display text-xl text-gold mb-4">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-light font-body leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
