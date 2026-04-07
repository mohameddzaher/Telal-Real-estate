import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import {
  Banknote,
  HeartPulse,
  GraduationCap,
  Clock,
  Building2,
  Users,
  ArrowRight,
  MapPin,
  Briefcase,
} from "lucide-react";

export const metadata: Metadata = {
  title: `Careers at ${SITE_CONFIG.name}`,
  description:
    "Join Telal Development and build your career with one of Saudi Arabia's leading luxury real estate developers. Explore open positions.",
};

const benefits = [
  {
    icon: Banknote,
    title: "Competitive Salary",
    description:
      "Industry-leading compensation packages with performance bonuses and annual increments that reflect your contribution.",
  },
  {
    icon: HeartPulse,
    title: "Health Insurance",
    description:
      "Comprehensive medical, dental, and vision coverage for you and your family through premium healthcare providers.",
  },
  {
    icon: GraduationCap,
    title: "Professional Development",
    description:
      "Sponsored certifications, conference attendance, and access to leading industry training programs to advance your career.",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description:
      "Work-life balance matters. Enjoy flexible scheduling, remote work options, and generous annual leave allowances.",
  },
  {
    icon: Building2,
    title: "Modern Office",
    description:
      "Work from our state-of-the-art headquarters on King Fahd Road, featuring collaborative spaces, a wellness room, and premium amenities.",
  },
  {
    icon: Users,
    title: "Team Events",
    description:
      "Regular team-building activities, company retreats, and social events that strengthen our culture of collaboration and excellence.",
  },
];

const openPositions = [
  {
    id: "pos-1",
    title: "Senior Architect",
    department: "Design & Architecture",
    location: "Riyadh",
    type: "Full-time",
    description:
      "Lead the architectural vision for landmark luxury developments. 8+ years experience in high-end residential or commercial architecture required.",
  },
  {
    id: "pos-2",
    title: "Sales Manager",
    department: "Sales & Marketing",
    location: "Jeddah",
    type: "Full-time",
    description:
      "Drive luxury property sales across the Western Region. Proven track record in high-value real estate transactions and client relationship management.",
  },
  {
    id: "pos-3",
    title: "Marketing Specialist",
    department: "Sales & Marketing",
    location: "Riyadh",
    type: "Full-time",
    description:
      "Craft compelling brand narratives and digital campaigns for ultra-luxury developments. Experience in luxury branding and real estate marketing preferred.",
  },
  {
    id: "pos-4",
    title: "Project Engineer",
    department: "Construction & Delivery",
    location: "Riyadh",
    type: "Full-time",
    description:
      "Oversee construction quality and progress on multi-million SAR developments. Civil engineering degree and 5+ years of site experience required.",
  },
];

export default function CareerPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section-padding bg-black-DEFAULT bg-noise relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-30" />
        <div className="container-luxury relative z-10 text-center">
          <p className="eyebrow mb-6">Careers</p>
          <h1 className="heading-display text-gradient-gold mb-6">
            BUILD YOUR CAREER WITH US
          </h1>
          <p className="body-text max-w-2xl mx-auto">
            Join a team of visionaries, architects, and innovators shaping the
            future of luxury living in the Kingdom. At Telal, every role
            contributes to creating spaces that inspire.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-black-deep">
        <div className="container-luxury max-w-3xl text-center">
          <h2 className="heading-section text-white mb-6">
            Why Telal Development?
          </h2>
          <p className="body-text mb-4">
            Telal Development is more than a real estate company — we are
            building the landmarks of tomorrow. With over 16 years of
            excellence and a portfolio valued at SAR 2.8B+, we offer our
            team members the opportunity to work on some of the most
            prestigious developments in Saudi Arabia and beyond.
          </p>
          <p className="body-text">
            We foster a culture of innovation, integrity, and professional
            growth. Whether you are an experienced architect, a passionate
            marketer, or a skilled engineer, there is a place for your
            talent at Telal.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section-padding bg-black-DEFAULT">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Benefits</p>
            <h2 className="heading-section text-white">
              What We Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="card-luxury p-8 text-center group"
                >
                  <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-display text-xl text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="body-text text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding bg-black-deep">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Open Positions</p>
            <h2 className="heading-section text-white">
              Current Opportunities
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {openPositions.map((position) => (
              <div
                key={position.id}
                className="card-luxury p-6 md:p-8 group hover:border-gold/30 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-display text-xl text-white mb-1">
                      {position.title}
                    </h3>
                    <p className="text-gold text-sm font-medium">
                      {position.department}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-mid">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {position.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      {position.type}
                    </span>
                  </div>
                </div>
                <p className="body-text text-sm mb-6">
                  {position.description}
                </p>
                <Link
                  href={`/career/${position.id}`}
                  className="btn-ghost text-xs px-6 py-2"
                >
                  Apply Now
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Application CTA */}
      <section className="section-padding bg-black-DEFAULT border-t border-black-border">
        <div className="container-luxury text-center">
          <h2 className="heading-section text-white mb-4">
            Don&apos;t See Your Role?
          </h2>
          <p className="body-text max-w-xl mx-auto mb-8">
            We are always looking for exceptional talent. Send us your CV and
            we will keep you in mind for future opportunities that match your
            expertise.
          </p>
          <Link
            href={`mailto:careers@telaldevelopment.com?subject=General Application`}
            className="btn-gold"
          >
            Submit General Application
          </Link>
        </div>
      </section>
    </main>
  );
}
