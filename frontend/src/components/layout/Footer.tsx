"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Briefcase,
  ExternalLink,
  Hash,
  MessageCircle,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { useTranslation } from "@/hooks/useTranslation";
import { localized } from "@/lib/translations";
import BackToTop from "./BackToTop";

export default function Footer() {
  const { t, locale } = useTranslation();

  const quickLinks = [
    { label: t.footer.about, href: "/about" },
    { label: t.footer.team, href: "/team" },
    { label: t.footer.services, href: "/services" },
    { label: t.footer.career, href: "/career" },
    { label: t.footer.faq, href: "/faq" },
  ];

  const propertyLinks = [
    { label: t.footer.residential, href: "/properties?type=residential" },
    { label: t.footer.commercial, href: "/properties?type=commercial" },
    { label: t.footer.offPlan, href: "/properties?type=off-plan" },
    { label: t.footer.projects, href: "/projects" },
  ];

  return (
    <footer className="relative bg-[#050505] border-t border-gold/10">
      {/* Main footer content */}
      <div className="mx-auto max-w-content px-gutter py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <img src="/images/wide.png" alt="Telal Development" className="h-8 w-auto" />
            </Link>
            <p className="mt-4 font-body text-sm text-white/40 leading-relaxed">
              {localized(SITE_CONFIG.tagline, SITE_CONFIG.taglineAr, locale)}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-gold transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Briefcase className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-gold transition-colors duration-300"
                aria-label="Twitter"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-gold transition-colors duration-300"
                aria-label="YouTube"
              >
                <Hash className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display text-md text-gold/80 uppercase tracking-widest mb-6">
              {t.footer.quickLinks}
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white/40 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Properties */}
          <div>
            <h4 className="font-display text-md text-gold/80 uppercase tracking-widest mb-6">
              {t.footer.properties}
            </h4>
            <ul className="flex flex-col gap-3">
              {propertyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white/40 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-display text-md text-gold/80 uppercase tracking-widest mb-6">
              {t.footer.contact}
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold/60 mt-0.5 shrink-0" />
                <span className="font-body text-sm text-white/40 leading-relaxed">
                  {localized(SITE_CONFIG.address, SITE_CONFIG.addressAr, locale)}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 font-body text-sm text-white/40 hover:text-gold transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 text-gold/60 shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 font-body text-sm text-white/40 hover:text-gold transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 text-gold/60 shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: WhatsApp CTA */}
          <div>
            <h4 className="font-display text-md text-gold/80 uppercase tracking-widest mb-6">
              {t.footer.getInTouch}
            </h4>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-gold/10 border border-gold/30 text-gold text-xs uppercase tracking-widest font-body hover:bg-gold hover:text-black-deep transition-all duration-500 ease-luxury w-full justify-center"
            >
              <MessageCircle className="w-4 h-4" />
              {t.footer.whatsappUs}
            </a>
            <p className="mt-4 font-body text-xs text-white/30 leading-relaxed">
              {localized(SITE_CONFIG.officeHours, SITE_CONFIG.officeHoursAr, locale)}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-content px-gutter py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/25">
            &copy; 2026 {SITE_CONFIG.name}. {t.footer.allRights}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-body text-xs text-white/25 hover:text-gold/60 transition-colors duration-300"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="/terms"
              className="font-body text-xs text-white/25 hover:text-gold/60 transition-colors duration-300"
            >
              {t.footer.terms}
            </Link>
            <Link
              href="/sitemap"
              className="font-body text-xs text-white/25 hover:text-gold/60 transition-colors duration-300"
            >
              {t.footer.sitemap}
            </Link>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <BackToTop />
    </footer>
  );
}
