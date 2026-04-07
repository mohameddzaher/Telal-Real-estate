import { type Metadata } from "next";
import Link from "next/link";
import { ViewTracker } from "@/components/analytics/ViewTracker";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Car,
  Building2,
  ChevronRight,
  Check,
  Share2,
  Heart,
  Phone,
  Mail,
} from "lucide-react";
import { properties } from "@/lib/data";
import { SITE_CONFIG } from "@/lib/constants";
import { formatPrice, formatArea } from "@/lib/utils";
import { PropertyStatus } from "@/types";

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

export async function generateStaticParams() {
  return properties
    .filter((p) => p.isPublished)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const property = properties.find((p) => p.slug === params.slug);
  if (!property) {
    return { title: "Property Not Found" };
  }
  return {
    title: `${property.title} | ${SITE_CONFIG.name}`,
    description: property.description.slice(0, 160),
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 160),
      type: "website",
    },
  };
}

export default function PropertyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const property = properties.find(
    (p) => p.slug === params.slug && p.isPublished
  );

  if (!property) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-white">
            Property Not Found
          </h1>
          <Link href="/properties" className="btn-gold mt-8 inline-block">
            View All Properties
          </Link>
        </div>
      </main>
    );
  }

  const similarProperties = properties.filter(
    (p) =>
      p.id !== property.id &&
      p.city === property.city &&
      p.isPublished
  ).slice(0, 3);

  const infoItems = [
    {
      icon: <Maximize2 className="h-5 w-5" />,
      label: "Area",
      value: formatArea(property.area),
    },
    ...(property.bedrooms !== undefined
      ? [
          {
            icon: <BedDouble className="h-5 w-5" />,
            label: "Bedrooms",
            value:
              property.bedrooms === 0
                ? "Studio"
                : String(property.bedrooms),
          },
        ]
      : []),
    ...(property.bathrooms !== undefined
      ? [
          {
            icon: <Bath className="h-5 w-5" />,
            label: "Bathrooms",
            value: String(property.bathrooms),
          },
        ]
      : []),
    ...(property.parkingSpots !== undefined
      ? [
          {
            icon: <Car className="h-5 w-5" />,
            label: "Parking",
            value: String(property.parkingSpots),
          },
        ]
      : []),
    ...(property.floors !== undefined
      ? [
          {
            icon: <Building2 className="h-5 w-5" />,
            label: "Floors",
            value: String(property.floors),
          },
        ]
      : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${SITE_CONFIG.url}/properties/${property.slug}`,
    price: property.price,
    priceCurrency: property.currency,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location,
      addressLocality: property.city,
      addressCountry: "SA",
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.area,
      unitCode: "MTK",
    },
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
  };

  return (
    <main>
      <ViewTracker path={`/properties/${property.slug}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        <img src={property.images?.[0]?.url || "/images/placeholder-property.jpg"} alt={property.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="container-luxury relative z-10 flex h-full flex-col justify-end pb-12">
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-light">
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-gray-mid" />
            <Link
              href="/properties"
              className="transition-colors hover:text-gold"
            >
              Properties
            </Link>
            <ChevronRight className="h-3 w-3 text-gray-mid" />
            <span className="text-gold">{property.title}</span>
          </nav>
          <div className="flex items-start justify-between">
            <div>
              <span
                className={`mb-4 inline-block rounded-sm px-3 py-1 text-xs font-medium uppercase tracking-wider ${STATUS_COLORS[property.status]}`}
              >
                {STATUS_LABELS[property.status]}
              </span>
              <h1 className="font-display text-3xl font-light tracking-tight text-white md:text-4xl lg:text-display">
                {property.title}
              </h1>
              <div className="mt-3 flex items-center gap-2 text-gray-light">
                <MapPin className="h-4 w-4 text-gold" />
                <span>
                  {property.location}, {property.city}
                </span>
              </div>
            </div>
            <p className="hidden font-display text-3xl font-light text-gold md:block lg:text-4xl">
              {formatPrice(property.price, property.currency)}
            </p>
          </div>
        </div>
      </section>

      {/* Mobile Price */}
      <div className="border-b border-black-border bg-black-surface px-6 py-4 md:hidden">
        <p className="font-display text-2xl font-light text-gold">
          {formatPrice(property.price, property.currency)}
        </p>
      </div>

      {/* Info Bar */}
      <section className="border-b border-black-border bg-black-surface">
        <div className="container-luxury">
          <div className="grid grid-cols-2 divide-x divide-black-border md:grid-cols-5">
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 py-6"
              >
                <div className="text-gold">{item.icon}</div>
                <p className="text-xs uppercase tracking-wider text-gray-mid">
                  {item.label}
                </p>
                <p className="font-display text-xl font-light text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
            {/* Left Column */}
            <div className="space-y-16">
              {/* Description */}
              <div>
                <h2 className="font-display text-3xl font-light tracking-tight text-white">
                  About This Property
                </h2>
                <div className="mt-2 h-px w-16 bg-gold" />
                <p className="mt-6 text-base leading-relaxed text-gray-light">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities.length > 0 && (
                <div>
                  <h2 className="font-display text-3xl font-light tracking-tight text-white">
                    Amenities
                  </h2>
                  <div className="mt-2 h-px w-16 bg-gold" />
                  <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                    {property.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 rounded-sm border border-black-border bg-black-deep px-4 py-3"
                      >
                        <Check className="h-4 w-4 shrink-0 text-gold" />
                        <span className="text-sm text-gray-light">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Floor Plans Section */}
              <div>
                <h2 className="font-display text-3xl font-light tracking-tight text-white">
                  Floor Plans
                </h2>
                <div className="mt-2 h-px w-16 bg-gold" />
                <div className="mt-6 overflow-hidden rounded-sm border border-black-border">
                  <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-black-surface to-black-deep">
                    <p className="text-sm text-gray-mid">
                      Floor plan available upon request
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h2 className="font-display text-3xl font-light tracking-tight text-white">
                  Location
                </h2>
                <div className="mt-2 h-px w-16 bg-gold" />
                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="text-white">{property.location}</p>
                      <p className="text-sm text-gray-mid">{property.city}</p>
                    </div>
                  </div>
                  <div className="mt-4 overflow-hidden rounded-sm border border-black-border">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location + ', ' + property.city)}&zoom=14&maptype=roadmap`}
                      className="aspect-[16/9] w-full border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${property.location}`}
                    />
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h2 className="font-display text-3xl font-light tracking-tight text-white">
                  Gallery
                </h2>
                <div className="mt-2 h-px w-16 bg-gold" />
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                  {(property.images.length > 0 ? property.images : [{ url: "/images/placeholder-property.jpg", alt: property.title }]).map((img, i) => (
                    <div
                      key={i}
                      className="aspect-[4/3] overflow-hidden rounded-sm border border-black-border"
                    >
                      <img src={img.url} alt={img.alt || `${property.title} ${i + 1}`} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-8">
              {/* Inquiry Form */}
              <div className="rounded-sm border border-black-border bg-black-surface p-6">
                <h3 className="font-display text-xl font-light text-white">
                  Inquire About This Property
                </h3>
                <div className="mt-1 h-px w-12 bg-gold" />
                <form className="mt-6 space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="input-luxury"
                    aria-label="Full Name"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="input-luxury"
                    aria-label="Email Address"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="input-luxury"
                    aria-label="Phone Number"
                  />
                  <textarea
                    placeholder="I'm interested in this property..."
                    rows={4}
                    className="input-luxury resize-none"
                    aria-label="Message"
                  />
                  <button type="button" className="btn-gold w-full">
                    Send Inquiry
                  </button>
                </form>
              </div>

              {/* Agent Card */}
              <div className="rounded-sm border border-black-border bg-black-surface p-6">
                <h3 className="font-display text-xl font-light text-white">
                  Your Agent
                </h3>
                <div className="mt-1 h-px w-12 bg-gold" />
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-14 w-14 shrink-0 rounded-full bg-gradient-to-br from-black-deep to-gold/20" />
                  <div>
                    <p className="font-display text-lg text-white">
                      Telal Sales Team
                    </p>
                    <p className="text-sm text-gray-mid">
                      Luxury Property Specialist
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="flex items-center gap-3 text-sm text-gray-light transition-colors hover:text-gold"
                  >
                    <Phone className="h-4 w-4 text-gold" />
                    {SITE_CONFIG.phone}
                  </a>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="flex items-center gap-3 text-sm text-gray-light transition-colors hover:text-gold"
                  >
                    <Mail className="h-4 w-4 text-gold" />
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  type="button"
                  className="btn-ghost flex-1 gap-2"
                  aria-label="Share this property"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
                <button
                  type="button"
                  className="btn-ghost flex-1 gap-2"
                  aria-label="Save to favorites"
                >
                  <Heart className="h-4 w-4" />
                  Favorite
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <section className="section-padding border-t border-black-border">
          <div className="container-luxury">
            <div className="mb-12 text-center">
              <p className="eyebrow">Explore More</p>
              <h2 className="mt-4 font-display text-3xl font-light tracking-tight text-white md:text-4xl">
                Similar Properties in {property.city}
              </h2>
              <div className="mx-auto mt-4 h-px w-24 bg-gold" />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {similarProperties.map((p) => (
                <Link
                  key={p.id}
                  href={`/properties/${p.slug}`}
                  className="card-luxury group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img src={p.images?.[0]?.url || "/images/placeholder-property.jpg"} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-light text-white transition-colors group-hover:text-gold">
                      {p.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-1 text-sm text-gray-light">
                      <MapPin className="h-3.5 w-3.5 text-gold" />
                      <span>
                        {p.location}, {p.city}
                      </span>
                    </div>
                    <p className="mt-3 font-display text-xl font-light text-gold">
                      {formatPrice(p.price, p.currency)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
