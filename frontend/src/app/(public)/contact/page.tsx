import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: `Contact Us | ${SITE_CONFIG.name}`,
  description:
    "Get in touch with Telal Development. Reach our team for property inquiries, investment opportunities, partnerships, or general questions.",
};

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section-padding bg-black-DEFAULT bg-noise relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-30" />
        <div className="container-luxury relative z-10 text-center">
          <p className="eyebrow mb-6">Get in Touch</p>
          <h1 className="heading-display text-gradient-gold mb-6">
            CONTACT US
          </h1>
          <p className="body-text max-w-2xl mx-auto">
            Our team is ready to assist you with any inquiry. Reach out and
            let us help you find your perfect space.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-padding bg-black-deep">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.55fr] gap-12 lg:gap-16">
            {/* Form */}
            <div className="card-luxury p-8 md:p-10">
              <h2 className="font-display text-2xl text-white mb-2">
                Send Us a Message
              </h2>
              <p className="body-text text-sm mb-8">
                Fill out the form below and we will respond within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* Info Panel */}
            <div className="space-y-8">
              {/* Office Address */}
              <div className="card-luxury p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-white mb-1">
                      Office Address
                    </h3>
                    <p className="body-text text-sm">{SITE_CONFIG.address}</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="card-luxury p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-white mb-1">
                      Phone
                    </h3>
                    <a
                      href={`tel:${SITE_CONFIG.phone}`}
                      className="body-text text-sm hover:text-gold transition-colors"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="card-luxury p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-white mb-1">
                      Email
                    </h3>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="body-text text-sm hover:text-gold transition-colors"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="card-luxury p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-white mb-1">
                      Office Hours
                    </h3>
                    <p className="body-text text-sm">
                      {SITE_CONFIG.officeHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card-luxury p-6 flex items-center gap-4 group hover:border-green-600/40 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-sm bg-green-600/10 flex items-center justify-center shrink-0 group-hover:bg-green-600/20 transition-colors duration-300">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-white mb-0.5">
                    WhatsApp
                  </h3>
                  <p className="text-sm text-gray-light">
                    Chat with us directly
                  </p>
                </div>
              </a>

              {/* Map Placeholder */}
              <div className="aspect-[4/3] rounded-sm bg-black-surface border border-black-border flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gold/40 mx-auto mb-2" />
                  <p className="text-sm text-gray-mid">
                    Interactive Map
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
