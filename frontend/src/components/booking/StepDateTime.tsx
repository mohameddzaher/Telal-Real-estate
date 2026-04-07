"use client";

import { useState, useMemo } from "react";
import { useBookingStore } from "@/store";
import { meetingRooms, timeSlots } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  Building,
  MapPin,
} from "lucide-react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function StepDateTime() {
  const {
    selectedRoom,
    setSelectedRoom,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
  } = useBookingStore();

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function goToPrevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  }

  function goToNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  }

  function isDateDisabled(day: number) {
    const date = new Date(viewYear, viewMonth, day);
    // Past dates
    if (date < today) return true;
    // Friday (5) and Saturday (6) are weekends in Saudi Arabia
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 5 || dayOfWeek === 6) return true;
    return false;
  }

  function handleDateClick(day: number) {
    if (isDateDisabled(day)) return;
    const date = new Date(viewYear, viewMonth, day);
    setSelectedDate(date);
    setSelectedTime(null);
  }

  const isPrevDisabled =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const activeRooms = meetingRooms.filter((r) => r.isActive);

  return (
    <div className="space-y-12">
      {/* Room Selection */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Building className="w-5 h-5 text-gold" />
          <h2 className="heading-section text-xl md:text-2xl text-white">
            Select a Meeting Room
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeRooms.map((room) => (
            <button
              key={room.id}
              type="button"
              onClick={() => setSelectedRoom(room.id)}
              className={cn(
                "card-luxury p-6 text-left transition-all duration-300",
                selectedRoom === room.id
                  ? "border-gold ring-1 ring-gold/20"
                  : "hover:border-gold/30"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-lg text-white">
                  {room.name}
                </h3>
                {selectedRoom === room.id && (
                  <div className="w-5 h-5 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                    <svg
                      viewBox="0 0 12 12"
                      className="w-3 h-3 text-black-DEFAULT"
                    >
                      <path
                        d="M10 3L4.5 8.5 2 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm text-gray-light font-body">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gold" />
                  Up to {room.capacity} guests
                </span>
                {room.floor && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    Floor {room.floor}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="px-2.5 py-1 text-xs font-body bg-black-deep border border-black-border rounded-sm text-gray-light"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-5 h-5 text-gold" />
          <h2 className="heading-section text-xl md:text-2xl text-white">
            Select a Date
          </h2>
        </div>

        <div className="card-luxury p-6 max-w-md">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={goToPrevMonth}
              disabled={isPrevDisabled}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-sm border border-black-border transition-colors",
                isPrevDisabled
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:border-gold/40 hover:text-gold text-gray-light"
              )}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-display text-lg text-white">{monthLabel}</span>
            <button
              type="button"
              onClick={goToNextMonth}
              className="w-8 h-8 flex items-center justify-center rounded-sm border border-black-border hover:border-gold/40 hover:text-gold text-gray-light transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-body text-gray-mid py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Date cells */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for offset */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const date = new Date(viewYear, viewMonth, day);
              const disabled = isDateDisabled(day);
              const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
              const isToday = isSameDay(date, today);

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDateClick(day)}
                  disabled={disabled}
                  className={cn(
                    "w-full aspect-square flex items-center justify-center text-sm font-body rounded-sm transition-all duration-200",
                    disabled
                      ? "text-gray-mid/40 cursor-not-allowed"
                      : "hover:bg-gold/10 hover:text-gold cursor-pointer text-white",
                    isSelected && !disabled && "bg-gold text-black-DEFAULT hover:bg-gold-light hover:text-black-DEFAULT font-medium",
                    isToday && !isSelected && !disabled && "ring-1 ring-gold/40"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-xs font-body text-gray-mid">
            Weekends (Fri & Sat) are unavailable. Past dates are disabled.
          </p>
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-5 h-5 text-gold" />
          <h2 className="heading-section text-xl md:text-2xl text-white">
            Select a Time
          </h2>
        </div>

        {!selectedDate ? (
          <p className="body-text">Please select a date first.</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTime(slot)}
                className={cn(
                  "px-4 py-3 text-sm font-body rounded-sm border transition-all duration-200",
                  selectedTime === slot
                    ? "bg-gold text-black-DEFAULT border-gold font-medium"
                    : "bg-black-deep border-black-border text-gray-light hover:border-gold/40 hover:text-gold"
                )}
              >
                {slot}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
