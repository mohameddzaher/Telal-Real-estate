"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { useAuthStore } from "@/store/auth";
import { Eye, EyeOff, Loader2, Globe } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    clearError();
    const success = await login(data.email, data.password);
    if (success) {
      const user = useAuthStore.getState().user;
      if (user && ["SUPER_ADMIN", "ADMIN", "MANAGER", "AGENT"].includes(user.role)) {
        router.push("/admin");
      } else {
        router.push("/portal");
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-10">
        <Link href="/">
          <img src="/images/wide.png" alt="Telal Development" className="h-10 w-auto mx-auto" />
        </Link>
      </div>

      {/* Card */}
      <div className="bg-black-surface border border-black-border rounded-sm p-8">
        <h1 className="font-display text-2xl text-white text-center mb-1">Welcome Back</h1>
        <p className="text-gray-light text-sm text-center mb-8">
          Sign in to access your account
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-sm">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

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
            disabled={isLoading}
            className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-black-border" />
          <span className="text-xs text-gray-mid uppercase tracking-wider">or continue with</span>
          <div className="flex-1 h-px bg-black-border" />
        </div>

        {/* Google */}
        <button type="button" className="btn-ghost w-full gap-2">
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
