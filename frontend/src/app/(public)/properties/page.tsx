import { type Metadata } from "next";
import Link from "next/link";
import { MapPin, BedDouble, Bath, Maximize2, ChevronRight } from "lucide-react";
import { properties } from "@/lib/data";
import { SITE_CONFIG } from "@/lib/constants";
import { formatPrice, formatArea } from "@/lib/utils";
import { PropertyType, PropertyStatus } from "@/types";

export const metadata: Metadata = {
  title: `Properties | ${SITE_CONFIG.name}`,
  description:
    "Explore our curated collection of luxury properties across the Middle East — penthouses, villas, apartments, commercial spaces, and exclusive off-plan developments.",
};

const PROPERTY_TYPES = [
  { label: "All", value: "all" },
  { label: "Residential", value: PropertyType.RESIDENTIAL },
  { label: "Commercial", value: PropertyType.COMMERCIAL },
  { label: "Off-Plan", value: PropertyType.OFF_PLAN },
  { label: "Retail", value: PropertyType.RETAIL },
  { label: "Hospitality", value: PropertyType.HOSPITALITY },
] as const;

const CITIES = ["All", "Riyadh", "Jeddah", "Eastern Province"] as const;

const STATUS_LABELS: Record<PropertyStatus, string> = {
  [PropertyStatus.AVAILABLE]: "Available",
  [PropertyStatus.SOLD]: "Sold",
  [PropertyStatus.OFF_PLAN]: "Off-Plan",
  [PropertyStatus.UNDER_CONSTRUCTION]: "Under Construction",
  [PropertyStatus.RESERVED]: "Reserved",
};

const STATUS_COLORS: Record<PropertyStatus, string> = {
  [PropertyStatus.AVAILABLE]: "bg-success/20 text-success",
  [PropertyStatus.SOLD]: "bg-error/20 text-error",
  [PropertyStatus.OFF_PLAN]: "bg-gold/20 text-gold",
  [PropertyStatus.UNDER_CONSTRUCTION]: "bg-blue-500/20 text-blue-400",
  [PropertyStatus.RESERVED]: "bg-gray-mid/20 text-gray-light",
};

