import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { teamMembers } from "@/lib/data";
import { truncate } from "@/lib/utils";
import { Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: `Our Leadership | ${SITE_CONFIG.name}`,
  description:
    "Meet the visionary leaders driving Telal Development — the minds shaping the Middle East's luxury real estate landscape.",
};

export default function TeamPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section-padding bg-black-DEFAULT bg-noise relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-30" />
        <div className="container-luxury relative z-10 text-center">
          <p className="eyebrow mb-6">Leadership</p>
          <h1 className="heading-display text-gradient-gold mb-6">
            THE MINDS BEHIND TELAL
          </h1>
          <p className="body-text max-w-2xl mx-auto">
            A world-class team of visionaries, architects, and strategists
            committed to redefining luxury living in the Kingdom.
          </p>
        </div>
      </section>

      {/* Chairman Featured */}
      <section className="section-padding bg-black-deep">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex flex-col md:flex-row gap-12 items-center">
                {/* Photo */}
                <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-sm overflow-hidden border border-gold/20 shrink-0">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <p className="eyebrow mb-3">{member.role}</p>
                  <h2 className="font-display text-3xl md:text-4xl text-white mb-2">
                    {member.name}
                  </h2>
                  <p className="font-display text-lg text-gold/60 mb-6">
                    {member.nameAr}
                  </p>
                  <p className="body-text leading-relaxed mb-6">
                    {member.bio}
                  </p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gray-light hover:text-gold transition-colors duration-300"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <Briefcase className="w-5 h-5" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="section-padding bg-black-DEFAULT border-t border-black-border">
        <div className="container-luxury text-center">
          <p className="eyebrow mb-4">Careers</p>
          <h2 className="heading-section text-white mb-4">Join Our Team</h2>
          <p className="body-text max-w-xl mx-auto mb-8">
            We are always looking for exceptional talent to join our mission.
            Explore current openings and become part of the Telal legacy.
          </p>
          <Link href="/career" className="btn-gold">
            View Open Positions
          </Link>
        </div>
      </section>
    </main>
  );
}
