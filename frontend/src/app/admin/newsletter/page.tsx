import { Download, Search, Mail } from "lucide-react";

export const metadata = {
  title: "Newsletter — Admin — Telal Development",
};

const subscribers = [
  { email: "ahmed@example.com", status: "Active", date: "Apr 5, 2026" },
  { email: "fatima@example.com", status: "Active", date: "Apr 4, 2026" },
  { email: "khalid@example.com", status: "Active", date: "Apr 3, 2026" },
  { email: "sara@example.com", status: "Unsubscribed", date: "Apr 2, 2026" },
  { email: "omar@example.com", status: "Active", date: "Apr 1, 2026" },
  { email: "nora@example.com", status: "Active", date: "Mar 30, 2026" },
  { email: "youssef@example.com", status: "Active", date: "Mar 28, 2026" },
  { email: "huda@example.com", status: "Unsubscribed", date: "Mar 25, 2026" },
  { email: "tariq@example.com", status: "Active", date: "Mar 22, 2026" },
  { email: "layla@example.com", status: "Active", date: "Mar 20, 2026" },
];

export default function AdminNewsletterPage() {
  const activeCount = subscribers.filter((s) => s.status === "Active").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-white">Newsletter</h1>
          <p className="text-sm text-gray-light mt-1">
            {activeCount} active subscribers out of {subscribers.length} total
          </p>
        </div>
        <button className="btn-ghost gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-black-deep border border-black-border rounded-sm p-5">
          <Mail className="w-5 h-5 text-gold mb-3" />
          <p className="font-display text-2xl text-white">{subscribers.length}</p>
          <p className="text-xs text-gray-light">Total Subscribers</p>
        </div>
        <div className="bg-black-deep border border-black-border rounded-sm p-5">
          <Mail className="w-5 h-5 text-success mb-3" />
          <p className="font-display text-2xl text-white">{activeCount}</p>
          <p className="text-xs text-gray-light">Active</p>
        </div>
        <div className="bg-black-deep border border-black-border rounded-sm p-5">
          <Mail className="w-5 h-5 text-gray-mid mb-3" />
          <p className="font-display text-2xl text-white">{subscribers.length - activeCount}</p>
          <p className="text-xs text-gray-light">Unsubscribed</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-black-deep border border-black-border rounded-sm px-3 py-2 max-w-sm">
        <Search className="w-4 h-4 text-gray-mid" />
        <input
          type="text"
          placeholder="Search subscribers..."
          className="bg-transparent text-sm text-white placeholder:text-gray-mid focus:outline-none w-full"
        />
      </div>

      {/* Table */}
      <div className="bg-black-deep border border-black-border rounded-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black-border">
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Email</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Status</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Subscribed Date</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub, i) => (
              <tr key={i} className="border-b border-black-border/50 last:border-0 hover:bg-white/[0.01]">
                <td className="px-5 py-3 text-sm text-white">{sub.email}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-block text-xs px-2 py-0.5 rounded-sm border ${
                      sub.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                    }`}
                  >
                    {sub.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-gray-mid">{sub.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