function formatType(type: PropertyType): string {
  return type
    .replace(/_/g, "-")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function PropertiesPage({
  searchParams,
}: {
  searchParams: { type?: string; city?: string; sort?: string };
}) {
  const publishedProperties = properties.filter((p) => p.isPublished);

  const filteredProperties = publishedProperties.filter((p) => {
    const typeMatch =
      !searchParams.type ||
      searchParams.type === "all" ||
      p.type === searchParams.type;
    const cityMatch =
      !searchParams.city ||
      searchParams.city === "All" ||
      p.city === searchParams.city;
    return typeMatch && cityMatch;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (searchParams.sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "area-desc":
        return b.area - a.area;
      case "newest":
        return b.createdAt.getTime() - a.createdAt.getTime();
      default:
        return b.isFeatured ? 1 : -1;
    }
  });

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative bg-black-deep py-32 md:py-40">
        <div className="absolute inset-0 bg-radial-gold opacity-30" />
        <div className="container-luxury relative z-10 text-center">
          <nav className="mb-8 flex items-center justify-center gap-2 text-sm text-gray-light">
            <Link
              href="/"
              className="transition-colors hover:text-gold"
            >
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-gray-mid" />
            <span className="text-gold">Properties</span>
          </nav>
          <h1 className="font-display text-4xl font-light tracking-tight text-white md:text-display">
            OUR PROPERTIES
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-light">
            Discover our curated collection of luxury properties across the
            Kingdom — from iconic penthouses and waterfront villas to premium
            commercial spaces and exclusive off-plan developments.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-black-border bg-black-surface">
        <div className="container-luxury py-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Type Tabs */}
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((type) => {
                const isActive =
                  searchParams.type === type.value ||
                  (!searchParams.type && type.value === "all");
                return (
                  <Link
                    key={type.value}
                    href={{
                      pathname: "/properties",
                      query: {
                        ...(type.value !== "all" && { type: type.value }),
                        ...(searchParams.city && { city: searchParams.city }),
                        ...(searchParams.sort && { sort: searchParams.sort }),
                      },
                    }}
                    className={`rounded-sm px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? "bg-gold text-black"
                        : "border border-black-border text-gray-light hover:border-gold/40 hover:text-gold"
                    }`}
                  >
                    {type.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex gap-4">
              {/* City Filter */}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" />
                <div className="flex gap-1">
                  {CITIES.map((city) => {
                    const isActive =
                      searchParams.city === city ||
                      (!searchParams.city && city === "All");
                    return (
                      <Link
                        key={city}
                        href={{
                          pathname: "/properties",
                          query: {
                            ...(searchParams.type && {
                              type: searchParams.type,
                            }),
                            ...(city !== "All" && { city }),
                            ...(searchParams.sort && {
                              sort: searchParams.sort,
                            }),
                          },
                        }}
                        className={`rounded-sm px-3 py-1 text-xs transition-all duration-300 ${
                          isActive
                            ? "text-gold"
                            : "text-gray-mid hover:text-gray-light"
                        }`}
                      >
                        {city}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-mid">Sort:</span>
                <div className="flex gap-1">
                  {[
                    { label: "Featured", value: "" },
                    { label: "Newest", value: "newest" },
                    { label: "Price ↑", value: "price-asc" },
                    { label: "Price ↓", value: "price-desc" },
                  ].map((opt) => {
                    const isActive =
                      searchParams.sort === opt.value ||
                      (!searchParams.sort && opt.value === "");
                    return (
                      <Link
                        key={opt.value}
                        href={{
                          pathname: "/properties",
                          query: {
                            ...(searchParams.type && {
                              type: searchParams.type,
                            }),
                            ...(searchParams.city && {
                              city: searchParams.city,
                            }),
                            ...(opt.value && { sort: opt.value }),
                          },
                        }}
                        className={`rounded-sm px-2 py-1 text-xs transition-all duration-300 ${
                          isActive
                            ? "text-gold"
                            : "text-gray-mid hover:text-gray-light"
                        }`}
                      >
                        {opt.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Grid */}
      <section className="section-padding">
        <div className="container-luxury">
          <p className="mb-8 text-sm text-gray-mid">
            {sortedProperties.length} propert
            {sortedProperties.length === 1 ? "y" : "ies"} found
          </p>

          {sortedProperties.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-mid">
                No properties match your criteria.
              </p>
              <Link href="/properties" className="btn-gold mt-6 inline-block">
                View All Properties
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sortedProperties.map((property) => (
                <Link
                  key={property.id}
                  href={`/properties/${property.slug}`}
                  className="card-luxury group"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img src={property.images?.[0]?.url || "/images/placeholder-property.jpg"} alt={property.title} className="h-full w-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105" />
                    {/* Type Badge */}
                    <span className="absolute left-4 top-4 rounded-sm bg-gold/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-black">
                      {formatType(property.type)}
                    </span>
                    {/* Status Badge */}
                    <span
                      className={`absolute right-4 top-4 rounded-sm px-3 py-1 text-xs font-medium uppercase tracking-wider ${STATUS_COLORS[property.status]}`}
                    >
                      {STATUS_LABELS[property.status]}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-light tracking-tight text-white transition-colors group-hover:text-gold">
                      {property.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-1 text-sm text-gray-light">
                      <MapPin className="h-3.5 w-3.5 text-gold" />
                      <span>
                        {property.location}, {property.city}
                      </span>
                    </div>

                    <div className="mt-4 flex items-baseline justify-between">
                      <p className="font-display text-2xl font-light text-gold">
                        {formatPrice(property.price, property.currency)}
                      </p>
                      <p className="flex items-center gap-1 text-sm text-gray-mid">
                        <Maximize2 className="h-3.5 w-3.5" />
                        {formatArea(property.area)}
                      </p>
                    </div>

                    {/* Bed / Bath */}
                    {(property.bedrooms !== undefined ||
                      property.bathrooms !== undefined) && (
                      <div className="mt-4 flex gap-4 border-t border-black-border pt-4">
                        {property.bedrooms !== undefined && (
                          <div className="flex items-center gap-1.5 text-sm text-gray-light">
                            <BedDouble className="h-4 w-4 text-gray-mid" />
                            <span>
                              {property.bedrooms === 0
                                ? "Studio"
                                : `${property.bedrooms} Bed${property.bedrooms > 1 ? "s" : ""}`}
                            </span>
                          </div>
                        )}
                        {property.bathrooms !== undefined && (
                          <div className="flex items-center gap-1.5 text-sm text-gray-light">
                            <Bath className="h-4 w-4 text-gray-mid" />
                            <span>
                              {property.bathrooms} Bath
                              {property.bathrooms > 1 ? "s" : ""}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
