import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Telal Development",
    default: "Telal Development — Luxury Real Estate Saudi Arabia",
  },
  description:
    "Telal Development — Redefining Luxury Living. Premium residential and commercial real estate developments in Saudi Arabia. 47+ projects, SAR 2.8B+ portfolio.",
  keywords: [
    "luxury real estate",
    "Saudi Arabia property",
    "Riyadh real estate",
    "premium development",
    "off-plan properties",
    "تلال للتطوير العقاري",
    "عقارات فاخرة",
    "عقارات الرياض",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
    siteName: "Telal Development",
    title: "Telal Development — Luxury Real Estate Saudi Arabia",
    description:
      "Redefining Luxury Living. Premium residential and commercial real estate developments.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Telal Development" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Telal Development — Luxury Real Estate Saudi Arabia",
    description: "Redefining Luxury Living. Premium real estate developments.",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://telaldevelopment.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${notoArabic.variable}`}>
      <body className="bg-black text-white font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
