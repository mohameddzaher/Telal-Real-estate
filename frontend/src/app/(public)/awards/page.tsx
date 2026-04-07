import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { Trophy, Award } from "lucide-react";

export const metadata: Metadata = {
  title: `Awards & Recognition | ${SITE_CONFIG.name}`,
  description:
    "Telal Development's awards and accolades — recognized for excellence in luxury real estate, sustainable design, and innovation across the region.",
};

const awards = [
  {
    year: "2024",
    name: "Developer of the Year",
    organization: "Saudi Real Estate Awards",
    description:
      "Recognized for exceptional contributions to the Kingdom's luxury real estate landscape and consistent delivery of world-class developments.",
  },
  {
    year: "2024",
    name: "Best Luxury Residential Development",
    organization: "Arabian Property Awards",
    description:
      "Al Thuraya Tower was honored as the finest luxury residential tower in the Arabian region for its uncompromising design and quality.",
  },
  {
    year: "2023",
    name: "Best Luxury Developer — Saudi Arabia",
    organization: "Arabian Property Awards",
    description:
      "Awarded for overall excellence in luxury real estate development, reflecting our commitment to design innovation and client satisfaction.",
  },
  {
    year: "2023",
    name: "Innovation in Design",
    organization: "MEED Quality Awards",
    description:
      "Noor Residences recognized for pioneering smart building integration and biophilic design principles in mixed-use development.",
  },
  {
    year: "2022",
    name: "Sustainable Project of the Year",
    organization: "Gulf Sustainability Awards",
    description:
      "Our LEED Gold-certified residential complex set new standards for sustainable luxury development in the region.",
  },
  {
    year: "2022",
    name: "Best Mixed-Use Development",
    organization: "International Property Awards",
    description:
      "Our integrated community development was recognized globally for its masterful blend of residential, commercial, and lifestyle spaces.",
  },
  {
    year: "2021",
    name: "Excellence in Customer Service",
    organization: "Saudi Customer Experience Awards",
    description:
      "Honored for our exceptional client journey — from initial consultation through handover and after-sales support.",
  },
  {
    year: "2021",
    name: "Best Architectural Design",
    organization: "Middle East Architect Awards",
    description:
      "Our design team was recognized for creating a landmark residential tower that harmoniously blends contemporary and traditional Arabian architecture.",
  },
  {
    year: "2020",
    name: "Vision 2030 Alignment Award",
    organization: "Saudi Ministry of Housing",
    description:
      "Acknowledged for meaningful contributions to the Kingdom's housing goals and alignment with Vision 2030 urban development objectives.",
  },
  {
    year: "2019",
    name: "Best Emerging Developer",
    organization: "Cityscape Global Awards",
    description:
      "Recognized as the most promising luxury developer in the MENA region, commended for rapid growth without compromising quality.",
  },
];

export default function AwardsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section-padding bg-black-DEFAULT bg-noise relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-30" />
        <div className="container-luxury relative z-10 text-center">
          <p className="eyebrow mb-6">Recognition</p>
          <h1 className="heading-display text-gradient-gold mb-6">
            EXCELLENCE RECOGNIZED
          </h1>
          <p className="body-text max-w-2xl mx-auto">
            Our work speaks for itself — and the industry has taken notice.
            Telal Development has been honored with prestigious awards that
            reflect our unwavering commitment to luxury, innovation, and
            excellence.
          </p>
        </div>
      </section>

      {/* Awards Grid */}
      <section className="section-padding bg-black-deep">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {awards.map((award, index) => (
              <div
                key={`${award.year}-${award.name}`}
                className="relative bg-black-surface border border-black-border rounded-sm p-8 group hover:border-gold/30 transition-all duration-500"
              >
                {/* Gold accent line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                      {index < 4 ? (
                        <Trophy className="w-5 h-5 text-gold" />
                      ) : (
                        <Award className="w-5 h-5 text-gold" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-gold font-display text-lg font-medium">
                        {award.year}
                      </span>
                      <span className="w-8 h-[1px] bg-gold/30" />
                    </div>
                    <h3 className="font-display text-xl text-white mb-1">
                      {award.name}
                    </h3>
                    <p className="text-gold/70 text-sm font-medium mb-3">
                      {award.organization}
                    </p>
                    <p className="body-text text-sm leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="section-padding bg-black-DEFAULT">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-display text-4xl text-gradient-gold mb-2">
                10+
              </div>
              <p className="text-gray-mid text-sm uppercase tracking-wider">
                Industry Awards
              </p>
            </div>
            <div>
              <div className="font-display text-4xl text-gradient-gold mb-2">
                6
              </div>
              <p className="text-gray-mid text-sm uppercase tracking-wider">
                Years Recognized
              </p>
            </div>
            <div>
              <div className="font-display text-4xl text-gradient-gold mb-2">
                5
              </div>
              <p className="text-gray-mid text-sm uppercase tracking-wider">
                International Awards
              </p>
            </div>
            <div>
              <div className="font-display text-4xl text-gradient-gold mb-2">
                3
              </div>
              <p className="text-gray-mid text-sm uppercase tracking-wider">
                Sustainability Awards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-black-deep border-t border-black-border">
        <div className="container-luxury text-center">
          <h2 className="heading-section text-white mb-4">
            Experience Award-Winning Quality
          </h2>
          <p className="body-text max-w-xl mx-auto mb-8">
            See for yourself why Telal Development is the most recognized luxury
            developer in the Kingdom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects" className="btn-gold">
              View Our Projects
            </Link>
            <Link href="/contact" className="btn-ghost">
              Schedule a Visit
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
