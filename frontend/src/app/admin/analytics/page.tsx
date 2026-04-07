import { Users, Eye, ArrowDownRight, Clock } from "lucide-react";

export const metadata = {
  title: "Analytics — Admin — Telal Development",
};

const kpis = [
  { label: "Total Visitors", value: "12,450", icon: Users, change: "+18%" },
  { label: "Page Views", value: "45,230", icon: Eye, change: "+24%" },
  { label: "Bounce Rate", value: "32%", icon: ArrowDownRight, change: "-5%" },
  { label: "Avg Session", value: "4:32", icon: Clock, change: "+12%" },
];

const topPages = [
  { path: "/", views: "8,234", avgTime: "2:15" },
  { path: "/properties", views: "6,120", avgTime: "4:45" },
  { path: "/properties/al-thuraya-tower-penthouse", views: "3,456", avgTime: "6:32" },
  { path: "/projects", views: "2,890", avgTime: "3:18" },
  { path: "/contact", views: "2,340", avgTime: "1:52" },
  { path: "/about", views: "1,987", avgTime: "2:40" },
  { path: "/services", views: "1,654", avgTime: "3:05" },
];

const trafficSources = [
  { source: "Organic Search", percentage: 45, color: "bg-emerald-500" },
  { source: "Direct", percentage: 25, color: "bg-gold" },
  { source: "Social Media", percentage: 20, color: "bg-blue-500" },
  { source: "Referral", percentage: 10, color: "bg-purple-500" },
];

const devices = [
  { device: "Mobile", percentage: 58, color: "bg-gold" },
  { device: "Desktop", percentage: 34, color: "bg-emerald-500" },
  { device: "Tablet", percentage: 8, color: "bg-blue-500" },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl text-white">Analytics</h1>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-black-deep border border-black-border rounded-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <kpi.icon className="w-5 h-5 text-gold" />
              <span className="text-xs text-success font-medium">{kpi.change}</span>
            </div>
            <p className="font-display text-2xl text-white mb-1">{kpi.value}</p>
            <p className="text-xs text-gray-light">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Traffic Chart Placeholder */}
      <div className="bg-black-deep border border-black-border rounded-sm p-6">
        <h2 className="font-display text-lg text-white mb-6">Traffic Overview</h2>
        <div className="flex items-end gap-2 h-48">
          {[35, 48, 42, 58, 72, 65, 80, 74, 90, 85, 78, 92].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-gold/20 border border-gold/30 rounded-t-sm transition-all duration-300 hover:bg-gold/40"
                style={{ height: `${height}%` }}
              />
              <span className="text-[10px] text-gray-mid">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Pages */}
        <div className="lg:col-span-2 bg-black-deep border border-black-border rounded-sm">
          <div className="px-5 py-4 border-b border-black-border">
            <h2 className="font-display text-lg text-white">Top Pages</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-black-border">
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Page</th>
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Views</th>
                <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Avg Time</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((page) => (
                <tr key={page.path} className="border-b border-black-border/50 last:border-0">
                  <td className="px-5 py-3 text-sm text-gold font-mono">{page.path}</td>
                  <td className="px-5 py-3 text-sm text-white">{page.views}</td>
                  <td className="px-5 py-3 text-sm text-gray-light">{page.avgTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Traffic Sources & Devices */}
        <div className="space-y-6">
          {/* Traffic Sources */}
          <div className="bg-black-deep border border-black-border rounded-sm p-5">
            <h2 className="font-display text-lg text-white mb-4">Traffic Sources</h2>
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-gray-light">{source.source}</span>
                    <span className="text-white">{source.percentage}%</span>
                  </div>
                  <div className="h-2 bg-black-surface rounded-full overflow-hidden">
                    <div
                      className={`h-full ${source.color} rounded-full transition-all duration-500`}
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="bg-black-deep border border-black-border rounded-sm p-5">
            <h2 className="font-display text-lg text-white mb-4">Devices</h2>
            <div className="space-y-4">
              {devices.map((device) => (
                <div key={device.device}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-gray-light">{device.device}</span>
                    <span className="text-white">{device.percentage}%</span>
                  </div>
                  <div className="h-2 bg-black-surface rounded-full overflow-hidden">
                    <div
                      className={`h-full ${device.color} rounded-full transition-all duration-500`}
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
