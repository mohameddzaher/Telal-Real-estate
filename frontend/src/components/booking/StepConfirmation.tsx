"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useBookingStore } from "@/store";
import { meetingRooms } from "@/lib/data";
import { Check, Calendar, Clock, Building, Users, MapPin } from "lucide-react";

function generateRefNumber(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "TEL-";
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function buildIcsContent(
  date: Date,
  time: string,
  roomName: string,
  refNo: string
): string {
  const [hours, minutes] = time.split(":").map(Number);
  const start = new Date(date);
  start.setHours(hours, minutes, 0, 0);

  const end = new Date(start);
  end.setHours(end.getHours() + 1);

  function formatIcsDate(d: Date): string {
    return d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  }

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Telal Development//Booking//EN",
    "BEGIN:VEVENT",
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:Meeting at Telal - ${roomName}`,
    `DESCRIPTION:Booking Reference: ${refNo}`,
    `LOCATION:${roomName}, Telal Development, Riyadh`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export default function StepConfirmation() {
  const { selectedRoom, selectedDate, selectedTime, reset } =
    useBookingStore();

  const room = meetingRooms.find((r) => r.id === selectedRoom);

  const refNo = useMemo(() => generateRefNumber(), []);

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  function handleAddToCalendar() {
    if (!selectedDate || !selectedTime || !room) return;

    const ics = buildIcsContent(selectedDate, selectedTime, room.name, refNo);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `telal-meeting-${refNo}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleBookAnother() {
    reset();
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Success Icon */}
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center gold-glow">
          <Check className="w-9 h-9 text-gold" />
        </div>
      </div>

      {/* Heading */}
      <h2 className="font-display text-3xl md:text-4xl text-white mb-3">
        Booking Confirmed!
      </h2>
      <p className="body-text mb-2">
        Your meeting room has been successfully reserved.
      </p>

      {/* Reference Number */}
      <div className="inline-block px-6 py-2 bg-black-surface border border-gold/30 rounded-sm mb-10">
        <span className="text-xs font-body text-gray-light uppercase tracking-wider">
          Reference No.
        </span>
        <p className="font-display text-xl text-gold mt-0.5">{refNo}</p>
      </div>

      {/* Booking Summary Card */}
      <div className="card-luxury p-8 text-left mb-10">
        <h3 className="font-display text-lg text-white mb-6 text-center">
          Booking Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {room && (
            <div className="flex items-start gap-3">
              <Building className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-body text-gray-mid">Meeting Room</p>
                <p className="text-sm font-body text-white">{room.name}</p>
              </div>
            </div>
          )}

          {selectedDate && (
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-body text-gray-mid">Date</p>
                <p className="text-sm font-body text-white">{formattedDate}</p>
              </div>
            </div>
          )}

          {selectedTime && (
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-body text-gray-mid">Time</p>
                <p className="text-sm font-body text-white">{selectedTime}</p>
              </div>
            </div>
          )}

          {room?.floor && (
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-body text-gray-mid">Location</p>
                <p className="text-sm font-body text-white">
                  Floor {room.floor}, Telal Development HQ
                </p>
              </div>
            </div>
          )}

          {room && (
            <div className="flex items-start gap-3">
              <Users className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-body text-gray-mid">Room Capacity</p>
                <p className="text-sm font-body text-white">
                  Up to {room.capacity} guests
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation email notice */}
      <p className="body-text text-sm mb-8">
        A confirmation email with full details has been sent to your email
        address. Please check your inbox (and spam folder) for the booking
        confirmation.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={handleAddToCalendar}
          className="btn-ghost w-full sm:w-auto"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Add to Calendar
        </button>

        <button
          type="button"
          onClick={handleBookAnother}
          className="btn-gold w-full sm:w-auto"
        >
          Book Another Meeting
        </button>

        <Link href="/" className="btn-ghost w-full sm:w-auto text-center">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
