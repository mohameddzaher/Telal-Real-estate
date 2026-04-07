"use client";

import { useAppStore } from "@/store";
import { translations } from "@/lib/translations";

export function useTranslation() {
  const locale = useAppStore((s) => s.locale);
  const t = translations[locale];
  const isRTL = locale === "ar";
  return { t, locale, isRTL };
}
