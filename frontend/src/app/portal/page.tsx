import Link from "next/link";
import { Building, Calendar, FileText, Search, Phone } from "lucide-react";

export const metadata = {
  title: "My Portal — Telal Development",
};

const stats = [
  { label: "Saved Properties", value: 3, icon: Building },
  { label: "Active Bookings", value: 1, icon: Calendar },
  { label: "Documents", value: 5, icon: FileText },
];

const recentActivity = [
  { text: "You saved Al Thuraya Tower Penthouse to favorites", time: "2 hours ago", type: "property" },
  { text: "Meeting confirmed with Agent Sarah for Apr 8", time: "1 day ago", type: "booking" },
  { text: "Contract document uploaded for Rimal Gardens Villa", time: "3 days ago", type: "document" },
  { text: "Payment of SAR 250,000 received — milestone 2", time: "1 week ago", type: "payment" },
  { text: "You requested a viewing for Noor Residences", time: "2 weeks ago", type: "property" },
];

const activityDot: Record<string, string> = {
  property: "bg-gold",
  booking: "bg-blue-500",
  document: "bg-emerald-500",
  payment: "bg-purple-500",
};

export default function PortalPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="font-display text-3xl text-white">Welcome back, Ahmed</h1>
        <p className="text-gray-light text-sm mt-1">
          Here&apos;s an overview of your activity
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-black-deep border border-black-border rounded-sm p-5"
          >
            <stat.icon className="w-5 h-5 text-gold mb-3" />
            <p className="font-display text-2xl text-white">{stat.value}</p>
            <p className="text-xs text-gray-light">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-black-deep border border-black-border rounded-sm">
          <div className="px-5 py-4 border-b border-black-border">
            <h2 className="font-display text-lg text-white">Recent Activity</h2>
          </div>
          <div className="p-5">
            <div className="space-y-0">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex gap-4 pb-5 last:pb-0 relative">
                  {/* Timeline line */}
                  {i < recentActivity.length - 1 && (
                    <div className="absolute left-[5px] top-3 bottom-0 w-px bg-black-border" />
                  )}
                  {/* Dot */}
                  <div className={`w-[10px] h-[10px] rounded-full mt-1 flex-shrink-0 ${activityDot[activity.type]}`} />
                  <div>
                    <p className="text-sm text-white">{activity.text}</p>
                    <p className="text-xs text-gray-mid mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-black-deep border border-black-border rounded-sm">
          <div className="px-5 py-4 border-b border-black-border">
            <h2 className="font-display text-lg text-white">Quick Actions</h2>
          </div>
          <div className="p-5 space-y-3">
            <Link
              href="/properties"
              className="flex items-center gap-3 p-3 bg-black-surface border border-black-border rounded-sm hover:border-gold/20 transition-colors"
            >
              <Search className="w-4 h-4 text-gold" />
              <span className="text-sm text-white">Browse Properties</span>
            </Link>
            <Link
              href="/portal/bookings"
              className="flex items-center gap-3 p-3 bg-black-surface border border-black-border rounded-sm hover:border-gold/20 transition-colors"
            >
              <Calendar className="w-4 h-4 text-gold" />
              <span className="text-sm text-white">Book Meeting</span>
            </Link>
            <Link
              href="/portal/messages"
              className="flex items-center gap-3 p-3 bg-black-surface border border-black-border rounded-sm hover:border-gold/20 transition-colors"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span className="text-sm text-white">Contact Agent</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
