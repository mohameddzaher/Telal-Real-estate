import { type Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import BookingFlow from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: `Book a Meeting | ${SITE_CONFIG.name}`,
  description:
    "Schedule a private consultation with our luxury real estate team. Book a meeting room at Telal Development's exclusive offices.",
};

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-black-DEFAULT">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-black-deep">
        <div className="absolute inset-0 bg-radial-gold opacity-30" />
        <div className="absolute inset-0 grid-pattern" />
        <div className="container-luxury relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm font-body">
              <li>
                <Link
                  href="/"
                  className="text-gray-light hover:text-gold transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li className="text-gray-mid">/</li>
              <li className="text-gold">Book a Meeting</li>
            </ol>
          </nav>

          {/* Eyebrow */}
          <p className="eyebrow mb-4">Private Consultations</p>

          {/* Heading */}
          <h1 className="heading-display text-white mb-6">
            <span className="text-gradient-gold">BOOK A MEETING</span>
          </h1>

          {/* Subtitle */}
          <p className="body-text max-w-2xl">
            Schedule a private consultation with our luxury real estate
            specialists. Choose your preferred meeting room, date, and time to
            discuss your next investment or property acquisition.
          </p>
        </div>
      </section>

      {/* Booking Flow */}
      <section className="section-padding">
        <div className="container-luxury">
          <BookingFlow />
        </div>
      </section>
    </main>
  );
}
