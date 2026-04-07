"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

// Real SVG social media icons
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XTwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}
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
              <span className="font-display text-xl text-gold tracking-[0.3em] uppercase">TELAL</span>
            </Link>
            <p className="mt-4 font-body text-sm text-white/40 leading-relaxed">
              {locale === "ar"
                ? "نبني الفخامة. نصنع الإرث. نشكّل المستقبل."
                : "Building Luxury. Crafting Legacies. Shaping the Future."}
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
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-gold transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-gold transition-colors duration-300"
                aria-label="X (Twitter)"
              >
                <XTwitterIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-gold transition-colors duration-300"
                aria-label="YouTube"
              >
                <YouTubeIcon className="w-4 h-4" />
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
