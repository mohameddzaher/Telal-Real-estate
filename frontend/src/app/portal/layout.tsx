"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import {
  LayoutDashboard,
  Building,
  Calendar,
  FileText,
  CreditCard,
  MessageSquare,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/portal", icon: LayoutDashboard },
  { label: "My Properties", href: "/portal/properties", icon: Building },
  { label: "Bookings", href: "/portal/bookings", icon: Calendar },
  { label: "Documents", href: "/portal/documents", icon: FileText },
  { label: "Payments", href: "/portal/payments", icon: CreditCard },
  { label: "Messages", href: "/portal/messages", icon: MessageSquare },
];

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, token, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (href === "/portal") return pathname === "/portal";
    return pathname.startsWith(href);
  };

  if (!mounted) return null;

  if (!token || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl text-white mb-2">Authentication Required</h2>
          <p className="text-gray-light text-sm mb-6">Please sign in to access your portal.</p>
          <Link href="/login" className="btn-gold">Sign In</Link>
        </div>
      </div>
    );
  }

  const displayName = user.name || "User";

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="h-16 bg-[#090909] border-b border-black-border flex items-center px-6 sticky top-0 z-50">
        <Link href="/portal">
          <span className="font-display text-lg text-gold tracking-[0.3em] uppercase">TELAL</span>
        </Link>
        <span className="text-xs text-gray-mid uppercase tracking-wider ml-4 border-l border-black-border pl-4">
          My Portal
        </span>
        <div className="flex-1" />
        <span className="text-sm text-gray-light mr-4 hidden sm:inline">
          {displayName}
        </span>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-2 text-sm text-gray-light hover:text-white transition-colors"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </header>

      {/* Navigation tabs */}
      <nav className="bg-[#090909] border-b border-black-border overflow-x-auto">
        <div className="flex px-6">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm border-b-2 -mb-px transition-colors whitespace-nowrap",
                  active
                    ? "text-gold border-gold"
                    : "text-gray-light border-transparent hover:text-white"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Content */}
      <main className="p-6 max-w-content mx-auto">{children}</main>
    </div>
  );
}
