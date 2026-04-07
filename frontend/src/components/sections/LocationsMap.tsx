"use client";

import { motion } from "framer-motion";
import { CITIES } from "@/lib/constants";

export default function LocationsMap() {
  return (
    <section className="section-padding bg-black-deep">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="eyebrow mb-4">Presence</p>
          <h2 className="heading-section text-white">Where We Build</h2>
        </motion.div>

        {/* Stylized map placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full aspect-[2/1] lg:aspect-[3/1] bg-black-surface border border-black-border rounded-sm overflow-hidden"
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 grid-pattern" />
          <div className="absolute inset-0 bg-radial-gold opacity-20" />

          {/* City markers positioned roughly on a conceptual Saudi Arabia map */}
          {CITIES.map((city, i) => {
            // Convert lat/lng to rough percentage positions on the container
            const positions: Record<string, { left: string; top: string }> = {
              Riyadh: { left: "50%", top: "50%" },
              Jeddah: { left: "25%", top: "55%" },
              "NEOM Belt": { left: "22%", top: "18%" },
              "Eastern Province": { left: "72%", top: "42%" },
              Dubai: { left: "82%", top: "48%" },
            };
            const pos = positions[city.name] || {
              left: `${20 + i * 15}%`,
              top: "50%",
            };

            return (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
                style={{ left: pos.left, top: pos.top }}
              >
                {/* Pulse ring */}
                <span className="absolute w-6 h-6 rounded-full bg-gold/10 animate-gold-pulse" />
                {/* Dot */}
                <span className="relative w-3 h-3 rounded-full bg-gold shadow-[0_0_12px_rgba(201,168,76,0.5)]" />
                {/* Label */}
                <span className="mt-2 text-xs font-body text-white whitespace-nowrap">
                  {city.name}
                  {city.name === "Dubai" && (
                    <span className="text-gold/50 ml-1">(upcoming)</span>
                  )}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Text row */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-center text-sm tracking-widest uppercase text-gray-mid font-body"
        >
          {CITIES.map((c) => c.name).join(" \u2022 ")}
        </motion.p>
      </div>
    </section>
  );
}
