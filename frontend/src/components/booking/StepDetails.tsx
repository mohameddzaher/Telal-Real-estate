"use client";

import { useBookingStore } from "@/store";
import { meetingRooms } from "@/lib/data";
import { bookingFormSchema, type BookingFormData } from "@/lib/validations";
import { apiPost } from "@/lib/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Clock, Building, Users, AlertCircle, Loader2 } from "lucide-react";

export default function StepDetails() {
  const {
    selectedRoom,
    selectedDate,
    selectedTime,
    setStep,
    setBookingRef,
    setBookingError,
    setBookingLoading,
    bookingError,
    bookingLoading,
  } = useBookingStore();

  const room = meetingRooms.find((r) => r.id === selectedRoom);

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      purpose: "",
      attendees: 1,
      notes: "",
    },
  });

  async function onSubmit(data: BookingFormData) {
    setBookingError(null);
    setBookingLoading(true);
    try {
      const res = await apiPost("/api/bookings", {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        purpose: data.purpose,
        attendees: data.attendees,
        notes: data.notes,
        date: selectedDate?.toISOString(),
        timeSlot: selectedTime,
        roomId: selectedRoom,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Booking failed. The time slot may already be taken.");
      }
      const body = await res.json();
      setBookingRef(body.referenceNumber || body.ref || body.id || null);
      setStep(3);
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Form */}
      <div className="lg:col-span-2">
        <h2 className="heading-section text-xl md:text-2xl text-white mb-8">
          Your Details
        </h2>

        <form
          id="booking-details-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-body text-gray-light mb-2"
            >
              Full Name <span className="text-gold">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className="input-luxury"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="mt-1.5 text-xs font-body text-error">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-body text-gray-light mb-2"
            >
              Email Address <span className="text-gold">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="input-luxury"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs font-body text-error">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-body text-gray-light mb-2"
            >
              Phone Number <span className="text-gold">*</span>
            </label>
            <div className="flex">
              <span className="flex items-center px-4 bg-black-surface border border-r-0 border-black-border rounded-l-sm text-sm font-body text-gray-light">
                +966
              </span>
              <input
                id="phone"
                type="tel"
                placeholder="5XXXXXXXX"
                className="input-luxury rounded-l-none"
                {...register("phone")}
              />
            </div>
            {errors.phone && (
              <p className="mt-1.5 text-xs font-body text-error">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Company */}
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-body text-gray-light mb-2"
            >
              Company <span className="text-gray-mid">(Optional)</span>
            </label>
            <input
              id="company"
              type="text"
              placeholder="Company name"
              className="input-luxury"
              {...register("company")}
            />
          </div>

          {/* Purpose */}
          <div>
            <label
              htmlFor="purpose"
              className="block text-sm font-body text-gray-light mb-2"
            >
              Purpose of Meeting <span className="text-gold">*</span>
            </label>
            <textarea
              id="purpose"
              rows={3}
              placeholder="Briefly describe the purpose of your meeting"
              className="input-luxury resize-none"
              {...register("purpose")}
            />
            {errors.purpose && (
              <p className="mt-1.5 text-xs font-body text-error">
                {errors.purpose.message}
              </p>
            )}
          </div>

          {/* Attendees */}
          <div>
            <label
              htmlFor="attendees"
              className="block text-sm font-body text-gray-light mb-2"
            >
              Number of Attendees <span className="text-gold">*</span>
            </label>
            <input
              id="attendees"
              type="number"
              min={1}
              max={room?.capacity ?? 50}
              placeholder="1"
              className="input-luxury max-w-[160px]"
              {...register("attendees", { valueAsNumber: true })}
            />
            {errors.attendees && (
              <p className="mt-1.5 text-xs font-body text-error">
                {errors.attendees.message}
              </p>
            )}
            {room && (
              <p className="mt-1 text-xs font-body text-gray-mid">
                Maximum capacity: {room.capacity} guests
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-body text-gray-light mb-2"
            >
              Additional Notes <span className="text-gray-mid">(Optional)</span>
            </label>
            <textarea
              id="notes"
              rows={3}
              placeholder="Any special requirements or requests"
              className="input-luxury resize-none"
              {...register("notes")}
            />
          </div>

          {/* Booking Error */}
          {bookingError && (
            <div className="flex items-center gap-2 p-4 bg-error/10 border border-error/30 rounded-sm">
              <AlertCircle className="w-4 h-4 text-error flex-shrink-0" />
              <p className="text-sm text-error">{bookingError}</p>
            </div>
          )}

          {/* Loading indicator */}
          {bookingLoading && (
            <div className="flex items-center gap-2 text-gold">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm font-body">Submitting booking...</span>
            </div>
          )}
        </form>
      </div>

      {/* Summary Sidebar */}
      <div className="lg:col-span-1">
        <div className="card-luxury p-6 sticky top-32">
          <h3 className="font-display text-lg text-white mb-6">
            Booking Summary
          </h3>

          <div className="space-y-4">
            {room && (
              <div className="flex items-start gap-3">
                <Building className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-body text-gray-mid">Room</p>
                  <p className="text-sm font-body text-white">{room.name}</p>
                  {room.floor && (
                    <p className="text-xs font-body text-gray-light">
                      Floor {room.floor}
                    </p>
                  )}
                </div>
              </div>
            )}

            {selectedDate && (
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-body text-gray-mid">Date</p>
                  <p className="text-sm font-body text-white">
                    {formattedDate}
                  </p>
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

            {room && (
              <div className="flex items-start gap-3">
                <Users className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-body text-gray-mid">Capacity</p>
                  <p className="text-sm font-body text-white">
                    Up to {room.capacity} guests
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-black-border">
            <p className="text-xs font-body text-gray-mid leading-relaxed">
              A confirmation email will be sent to your provided email address
              upon booking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
