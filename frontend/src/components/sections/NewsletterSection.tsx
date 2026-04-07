"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Check } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEmail("");
      setConsent(false);
    }, 1500);
  };

  return (
    <section className="relative section-padding bg-black overflow-hidden">
      {/* Radial gold glow */}
      <div className="absolute inset-0 bg-radial-gold opacity-40" />

      <div className="relative z-10 container-luxury max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <Mail className="w-8 h-8 text-gold mx-auto mb-6" />
          <h2 className="heading-section text-white mb-4">
            Stay Ahead of the Market
          </h2>
          <p className="body-text mb-10 max-w-lg mx-auto">
            Receive exclusive market insights, early access to new launches, and
            curated investment opportunities delivered to your inbox.
          </p>
        </motion.div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-success/10 border border-success/30">
              <Check className="w-6 h-6 text-success" />
            </span>
            <p className="text-white font-body text-base">
              Welcome to the Telal circle. Check your inbox to confirm.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="input-luxury flex-1"
              />
              <button
                type="submit"
                disabled={loading || !consent}
                className="btn-gold whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>

            <label className="flex items-start gap-3 text-left cursor-pointer group">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-gold bg-black-deep border-black-border rounded-sm"
              />
              <span className="text-xs text-gray-mid font-body leading-relaxed">
                I agree to receive marketing communications from Telal
                Development. You can unsubscribe at any time.
              </span>
            </label>
          </motion.form>
        )}
      </div>
    </section>
  );
}
