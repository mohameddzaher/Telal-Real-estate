"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store";
import type { Locale } from "@/lib/translations";

/**
 * Reads persisted locale from localStorage on mount,
 * and keeps document.dir / document.lang in sync with store changes.
 */
export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useAppStore((s) => s.locale);
  const setLocale = useAppStore((s) => s.setLocale);

  // On mount: restore from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("telal-locale") as Locale | null;
    if (stored === "ar" || stored === "en") {
      setLocale(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep document attributes in sync whenever locale changes
  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    localStorage.setItem("telal-locale", locale);
  }, [locale]);

  return <>{children}</>;
}
