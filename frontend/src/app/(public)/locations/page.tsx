import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, CITIES } from "@/lib/constants";
import { ArrowRight, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: `Our Locations | ${SITE_CONFIG.name}`,
  description:
    "Discover Telal Development's presence across Saudi Arabia and the Gulf — Riyadh, Jeddah, NEOM Belt, Eastern Province, and Dubai.",
};

const cityDetails: Record<
  string,
  { description: string; gradient: string; propertyCount: number }
> = {
  Riyadh: {
    description:
      "The capital and our headquarters. Riyadh hosts our largest portfolio of luxury residential towers, gated compounds, and commercial developments in prime districts like Olaya, KAFD, and the Diplomatic Quarter.",
    gradient: "from-amber-900/60 via-stone-900/40 to-black",
    propertyCount: 24,
  },
  Jeddah: {
    description:
      "The jewel of the Red Sea coast. Our Jeddah developments capture waterfront luxury with stunning Corniche views, blending contemporary design with the city's rich cultural heritage.",
    gradient: "from-blue-900/60 via-slate-900/40 to-black",
    propertyCount: 12,
  },
  "NEOM Belt": {
    description:
      "At the frontier of the future. Telal is proud to participate in the NEOM ecosystem, contributing to the most ambitious urban development project in human history.",
    gradient: "from-violet-900/60 via-indigo-900/40 to-black",
    propertyCount: 3,
  },
  "Eastern Province": {
    description:
      "The commercial heart of the Gulf. Our Eastern Province projects serve the thriving business community with premium residences and Grade A offices along the Al Khobar Corniche.",
    gradient: "from-emerald-900/60 via-teal-900/40 to-black",
    propertyCount: 8,
  },
  Dubai: {
    description:
      "Our gateway to international markets. Telal's Dubai presence brings Saudi luxury standards to the world's most dynamic real estate destination.",
    gradient: "from-orange-900/60 via-rose-900/40 to-black",
    propertyCount: 5,
  },
};

export default function LocationsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section-padding bg-black-DEFAULT bg-noise relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-30" />
        <div className="container-luxury relative z-10 text-center">
          <p className="eyebrow mb-6">Locations</p>
          <h1 className="heading-display text-gradient-gold mb-6">
            WHERE WE BUILD
          </h1>
          <p className="body-text max-w-2xl mx-auto">
            From the heart of Riyadh to the shores of the Red Sea, Telal
            Development creates iconic landmarks in the region&apos;s most
            prestigious addresses.
          </p>
        </div>
      </section>

      {/* City Cards Grid */}
      <section className="section-padding bg-black-deep">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CITIES.map((city) => {
              const details = cityDetails[city.name];
              return (
                <div
                  key={city.name}
                  className="card-luxury group relative overflow-hidden"
                >
                  {/* Gradient placeholder for city image */}
                  <div
                    className={`relative h-56 bg-gradient-to-br ${details?.gradient || "from-gray-900 to-black"} flex items-end p-6`}
                  >
                    <div className="absolute inset-0 bg-noise opacity-40" />
                    <div className="absolute top-4 right-4">
                      <MapPin className="w-5 h-5 text-gold/60" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="font-display text-2xl text-white mb-1">
                        {city.name}
                      </h3>
                      <p className="text-gold/80 font-body text-sm">
                        {city.nameAr}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="body-text text-sm mb-4 leading-relaxed">
                      {details?.description ||
                        "Discover our premium developments in this location."}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-mid uppercase tracking-wider">
                        {details?.propertyCount || 0} Properties
                      </span>
                      <Link
                        href={`/properties?city=${encodeURIComponent(city.name)}`}
                        className="inline-flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all duration-300"
                      >
                        Explore Properties
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="section-padding bg-black-DEFAULT relative overflow-hidden">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">Our Reach</p>
            <h2 className="heading-section text-white">
              Across the Region
            </h2>
          </div>

          {/* SVG Map */}
          <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] bg-black-surface border border-black-border rounded-sm overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <svg
              viewBox="0 0 800 450"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Connecting lines */}
              {CITIES.map((city, i) => {
                const nextCity = CITIES[(i + 1) % CITIES.length];
                const x1 = ((city.lng - 34) / 22) * 700 + 50;
                const y1 = ((28 - city.lat) / 10) * 400 + 25;
                const x2 = ((nextCity.lng - 34) / 22) * 700 + 50;
                const y2 = ((28 - nextCity.lat) / 10) * 400 + 25;
                return (
                  <line
                    key={`line-${i}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(201,168,76,0.15)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                );
              })}

              {/* City dots */}
              {CITIES.map((city) => {
                const cx = ((city.lng - 34) / 22) * 700 + 50;
                const cy = ((28 - city.lat) / 10) * 400 + 25;
                return (
                  <g key={city.name}>
                    {/* Pulse ring */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r="16"
                      fill="none"
                      stroke="rgba(201,168,76,0.2)"
                      strokeWidth="1"
                    >
                      <animate
                        attributeName="r"
                        values="8;20;8"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.6;0;0.6"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    {/* City dot */}
                    <circle cx={cx} cy={cy} r="5" fill="#C9A84C" />
                    <circle
                      cx={cx}
                      cy={cy}
                      r="2"
                      fill="#F0D080"
                    />
                    {/* Label */}
                    <text
                      x={cx}
                      y={cy - 14}
                      textAnchor="middle"
                      fill="#A0A0A0"
                      fontSize="11"
                      fontFamily="system-ui, sans-serif"
                    >
                      {city.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-black-deep border-t border-black-border">
        <div className="container-luxury text-center">
          <h2 className="heading-section text-white mb-4">
            Find Your Perfect Location
          </h2>
          <p className="body-text max-w-xl mx-auto mb-8">
            Explore our full portfolio of luxury properties across every
            location we serve.
          </p>
          <Link href="/properties" className="btn-gold">
            Browse All Properties
          </Link>
        </div>
      </section>
    </main>
  );
}
