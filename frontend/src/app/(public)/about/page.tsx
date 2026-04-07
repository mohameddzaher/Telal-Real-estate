import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, STATS } from "@/lib/constants";
import { Shield, Lightbulb, Award, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: `About ${SITE_CONFIG.name}`,
  description:
    "Discover the story behind Telal Development — redefining luxury real estate in Saudi Arabia since 2008.",
};

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We operate with unwavering honesty and transparency in every transaction, building trust that lasts generations.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We embrace cutting-edge technology and forward-thinking design to create spaces that anticipate tomorrow's needs.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We pursue perfection in every detail, from architectural vision to the finest material selections and finishing standards.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "We are committed to responsible development that respects the environment and enriches communities for future generations.",
  },
];

const milestones = [
  {
    year: "2008",
    title: "Founded",
    description:
      "Telal Development was established in Riyadh with a bold vision to redefine luxury real estate in the Kingdom.",
  },
  {
    year: "2012",
    title: "First Mega Project",
    description:
      "Launched our first large-scale residential tower, setting new benchmarks for quality and design in Saudi Arabia.",
  },
  {
    year: "2016",
    title: "500th Unit Delivered",
    description:
      "Reached a landmark milestone of 500 residential and commercial units delivered to satisfied clients across the Kingdom.",
  },
  {
    year: "2020",
    title: "Regional Expansion",
    description:
      "Expanded operations to Jeddah and the Eastern Province, bringing Telal's signature luxury to new markets.",
  },
  {
    year: "2024",
    title: "Future Vision",
    description:
      "Embarked on our most ambitious chapter yet — aligning with Vision 2030 to shape the future of Saudi real estate.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section-padding bg-black-DEFAULT bg-noise relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-30" />
        <div className="container-luxury relative z-10 text-center">
          <p className="eyebrow mb-6">About Us</p>
          <h1 className="heading-display text-gradient-gold mb-6">
            WHERE VISION MEETS LEGACY
          </h1>
          <p className="body-text max-w-2xl mx-auto">
            Since 2008, Telal Development has been crafting extraordinary living
            and working spaces that honour Saudi Arabia&apos;s rich heritage
            while embracing a bold future.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-black-deep">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="eyebrow mb-4">Our Story</p>
              <h2 className="heading-section text-white mb-8">
                Building the Kingdom&apos;s Future, One Landmark at a Time
              </h2>
              <div className="space-y-6 body-text">
                <p>
                  Founded in 2008 by Sultan Al-Rashid, Telal Development was
                  born from a singular conviction: that Saudi Arabia deserves
                  real estate of the highest international calibre, rooted in
                  the culture and aspirations of its people.
                </p>
                <p>
                  From our first residential tower in Riyadh&apos;s Olaya
                  District, we have grown into one of the Kingdom&apos;s most
                  respected development firms, with a portfolio spanning luxury
                  residences, Grade A commercial spaces, mixed-use communities,
                  and hospitality destinations.
                </p>
                <p>
                  Our mission is simple yet profound: to create spaces that
                  elevate lives. Every project we undertake reflects a deep
                  commitment to architectural excellence, sustainable practices,
                  and an uncompromising standard of quality that our clients have
                  come to expect.
                </p>
                <p>
                  Today, with over SAR 2.8 billion in portfolio value and 47
                  completed projects, Telal stands at the forefront of Saudi
                  Arabia&apos;s real estate transformation — aligned with Vision
                  2030 and driven by a passion for building legacies that
                  endure.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-sm bg-gradient-to-br from-gold/20 via-black-surface to-gold/5 border border-black-border" />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gradient-to-br from-gold/30 to-transparent rounded-sm blur-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-black-DEFAULT border-y border-black-border">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-4xl md:text-display text-gradient-gold font-light">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="body-text mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-black-deep">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Our Principles</p>
            <h2 className="heading-section text-white">
              Core Values That Guide Us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="card-luxury p-8 group"
                >
                  <div className="w-12 h-12 rounded-sm bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-display text-2xl text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="body-text">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-black-DEFAULT">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Our Journey</p>
            <h2 className="heading-section text-white">Key Milestones</h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gold/20" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                      index % 2 === 0
                        ? "md:text-right md:pr-8"
                        : "md:text-left md:pl-8"
                    }`}
                  >
                    <p className="text-gold font-display text-3xl mb-2">
                      {milestone.year}
                    </p>
                    <h3 className="font-display text-xl text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="body-text">{milestone.description}</p>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold border-2 border-black-DEFAULT z-10" />

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-black-deep border-t border-black-border">
        <div className="container-luxury text-center">
          <h2 className="heading-section text-white mb-4">
            Join Our Journey
          </h2>
          <p className="body-text max-w-xl mx-auto mb-8">
            Whether you are seeking a rewarding career or a partnership
            opportunity, we would love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/career" className="btn-gold">
              Explore Careers
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
