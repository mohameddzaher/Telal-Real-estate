"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { useTranslation } from "@/hooks/useTranslation";
import { useAppStore } from "@/store";
import { useAuthStore } from "@/store/auth";
import { localized } from "@/lib/translations";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale } = useTranslation();
  const setLocale = useAppStore((s) => s.setLocale);
  const { user, token } = useAuthStore();

  const isLoggedIn = !!token && !!user;
  const isAdmin = isLoggedIn && ["SUPER_ADMIN", "ADMIN", "MANAGER", "AGENT"].includes(user!.role);
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "?";
  const dashboardHref = isAdmin ? "/admin" : "/portal";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-luxury",
          isScrolled
            ? "bg-black-deep/80 backdrop-blur-xl border-b border-gold/10"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-content px-gutter">
          <nav className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <span className="font-display text-xl tracking-[0.3em] uppercase"><span className="text-gold">T</span><span className="text-white">ELAL</span></span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8 xl:gap-10">
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className="relative font-body text-sm uppercase tracking-widest text-white/70 hover:text-gold transition-colors duration-300 py-2"
                  >
                    {localized(item.label, item.labelAr, locale)}
                    {/* Gold underline animation */}
                    <span className="absolute bottom-0 left-0 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-luxury origin-left" />
                  </Link>

                  {/* Dropdown for items with children */}
                  {item.children && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="bg-black-deep/95 backdrop-blur-xl border border-gold/10 rounded-sm py-3 min-w-[200px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-2.5 text-sm font-body text-white/60 hover:text-gold hover:bg-gold/5 transition-all duration-200"
                          >
                            {localized(child.label, child.labelAr, locale)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Right side actions */}
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Language Toggle */}
              <div className="hidden md:flex items-center gap-1.5 font-body text-xs uppercase tracking-widest">
                <button
                  onClick={() => setLocale("en")}
                  className={cn(
                    "transition-colors duration-300",
                    locale === "en" ? "text-gold" : "text-white/50 hover:text-gold"
                  )}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <span className="text-white/30">/</span>
                <button
                  onClick={() => setLocale("ar")}
                  className={cn(
                    "transition-colors duration-300",
                    locale === "ar" ? "text-gold" : "text-white/50 hover:text-gold"
                  )}
                  aria-label="Switch to Arabic"
                >
                  AR
                </button>
              </div>

              {/* Book a Meeting */}
              <Link href="/booking" className="btn-gold text-xs hidden md:inline-flex">
                {locale === "ar" ? "احجز اجتماع" : "Book a Meeting"}
              </Link>

              {/* Auth-aware CTA */}
              {isLoggedIn ? (
                <Link
                  href={dashboardHref}
                  className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-gold/10 border border-gold/30 text-gold text-xs uppercase tracking-widest font-body hover:bg-gold hover:text-black-deep transition-all duration-500 ease-luxury"
                >
                  <span className="w-6 h-6 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-[10px] font-semibold">
                    {userInitial}
                  </span>
                  {isAdmin ? "Admin Panel" : "My Portal"}
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-gold/10 border border-gold/30 text-gold text-xs uppercase tracking-widest font-body hover:bg-gold hover:text-black-deep transition-all duration-500 ease-luxury"
                >
                  <User className="w-3.5 h-3.5" />
                  Login
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative z-10 p-2 text-white/80 hover:text-gold transition-colors duration-300"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
