"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { useAuthStore } from "@/store/auth";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    if (!agreed) return;
    clearError();
    const success = await registerUser({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });
    if (success) {
      router.push("/portal");
    }
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
        <h1 className="font-display text-2xl text-white text-center mb-1">Create Your Account</h1>
        <p className="text-gray-light text-sm text-center mb-8">
          Join Telal Development&apos;s exclusive client portal
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-sm">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-wider text-gray-light mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="input-luxury"
              placeholder="Ahmed Al-Rashid"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-error text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

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

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-gray-light mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              className="input-luxury"
              placeholder="+966 5XX XXX XXXX"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-error text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-xs uppercase tracking-wider text-gray-light mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="input-luxury pr-10"
                placeholder="Min. 8 characters"
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

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-xs uppercase tracking-wider text-gray-light mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="input-luxury pr-10"
                placeholder="Re-enter your password"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-mid hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-error text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 rounded-sm border-black-border bg-black-deep accent-gold"
            />
            <label htmlFor="terms" className="text-xs text-gray-light leading-relaxed">
              I agree to the{" "}
              <Link href="/terms" className="text-gold hover:text-gold-light transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-gold hover:text-gold-light transition-colors">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || !agreed}
            className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm text-gray-light mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-gold hover:text-gold-light transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
