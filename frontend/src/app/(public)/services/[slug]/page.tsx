import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, properties } from "@/lib/data";
import { SITE_CONFIG } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { Check, ArrowRight, MapPin } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | ${SITE_CONFIG.name}`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Find related properties based on service type mapping
  const typeMap: Record<string, string> = {
    residential: "RESIDENTIAL",
    commercial: "COMMERCIAL",
    "mixed-use": "MIXED_USE",
    "off-plan": "OFF_PLAN",
    retail: "RETAIL",
    hospitality: "HOSPITALITY",
  };

  const relatedProperties = properties
    .filter(
      (p) =>
        p.type === typeMap[service.slug] && p.isPublished
    )
    .slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="section-padding bg-black-DEFAULT bg-noise relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-30" />
        <div className="container-luxury relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-gray-light hover:text-gold text-sm uppercase tracking-wider transition-colors duration-300 mb-8"
          >
            All Services
          </Link>
          <h1 className="heading-display text-gradient-gold mb-6">
            {service.title.toUpperCase()}
          </h1>
          <p className="body-text max-w-3xl text-lg">
            {service.description}
          </p>
        </div>
      </section>

      {/* Description & Features */}
      <section className="section-padding bg-black-deep">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Description */}
            <div>
              <p className="eyebrow mb-4">Overview</p>
              <h2 className="heading-section text-white mb-6">
                What We Deliver
              </h2>
              <div className="space-y-4 body-text">
                <p>{service.description}</p>
                <p>
                  At Telal Development, our {service.title.toLowerCase()}{" "}
                  division combines world-class design expertise with deep local
                  market knowledge. We manage every stage of the development
                  lifecycle — from land acquisition and master-planning through
                  to construction, finishing, and handover.
                </p>
                <p>
                  Each project is guided by our commitment to quality,
                  sustainability, and creating lasting value for our clients and
                  investors.
                </p>
              </div>
            </div>

            {/* Features */}
            <div>
              <p className="eyebrow mb-4">Key Features</p>
              <h2 className="heading-section text-white mb-6">
                Why Choose Telal
              </h2>
              <ul className="space-y-4">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-4 p-4 bg-black-surface border border-black-border rounded-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-gold" />
                    </div>
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Image placeholder */}
      <section className="section-padding bg-black-DEFAULT">
        <div className="container-luxury">
          <div className="aspect-[21/9] rounded-sm border border-black-border overflow-hidden">
            <img src={service.image || "/images/placeholder-service.jpg"} alt={service.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <section className="section-padding bg-black-deep">
          <div className="container-luxury">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="eyebrow mb-4">Featured Listings</p>
                <h2 className="heading-section text-white">
                  Related Properties
                </h2>
              </div>
              <Link
                href="/properties"
                className="hidden md:inline-flex items-center gap-2 text-gold text-sm uppercase tracking-wider hover:gap-3 transition-all duration-300"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProperties.map((property) => (
                <Link
                  key={property.id}
                  href={`/properties/${property.slug}`}
                  className="card-luxury group"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img src={property.images?.[0]?.url || "/images/placeholder-property.jpg"} alt={property.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black-DEFAULT/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-1 text-sm text-gray-light">
                      <MapPin className="w-3.5 h-3.5" />
                      {property.location}, {property.city}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl text-white group-hover:text-gold transition-colors duration-300 mb-2">
                      {property.title}
                    </h3>
                    <p className="text-gold font-display text-lg">
                      {formatPrice(property.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="section-padding bg-black-DEFAULT border-t border-black-border">
        <div className="container-luxury text-center">
          <h2 className="heading-section text-white mb-4">
            Interested in {service.title}?
          </h2>
          <p className="body-text max-w-xl mx-auto mb-8">
            Speak with our specialists to explore how Telal can help you
            achieve your real estate goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-gold">
              Contact Our Team
            </Link>
            <Link href="/properties" className="btn-ghost">
              Explore Properties
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
