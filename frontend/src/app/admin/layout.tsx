"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import {
  LayoutDashboard,
  Building,
  FolderKanban,
  Calendar,
  Users,
  Target,
  UserCog,
  FileText,
  Mail,
  BarChart3,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Properties", href: "/admin/properties", icon: Building },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Bookings", href: "/admin/bookings", icon: Calendar },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Leads", href: "/admin/leads", icon: Target },
  { label: "Agents", href: "/admin/agents", icon: UserCog },
  { label: "Content", href: "/admin/content", icon: FileText },
  { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN", "MANAGER", "AGENT"];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const _router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, token, logout, isLoading: _isLoading } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  // Show nothing while hydrating to avoid flash
  if (!mounted) return null;

  // Auth check: redirect if not authenticated or not admin
  if (!token || !user) {
    return (
      <div className="min-h-screen bg-black-surface flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl text-white mb-2">Authentication Required</h2>
          <p className="text-gray-light text-sm mb-6">Please sign in to access the admin panel.</p>
          <Link href="/login" className="btn-gold">Sign In</Link>
        </div>
      </div>
    );
  }

  if (!ADMIN_ROLES.includes(user.role)) {
    return (
      <div className="min-h-screen bg-black-surface flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl text-white mb-2">Unauthorized</h2>
          <p className="text-gray-light text-sm mb-6">You do not have permission to access the admin panel.</p>
          <Link href="/portal" className="btn-gold">Go to Portal</Link>
        </div>
      </div>
    );
  }

  const userInitials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  return (
    <div className="min-h-screen bg-black-surface">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-[#090909] border-r border-black-border z-50 flex flex-col transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-black-border">
          <Link href="/admin">
            <img src="/images/wide.png" alt="Telal Development" className="h-6 w-auto" />
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-gray-light hover:text-white"
            title="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {sidebarItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-6 py-2.5 text-sm transition-colors relative",
                  active
                    ? "text-gold"
                    : "text-gray-light hover:text-white hover:bg-white/[0.02]"
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1 bottom-1 w-[2px] bg-gold" />
                )}
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="p-4 border-t border-black-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
              <span className="text-gold text-xs font-medium">{userInitials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-mid">{user.role.replace(/_/g, " ")}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="text-gray-mid hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-[#090909] border-b border-black-border flex items-center px-6 gap-4 sticky top-0 z-30">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-light hover:text-white"
            title="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb area */}
          <div className="flex-1">
            <p className="text-xs text-gray-mid uppercase tracking-wider">
              Admin / {pathname === "/admin" ? "Dashboard" : pathname.split("/").pop()?.replace(/-/g, " ")}
            </p>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-black-deep border border-black-border rounded-sm px-3 py-1.5">
            <Search className="w-3.5 h-3.5 text-gray-mid" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-white placeholder:text-gray-mid focus:outline-none w-48"
            />
          </div>

          {/* Notification */}
          <button type="button" className="relative text-gray-light hover:text-white transition-colors" title="Notifications">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full" />
          </button>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
            <span className="text-gold text-xs font-medium">{userInitials}</span>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
