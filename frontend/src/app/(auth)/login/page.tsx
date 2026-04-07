"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { Eye, EyeOff, Loader2, Globe } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (_data: LoginFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-black-surface border border-black-border rounded-sm p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-2xl text-white mb-2">Welcome Back</h2>
          <p className="text-gray-light text-sm">Redirecting you to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-10">
        <Link href="/">
          <span className="font-display text-3xl text-gold tracking-[0.3em]">TELAL</span>
        </Link>
      </div>

      {/* Card */}
      <div className="bg-black-surface border border-black-border rounded-sm p-8">
        <h1 className="font-display text-2xl text-white text-center mb-1">Welcome Back</h1>
        <p className="text-gray-light text-sm text-center mb-8">
          Sign in to access your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
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

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-xs uppercase tracking-wider text-gray-light">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-gold hover:text-gold-light transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="input-luxury pr-10"
                placeholder="Enter your password"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-mid hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-error text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-black-border" />
          <span className="text-xs text-gray-mid uppercase tracking-wider">or continue with</span>
          <div className="flex-1 h-px bg-black-border" />
        </div>

        {/* Google */}
        <button className="btn-ghost w-full gap-2">
          <Globe className="w-4 h-4" />
          Google
        </button>

        {/* Register link */}
        <p className="text-center text-sm text-gray-light mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-gold hover:text-gold-light transition-colors">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
