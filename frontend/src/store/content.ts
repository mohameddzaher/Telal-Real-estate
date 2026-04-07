"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HomepageContent {
  heroTitle: string;
  heroTitleAr: string;
  heroSubtitle: string;
  heroSubtitleAr: string;
  signatureQuote: string;
  signatureQuoteAr: string;
  statProjects: number;
  statUnits: number;
  statPortfolio: number;
  statYears: number;
  ctaTitle: string;
  ctaTitleAr: string;
  ctaDescription: string;
  ctaDescriptionAr: string;
}

interface ContentState {
  homepage: HomepageContent;
  updateHomepage: (data: Partial<HomepageContent>) => void;
  resetHomepage: () => void;
}

const defaultContent: HomepageContent = {
  heroTitle: "WHERE VISION MEETS LEGACY",
  heroTitleAr: "حيث تلتقي الرؤية بالإرث",
  heroSubtitle: "Telal Development — Redefining Luxury Living across the Middle East. Premium residential and commercial real estate developments.",
  heroSubtitleAr: "تلال للتطوير العقاري — إعادة تعريف العيش الفاخر في الشرق الأوسط",
  signatureQuote: "For over sixteen years, Telal Development has been crafting spaces where ambition finds its address and vision finds its home. We don't build properties — we build legacies.",
  signatureQuoteAr: "على مدار أكثر من ستة عشر عامًا، كانت تلال للتطوير تصنع مساحات حيث يجد الطموح عنوانه وتجد الرؤية موطنها. نحن لا نبني عقارات — نحن نبني إرثًا.",
  statProjects: 47,
  statUnits: 1200,
  statPortfolio: 2.8,
  statYears: 16,
  ctaTitle: "Ready to Find Your Legacy?",
  ctaTitleAr: "مستعد لإيجاد إرثك؟",
  ctaDescription: "Whether you are looking for a forever home, a strategic investment, or a landmark commercial space, our team is ready to guide you through every step.",
  ctaDescriptionAr: "سواء كنت تبحث عن منزل دائم، أو استثمار استراتيجي، أو مساحة تجارية بارزة، فإن فريقنا جاهز لإرشادك في كل خطوة.",
};

export const useContentStore = create<ContentState>()(
  persist(
    (set) => ({
      homepage: defaultContent,
      updateHomepage: (data) =>
        set((state) => ({
          homepage: { ...state.homepage, ...data },
        })),
      resetHomepage: () => set({ homepage: defaultContent }),
    }),
    { name: "telal-content" }
  )
);

export { defaultContent };
export type { HomepageContent };
