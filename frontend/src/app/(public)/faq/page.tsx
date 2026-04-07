import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { faqs } from "@/lib/data";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${SITE_CONFIG.name}`,
  description:
    "Find answers to common questions about buying property, financing, legal requirements, and more with Telal Development.",
};

function FAQJsonLd() {
  const published = faqs.filter((f) => f.isPublished);
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: published.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function FAQPage() {
  return (
    <main>
      <FAQJsonLd />

      {/* Hero */}
      <section className="section-padding bg-black-DEFAULT bg-noise relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-30" />
        <div className="container-luxury relative z-10 text-center">
          <p className="eyebrow mb-6">Support</p>
          <h1 className="heading-display text-gradient-gold mb-6">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="body-text max-w-2xl mx-auto">
            Everything you need to know about buying, investing, and partnering
            with Telal Development.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding bg-black-deep">
        <div className="container-luxury">
          <FAQClient />
        </div>
      </section>
    </main>
  );
}
