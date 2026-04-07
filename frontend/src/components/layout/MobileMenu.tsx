"use client";

import Link from "next/link";
import { X, Camera, Briefcase, MessageSquare, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { useTranslation } from "@/hooks/useTranslation";
import { useAppStore } from "@/store";
import { localized } from "@/lib/translations";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t, locale } = useTranslation();
  const setLocale = useAppStore((s) => s.setLocale);

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 transition-all duration-700 ease-luxury lg:hidden",
        isOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      )}
    >
      {/* Background with noise texture */}
      <div className="absolute inset-0 bg-black-deep">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2 text-white/60 hover:text-gold transition-colors duration-300"
        aria-label="Close menu"
      >
        <X className="w-7 h-7" />
      </button>

      {/* Navigation content */}
      <div className="relative z-10 flex flex-col justify-between h-full px-8 pt-28 pb-12">
        {/* Nav Items */}
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "font-display text-2xl sm:text-3xl text-white/80 hover:text-gold py-3 transition-all duration-500 ease-luxury",
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              )}
              style={{
                transitionDelay: isOpen ? `${150 + index * 75}ms` : "0ms",
              }}
            >
              {localized(item.label, item.labelAr, locale)}
            </Link>
          ))}

          {/* Mobile-only CTA */}
          <Link
            href="/booking"
            onClick={onClose}
            className={cn(
              "inline-flex items-center justify-center mt-6 px-8 py-3.5 bg-gold/10 border border-gold/30 text-gold text-sm uppercase tracking-widest font-body hover:bg-gold hover:text-black-deep transition-all duration-500 ease-luxury",
              isOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            )}
            style={{
              transitionDelay: isOpen
                ? `${150 + NAV_ITEMS.length * 75}ms`
                : "0ms",
            }}
          >
            {t.common.bookMeeting}
          </Link>
        </nav>

        {/* Bottom section: social links */}
        <div
          className={cn(
            "flex items-center gap-6 transition-all duration-500 ease-luxury",
            isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
          style={{
            transitionDelay: isOpen ? "600ms" : "0ms",
          }}
        >
          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-gold transition-colors duration-300"
            aria-label="Instagram"
          >
            <Camera className="w-5 h-5" />
          </a>
          <a
            href={SITE_CONFIG.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-gold transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Briefcase className="w-5 h-5" />
          </a>
          <a
            href={SITE_CONFIG.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-gold transition-colors duration-300"
            aria-label="Twitter"
          >
            <MessageSquare className="w-5 h-5" />
          </a>
          <a
            href={SITE_CONFIG.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-gold transition-colors duration-300"
            aria-label="YouTube"
          >
            <Play className="w-5 h-5" />
          </a>

          {/* Language toggle */}
          <div className="ml-auto font-body text-xs uppercase tracking-widest flex items-center gap-1">
            <button
              type="button"
              onClick={() => { setLocale("en"); onClose(); }}
              className={cn(
                "transition-colors duration-300",
                locale === "en" ? "text-gold" : "text-white/40 hover:text-gold"
              )}
            >
              EN
            </button>
            <span className="text-white/30">/</span>
            <button
              type="button"
              onClick={() => { setLocale("ar"); onClose(); }}
              className={cn(
                "transition-colors duration-300",
                locale === "ar" ? "text-gold" : "text-white/40 hover:text-gold"
              )}
            >
              AR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
