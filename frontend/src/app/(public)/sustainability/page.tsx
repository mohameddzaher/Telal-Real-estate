import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import {
  Leaf,
  Users,
  Scale,
  Lightbulb,
  Award,
  TrendingDown,
  Recycle,
  Building,
} from "lucide-react";

export const metadata: Metadata = {
  title: `Sustainability | ${SITE_CONFIG.name}`,
  description:
    "Telal Development's commitment to sustainable luxury — aligning with Saudi Vision 2030 through environmental, social, and governance excellence.",
};

const pillars = [
  {
    icon: Leaf,
    title: "Environmental",
    description:
      "We integrate green building practices into every project — from energy-efficient HVAC systems and solar panel integration to water recycling and sustainable material sourcing. Our goal is to minimize our environmental footprint while maximizing the quality of life for residents.",
  },
  {
    icon: Users,
    title: "Social",
    description:
      "We build communities, not just buildings. Our developments prioritize walkability, public spaces, and social connectivity. We invest in local workforce development, support Saudi talent through training programs, and contribute to community initiatives across the Kingdom.",
  },
  {
    icon: Scale,
    title: "Governance",
    description:
      "Transparency and accountability guide every decision. We maintain rigorous compliance with Saudi building regulations, international standards, and ethical business practices. Our governance framework ensures stakeholder trust and long-term value creation.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We leverage cutting-edge technology to drive sustainability — smart building management systems, IoT-enabled energy monitoring, AI-optimized climate control, and digital twin modeling that reduces waste during construction and optimizes operations.",
  },
];

const certifications = [
  { name: "LEED Gold", subtitle: "Leadership in Energy and Environmental Design" },
  { name: "ISO 14001", subtitle: "Environmental Management System" },
  { name: "ISO 9001", subtitle: "Quality Management System" },
  { name: "WELL Building", subtitle: "Health & Wellness Standard" },
  { name: "Mostadam", subtitle: "Saudi Green Building Rating" },
  { name: "ISO 45001", subtitle: "Occupational Health & Safety" },
];

const stats = [
  {
    icon: TrendingDown,
    value: "30%",
    label: "Energy Reduction",
    description: "Average energy consumption reduction across our latest developments compared to conventional buildings.",
  },
  {
    icon: Recycle,
    value: "100%",
    label: "Waste Diversion Target",
    description: "Our 2030 target for diverting construction waste from landfills through recycling and reuse programs.",
  },
  {
    icon: Building,
    value: "5",
    label: "LEED Projects",
    description: "Certified and in-progress LEED projects across our portfolio, with more planned for every new development.",
  },
];

export default function SustainabilityPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section-padding bg-black-DEFAULT bg-noise relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-30" />
        <div className="container-luxury relative z-10 text-center">
          <p className="eyebrow mb-6">Sustainability</p>
          <h1 className="heading-display text-gradient-gold mb-6">
            BUILDING A SUSTAINABLE FUTURE
          </h1>
          <p className="body-text max-w-2xl mx-auto">
            Luxury and sustainability are not opposing forces — they are the
            foundation of responsible development. Telal is committed to
            creating spaces that enrich lives while preserving the world we
            share.
          </p>
        </div>
      </section>

      {/* Vision 2030 Alignment */}
      <section className="section-padding bg-black-deep">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow mb-4">Vision 2030</p>
            <h2 className="heading-section text-white mb-6">
              Aligned With the Kingdom&apos;s Future
            </h2>
            <p className="body-text mb-4">
              Saudi Vision 2030 sets an ambitious agenda for economic
              diversification, environmental stewardship, and quality of life.
              At Telal Development, we see this not as a mandate but as a
              shared purpose. Every project we undertake contributes to the
              Kingdom&apos;s transformation — creating sustainable communities
              that attract global investment and talent.
            </p>
            <p className="body-text">
              Our commitment extends beyond compliance. We actively pursue
              innovation in green construction, smart city technologies, and
              community-centered design that aligns with Vision 2030&apos;s
              pillars of a vibrant society, a thriving economy, and an
              ambitious nation.
            </p>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="section-padding bg-black-DEFAULT">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Our Approach</p>
            <h2 className="heading-section text-white">
              Four Pillars of Sustainability
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="card-luxury p-8 group">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-white mb-3">
                        {pillar.title}
                      </h3>
                      <p className="body-text text-sm leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-black-deep">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Certifications</p>
            <h2 className="heading-section text-white">
              Recognized Standards
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="bg-black-surface border border-black-border rounded-sm p-5 text-center hover:border-gold/30 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-3">
                  <Award className="w-4 h-4 text-gold" />
                </div>
                <h4 className="text-white font-display text-sm font-medium mb-1">
                  {cert.name}
                </h4>
                <p className="text-gray-mid text-[10px] uppercase tracking-wider leading-tight">
                  {cert.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-black-DEFAULT">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center p-8 border border-black-border rounded-sm"
                >
                  <Icon className="w-8 h-8 text-gold mx-auto mb-4" />
                  <div className="font-display text-5xl text-gradient-gold mb-2">
                    {stat.value}
                  </div>
                  <h3 className="text-white font-display text-lg mb-2">
                    {stat.label}
                  </h3>
                  <p className="body-text text-sm">{stat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitment CTA */}
      <section className="section-padding bg-black-deep border-t border-black-border">
        <div className="container-luxury text-center">
          <h2 className="heading-section text-white mb-4">
            Our Commitment to Tomorrow
          </h2>
          <p className="body-text max-w-xl mx-auto mb-8">
            Sustainability is not a feature of our buildings — it is the
            foundation. Learn more about how Telal is shaping a greener,
            smarter future for the Kingdom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects" className="btn-gold">
              Explore Our Projects
            </Link>
            <Link href="/contact" className="btn-ghost">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
