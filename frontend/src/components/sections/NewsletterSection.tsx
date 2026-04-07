"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Check, AlertCircle } from "lucide-react";
import { apiPost } from "@/lib/api";
import { useTranslation } from "@/hooks/useTranslation";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;

    setLoading(true);
    setError(null);
    try {
      const res = await apiPost("/api/newsletter", { email, consent: true });
      if (res.status === 201 || res.ok) {
        setSuccess(true);
        setEmail("");
        setConsent(false);
      } else if (res.status === 409) {
        setError("Already subscribed");
      } else {
        const body = await res.json().catch(() => ({}));
        setError(body.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
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
            {t.sections.stayAhead}
          </h2>
          <p className="body-text mb-10 max-w-lg mx-auto">
            {t.sections.newsletterBody}
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
              {t.sections.newsletterSuccess}
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
                placeholder={t.enterEmail}
                required
                className="input-luxury flex-1"
              />
              <button
                type="submit"
                disabled={loading || !consent}
                className="btn-gold whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? t.common.subscribing : t.common.subscribe}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-error/10 border border-error/30 rounded-sm">
                <AlertCircle className="w-4 h-4 text-error flex-shrink-0" />
                <p className="text-sm text-error">{error}</p>
              </div>
            )}

            <label className="flex items-start gap-3 text-left cursor-pointer group">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-gold bg-black-deep border-black-border rounded-sm"
              />
              <span className="text-xs text-gray-mid font-body leading-relaxed">
                {t.sections.newsletterConsent}
              </span>
            </label>
          </motion.form>
        )}
      </div>
    </section>
  );
}
