"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Building2, Layers, Map, Store, Hotel } from "lucide-react";
import { services } from "@/lib/data";
import { useTranslation } from "@/hooks/useTranslation";
import { localized } from "@/lib/translations";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Home,
  Building2,
  Layers,
  Map,
  Store,
  Hotel,
};

export default function ServicesSection() {
  const { t, locale } = useTranslation();

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
          <p className="eyebrow mb-4">{t.sections.ourServices}</p>
          <h2 className="heading-section text-white">{t.sections.ourServicesHeading}</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Home;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group block p-8 bg-black-surface border border-black-border rounded-sm transition-all duration-500 ease-luxury hover:border-gold/40 h-full"
                >
                  <Icon className="w-8 h-8 text-gold mb-6 transition-transform duration-500 group-hover:scale-110" />
                  <h3 className="font-display text-xl text-white mb-3">
                    {localized(service.title, service.titleAr, locale)}
                  </h3>
                  <p className="text-sm text-gray-light font-body leading-relaxed">
                    {localized(service.description, service.descriptionAr, locale)}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
