import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication — Telal Development",
  description: "Sign in or create your Telal Development account.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Subtle radial gold gradient background */}
      <div className="absolute inset-0 bg-radial-gold opacity-40" />
      <div className="absolute inset-0 bg-noise" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center px-4 py-12">
        {children}
      </div>
    </div>
  );
}
