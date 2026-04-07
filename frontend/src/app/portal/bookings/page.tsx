import { Calendar, Clock, MapPin, User } from "lucide-react";

export const metadata = {
  title: "My Bookings — My Portal — Telal Development",
};

const bookings = [
  {
    id: "bk-1",
    ref: "TEL-BK042",
    title: "Property Viewing — Al Thuraya Tower",
    agent: "Sarah Al-Mansour",
    room: "Executive Suite A",
    date: "Apr 8, 2026",
    time: "10:00 AM — 11:00 AM",
    status: "CONFIRMED",
    notes: "Penthouse viewing with floor plan walkthrough",
  },
  {
    id: "bk-2",
    ref: "TEL-BK038",
    title: "Investment Consultation",
    agent: "Omar Al-Khalid",
    room: "Meeting Room B",
    date: "Mar 28, 2026",
    time: "2:00 PM — 3:30 PM",
    status: "COMPLETED",
    notes: "Discussed portfolio options and ROI projections",
  },
  {
    id: "bk-3",
    ref: "TEL-BK025",
    title: "Contract Review — Rimal Gardens",
    agent: "Sarah Al-Mansour",
    room: "Boardroom",
    date: "Mar 15, 2026",
    time: "11:00 AM — 12:00 PM",
    status: "COMPLETED",
    notes: "Final contract review before signing",
  },
];

const statusBadge: Record<string, string> = {
  CONFIRMED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  COMPLETED: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function PortalBookingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-white">My Bookings</h1>
          <p className="text-sm text-gray-light mt-1">Your scheduled meetings and viewings</p>
        </div>
        <button className="btn-gold gap-2">
          <Calendar className="w-4 h-4" />
          Book Meeting
        </button>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-black-deep border border-black-border rounded-sm p-5 hover:border-gold/20 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display text-lg text-white">{booking.title}</h3>
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-sm border ${statusBadge[booking.status]}`}>
                    {booking.status}
                  </span>
                </div>
                <p className="text-xs text-gray-mid font-mono mb-3">Ref: {booking.ref}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-light">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    {booking.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-light">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    {booking.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-light">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    {booking.room}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-light">
                    <User className="w-3.5 h-3.5 text-gold" />
                    {booking.agent}
                  </div>
                </div>

                {booking.notes && (
                  <p className="text-xs text-gray-mid mt-3 italic">{booking.notes}</p>
                )}
              </div>

              {booking.status === "CONFIRMED" && (
                <div className="flex gap-2">
                  <button className="btn-ghost text-xs py-2 px-4">Reschedule</button>
                  <button className="text-xs text-error hover:text-red-300 transition-colors px-4 py-2">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
