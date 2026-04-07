import {
  TrendingUp,
  TrendingDown,
  Target,
  Building,
  DollarSign,
  Eye,
} from "lucide-react";
import { properties } from "@/lib/data";
import { PropertyStatus } from "@/types";
import { formatPrice } from "@/lib/utils";

export const metadata = {
  title: "Admin Dashboard — Telal Development",
};

const activeProperties = properties.filter(
  (p) => p.isPublished && p.status !== PropertyStatus.SOLD
);
const totalViews = properties.reduce((sum, p) => sum + (p.views || 0), 0);
const totalPipeline = activeProperties.reduce((sum, p) => sum + p.price, 0);

const recentLeads = [
  { name: "Faisal Al-Otaibi", email: "faisal@example.com", source: "Website", status: "New", date: "Apr 5, 2026" },
  { name: "Sara Al-Dosari", email: "sara@example.com", source: "Referral", status: "Contacted", date: "Apr 5, 2026" },
  { name: "Khalid Al-Mutairi", email: "khalid@example.com", source: "Instagram", status: "Qualified", date: "Apr 4, 2026" },
  { name: "Nora Al-Rashid", email: "nora@example.com", source: "Website", status: "New", date: "Apr 4, 2026" },
  { name: "Ahmed Al-Zahrani", email: "ahmed@example.com", source: "Event", status: "Negotiating", date: "Apr 3, 2026" },
];

const upcomingBookings = [
  { guest: "Mohammed Al-Harbi", room: "Executive Suite A", date: "Apr 6, 2026", time: "10:00 AM" },
  { guest: "Layla Al-Qahtani", room: "Boardroom", date: "Apr 6, 2026", time: "2:00 PM" },
  { guest: "Omar Al-Shehri", room: "Meeting Room B", date: "Apr 7, 2026", time: "11:30 AM" },
];

const kpis = [
  {
    label: "New Leads",
    value: String(recentLeads.length),
    change: "+12%",
    trend: "up" as const,
    icon: Target,
  },
  {
    label: "Total Property Views",
    value: totalViews.toLocaleString(),
    change: "",
    trend: "up" as const,
    icon: Eye,
  },
  {
    label: "Active Properties",
    value: String(activeProperties.length),
    change: `${properties.length} total`,
    trend: "up" as const,
    icon: Building,
  },
  {
    label: "Revenue Pipeline",
    value: formatPrice(totalPipeline, "SAR"),
    change: "+8.3%",
    trend: "up" as const,
    icon: DollarSign,
  },
];

const statusColors: Record<string, string> = {
  New: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Contacted: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Qualified: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Negotiating: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function AdminDashboard() {
  const topProperties = [...properties]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl text-white">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-black-deep border border-black-border rounded-sm p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <kpi.icon className="w-5 h-5 text-gold" />
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  kpi.trend === "up" ? "text-success" : "text-error"
                }`}
              >
                {kpi.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {kpi.change}
              </span>
            </div>
            <p className="font-display text-2xl text-white mb-1">{kpi.value}</p>
            <p className="text-xs text-gray-light">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-black-deep border border-black-border rounded-sm">
          <div className="px-5 py-4 border-b border-black-border">
            <h2 className="font-display text-lg text-white">Recent Leads</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black-border">
                  <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Name</th>
                  <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Email</th>
                  <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Source</th>
                  <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead, i) => (
                  <tr key={i} className="border-b border-black-border/50 last:border-0">
                    <td className="px-5 py-3 text-sm text-white">{lead.name}</td>
                    <td className="px-5 py-3 text-sm text-gray-light">{lead.email}</td>
                    <td className="px-5 py-3 text-sm text-gray-light">{lead.source}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-sm border ${statusColors[lead.status] || ""}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-mid">{lead.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-black-deep border border-black-border rounded-sm">
          <div className="px-5 py-4 border-b border-black-border">
            <h2 className="font-display text-lg text-white">Upcoming Bookings</h2>
          </div>
          <div className="divide-y divide-black-border/50">
            {upcomingBookings.map((booking, i) => (
              <div key={i} className="px-5 py-4">
                <p className="text-sm text-white font-medium">{booking.guest}</p>
                <p className="text-xs text-gold mt-1">{booking.room}</p>
                <p className="text-xs text-gray-mid mt-1">
                  {booking.date} at {booking.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Most Viewed Properties */}
      <div className="bg-black-deep border border-black-border rounded-sm">
        <div className="px-5 py-4 border-b border-black-border">
          <h2 className="font-display text-lg text-white">Most Viewed Properties</h2>
        </div>
        <div className="divide-y divide-black-border/50">
          {topProperties.map((property, i) => (
            <div key={property.id} className="flex items-center gap-4 px-5 py-3">
              <span className="font-display text-xl text-gold/40 w-8 text-center">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{property.title}</p>
                <p className="text-xs text-gray-mid">{property.city}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-light">
                <Eye className="w-3 h-3" />
                {property.views.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
