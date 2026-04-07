import { Search, Plus, Pencil, Trash2, Mail, Phone } from "lucide-react";

export const metadata = {
  title: "Clients — Admin — Telal Development",
};

const clients = [
  { id: "c1", name: "Ahmed Al-Rashid", email: "ahmed@example.com", phone: "+966 501 234 567", properties: 2, totalValue: "SAR 21.2M", status: "Active", joinDate: "Jan 2024" },
  { id: "c2", name: "Fatima Al-Naimi", email: "fatima@example.com", phone: "+966 502 345 678", properties: 1, totalValue: "SAR 8.7M", status: "Active", joinDate: "Mar 2024" },
  { id: "c3", name: "Sultan Al-Otaibi", email: "sultan@example.com", phone: "+966 503 456 789", properties: 3, totalValue: "SAR 34.5M", status: "Active", joinDate: "Nov 2023" },
  { id: "c4", name: "Reem Al-Dosari", email: "reem@example.com", phone: "+966 504 567 890", properties: 1, totalValue: "SAR 6.8M", status: "Inactive", joinDate: "Jun 2024" },
  { id: "c5", name: "Mansour Al-Harbi", email: "mansour@example.com", phone: "+966 505 678 901", properties: 2, totalValue: "SAR 15.3M", status: "Active", joinDate: "Feb 2024" },
  { id: "c6", name: "Nouf Al-Shamsi", email: "nouf@example.com", phone: "+966 506 789 012", properties: 1, totalValue: "SAR 12.5M", status: "Active", joinDate: "Apr 2024" },
];

export default function AdminClientsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-white">Clients</h1>
        <button className="btn-gold gap-2">
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-black-deep border border-black-border rounded-sm px-3 py-2 max-w-sm">
        <Search className="w-4 h-4 text-gray-mid" />
        <input
          type="text"
          placeholder="Search clients..."
          className="bg-transparent text-sm text-white placeholder:text-gray-mid focus:outline-none w-full"
        />
      </div>

      {/* Table */}
      <div className="bg-black-deep border border-black-border rounded-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black-border">
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Client</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Contact</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Properties</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Total Value</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Status</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Joined</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b border-black-border/50 last:border-0 hover:bg-white/[0.01]">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-gold text-xs font-medium">
                        {client.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <span className="text-sm text-white">{client.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-gray-light flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {client.email}
                    </span>
                    <span className="text-xs text-gray-mid flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {client.phone}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-white">{client.properties}</td>
                <td className="px-5 py-3 text-sm text-gold">{client.totalValue}</td>
                <td className="px-5 py-3">
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-sm border ${
                    client.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                  }`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-gray-mid">{client.joinDate}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-gray-light hover:text-gold transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 text-gray-light hover:text-error transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
