"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Mail, ArrowLeft } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://telal-bakend.onrender.com";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      const json = await res.json();
      if (!res.ok && json.message) {
        // Even on error, show success to avoid email enumeration
      }
    } catch {
      // Silently handle - show success regardless to avoid email enumeration
    }
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-10">
        <Link href="/">
          <span className="font-display text-3xl tracking-[0.3em] uppercase"><span className="text-gold">T</span><span className="text-white">ELAL</span></span>
        </Link>
      </div>

      {/* Card */}
      <div className="bg-black-surface border border-black-border rounded-sm p-8">
        {submitted ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-gold" />
            </div>
            <h2 className="font-display text-2xl text-white mb-2">Check Your Email</h2>
            <p className="text-gray-light text-sm mb-6 leading-relaxed">
              We&apos;ve sent a password reset link to your email address.
              Please check your inbox and follow the instructions.
            </p>
            <Link href="/login" className="btn-ghost w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-display text-2xl text-white text-center mb-1">
              Reset Your Password
            </h1>
            <p className="text-gray-light text-sm text-center mb-8 leading-relaxed">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>

            {error && (
              <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-sm">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gray-light mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="input-luxury"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-error text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-sm text-gray-light hover:text-gold transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-3 h-3" />
                Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
