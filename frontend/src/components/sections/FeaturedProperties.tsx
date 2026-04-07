"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { properties } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const featured = properties.filter((p) => p.isFeatured).slice(0, 5);

export default function FeaturedProperties() {
  return (
    <section className="section-padding bg-black">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="eyebrow mb-4">Featured Collection</p>
          <h2 className="heading-section text-white">
            Exceptional Properties
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {featured.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <Link
                href={`/properties/${property.slug}`}
                className="group card-luxury block"
              >
                {/* Image placeholder */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={property.images?.[0]?.url || "/images/placeholder-property.jpg"} alt={property.title} className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105" />
                  {/* Type badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs uppercase tracking-wider bg-black/70 text-gold border border-gold/20 rounded-sm font-body">
                    {property.type.replace("_", " ")}
                  </span>
                  {/* Arrow on hover */}
                  <span className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-gold/0 group-hover:bg-gold text-gold group-hover:text-black rounded-sm transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Details */}
                <div className="p-4">
                  <h3 className="font-display text-lg text-gold mb-1 leading-tight">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gold-muted font-body mb-3">
                    {formatPrice(property.price, property.currency)}
                  </p>
                  <div className="flex items-center gap-1 text-gray-light text-xs font-body mb-2">
                    <MapPin className="w-3 h-3 text-gold/50" />
                    <span>
                      {property.location}, {property.city}
                    </span>
                  </div>
                  {(property.bedrooms !== undefined ||
                    property.bathrooms !== undefined) && (
                    <div className="flex gap-3 text-xs text-gray-mid font-body">
                      {property.bedrooms !== undefined && (
                        <span>
                          {property.bedrooms === 0
                            ? "Studio"
                            : `${property.bedrooms} Bed`}
                        </span>
                      )}
                      {property.bathrooms !== undefined && (
                        <span>{property.bathrooms} Bath</span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <Link href="/properties" className="btn-ghost">
            View All Properties
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
