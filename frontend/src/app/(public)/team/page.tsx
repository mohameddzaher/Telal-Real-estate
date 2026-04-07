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

      {/* Team Grid */}
      <section className="section-padding bg-black-deep">
        <div className="container-luxury">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="card-luxury group">
                {/* Image placeholder */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img src={member.image || "/images/placeholder-team.jpg"} alt={member.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black-DEFAULT/80 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="font-display text-2xl text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gold text-sm uppercase tracking-wider mb-4">
                    {member.role}
                  </p>
                  <p className="body-text text-sm mb-4">
                    {truncate(member.bio, 160)}
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
