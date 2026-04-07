import { Calendar, List, Eye, Pencil, X } from "lucide-react";

export const metadata = {
  title: "Bookings — Admin — Telal Development",
};

const bookings = [
  { ref: "TEL-BK001", guest: "Mohammed Al-Harbi", room: "Executive Suite A", date: "Apr 6, 2026", time: "10:00 AM", status: "CONFIRMED" },
  { ref: "TEL-BK002", guest: "Layla Al-Qahtani", room: "Boardroom", date: "Apr 6, 2026", time: "2:00 PM", status: "PENDING" },
  { ref: "TEL-BK003", guest: "Omar Al-Shehri", room: "Meeting Room B", date: "Apr 7, 2026", time: "11:30 AM", status: "CONFIRMED" },
  { ref: "TEL-BK004", guest: "Aisha Al-Subaie", room: "Executive Suite A", date: "Apr 8, 2026", time: "9:00 AM", status: "PENDING" },
  { ref: "TEL-BK005", guest: "Youssef Al-Ghamdi", room: "VIP Lounge", date: "Apr 8, 2026", time: "3:00 PM", status: "CANCELLED" },
  { ref: "TEL-BK006", guest: "Huda Al-Tamimi", room: "Meeting Room A", date: "Apr 3, 2026", time: "10:00 AM", status: "COMPLETED" },
];

const statusBadge: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  CONFIRMED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
  COMPLETED: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-white">Meeting Bookings</h1>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-gold/10 border border-gold/20 text-gold rounded-sm">
            <List className="w-4 h-4" />
          </button>
          <button className="p-2 bg-black-deep border border-black-border text-gray-light rounded-sm hover:border-gold/20 transition-colors">
            <Calendar className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select className="input-luxury w-auto min-w-[140px] text-sm">
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <input
          type="date"
          className="input-luxury w-auto text-sm"
          placeholder="From date"
        />
        <input
          type="date"
          className="input-luxury w-auto text-sm"
          placeholder="To date"
        />
        <select className="input-luxury w-auto min-w-[160px] text-sm">
          <option value="">All Rooms</option>
          <option value="Executive Suite A">Executive Suite A</option>
          <option value="Boardroom">Boardroom</option>
          <option value="Meeting Room A">Meeting Room A</option>
          <option value="Meeting Room B">Meeting Room B</option>
          <option value="VIP Lounge">VIP Lounge</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-black-deep border border-black-border rounded-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black-border">
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Reference</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Guest Name</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Room</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Date</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Time</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Status</th>
              <th className="text-left text-xs text-gray-mid uppercase tracking-wider px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.ref} className="border-b border-black-border/50 last:border-0 hover:bg-white/[0.01]">
                <td className="px-5 py-3 text-sm text-gold font-mono">{booking.ref}</td>
                <td className="px-5 py-3 text-sm text-white">{booking.guest}</td>
                <td className="px-5 py-3 text-sm text-gray-light">{booking.room}</td>
                <td className="px-5 py-3 text-sm text-gray-light">{booking.date}</td>
                <td className="px-5 py-3 text-sm text-gray-light">{booking.time}</td>
                <td className="px-5 py-3">
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-sm border ${statusBadge[booking.status] || ""}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-gray-light hover:text-gold transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 text-gray-light hover:text-gold transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 text-gray-light hover:text-error transition-colors">
                      <X className="w-3.5 h-3.5" />
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
