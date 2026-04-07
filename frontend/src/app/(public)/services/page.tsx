import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { services } from "@/lib/data";
import {
  Home,
  Building2,
  Layers,
  Map,
  Store,
  Hotel,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: `Our Services | ${SITE_CONFIG.name}`,
  description:
    "Explore Telal Development's full range of services — from luxury residential and commercial development to off-plan investment and hospitality.",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Building2,
  Layers,
  Map,
  Store,
  Hotel,
};

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section-padding bg-black-DEFAULT bg-noise relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-30" />
        <div className="container-luxury relative z-10 text-center">
          <p className="eyebrow mb-6">Services</p>
          <h1 className="heading-display text-gradient-gold mb-6">
            WHAT WE DO
          </h1>
          <p className="body-text max-w-2xl mx-auto">
            From visionary master plans to meticulous finishing touches, Telal
            Development delivers a comprehensive suite of real estate services.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-black-deep">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.icon] ?? Home;
              return (
                <div key={service.id} className="card-luxury p-8 group flex flex-col">
                  <div className="w-14 h-14 rounded-sm bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-display text-2xl text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="body-text text-sm mb-6 flex-1">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-light"
                      >
                        <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-gold text-sm uppercase tracking-wider hover:gap-3 transition-all duration-300 mt-auto"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-black-DEFAULT border-t border-black-border relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-20" />
        <div className="container-luxury text-center relative z-10">
          <h2 className="heading-section text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="body-text max-w-xl mx-auto mb-8">
            Let our team help you find the perfect property or investment
            opportunity tailored to your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-gold">
              Contact Us
            </Link>
            <Link href="/properties" className="btn-ghost">
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
