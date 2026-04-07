import dynamic from "next/dynamic";
import type { Metadata } from "next";

// Dynamic imports for heavy client components
const Preloader = dynamic(() => import("@/components/animations/Preloader"), { ssr: false });
const GoldenCursor = dynamic(() => import("@/components/animations/GoldenCursor"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/animations/SmoothScroll"), { ssr: false });

// Section imports
import HeroSection from "@/components/sections/HeroSection";
import SignatureStatement from "@/components/sections/SignatureStatement";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import StatsSection from "@/components/sections/StatsSection";
import ProjectsShowcase from "@/components/sections/ProjectsShowcase";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyTelal from "@/components/sections/WhyTelal";
import LocationsMap from "@/components/sections/LocationsMap";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import InsightsPreview from "@/components/sections/InsightsPreview";
import NewsletterSection from "@/components/sections/NewsletterSection";
import AwardsSection from "@/components/sections/AwardsSection";
import FooterCTA from "@/components/sections/FooterCTA";

// Layout
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Telal Development — Luxury Real Estate Across the Middle East",
  description:
    "Where Vision Meets Legacy. Telal Development redefines luxury living with premium residential and commercial developments across the Middle East. 47+ projects, SAR 2.8B+ portfolio.",
  openGraph: {
    title: "Telal Development — Where Vision Meets Legacy",
    description:
      "Premium luxury real estate development across the Middle East. Residential, commercial, and mixed-use projects.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <Preloader />
      <GoldenCursor />
      <SmoothScroll>
        <Header />
        <main>
          <HeroSection />
          <SignatureStatement />
          <FeaturedProperties />
          <StatsSection />
          <ProjectsShowcase />
          <ServicesSection />
          <WhyTelal />
          <LocationsMap />
          <TestimonialsSection />
          <InsightsPreview />
          <NewsletterSection />
          <AwardsSection />
          <FooterCTA />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
