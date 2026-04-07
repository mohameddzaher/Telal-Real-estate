import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `Subscription Confirmed | ${SITE_CONFIG.name}`,
  description: "Your newsletter subscription has been confirmed.",
};

export default function NewsletterConfirmPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-black-surface border border-black-border rounded-sm p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-gold" />
        </div>

        <h1 className="font-display text-2xl md:text-3xl text-white mb-4">
          Subscription Confirmed!
        </h1>

        <p className="body-text mb-8">
          Thank you for subscribing to the Telal Development newsletter.
          You&apos;ll receive exclusive updates on new project launches,
          market insights, and VIP invitations directly to your inbox.
        </p>

        <Link href="/" className="btn-gold">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
