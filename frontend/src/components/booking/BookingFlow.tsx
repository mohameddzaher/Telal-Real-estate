"use client";

import { useBookingStore } from "@/store";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import StepDateTime from "./StepDateTime";
import StepDetails from "./StepDetails";
import StepConfirmation from "./StepConfirmation";

const STEPS = [
  { number: 1, label: "Select Date & Time" },
  { number: 2, label: "Your Details" },
  { number: 3, label: "Confirmation" },
];

export default function BookingFlow() {
  const { step, setStep, selectedDate, selectedTime, selectedRoom, bookingLoading } =
    useBookingStore();

  const canProceedStep1 = selectedDate && selectedTime && selectedRoom;

  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  function handleContinue() {
    if (step === 1 && canProceedStep1) {
      setStep(2);
    }
    // Step 2 -> 3 is handled by form submission in StepDetails
  }

  return (
    <div>
      {/* Progress Indicator */}
      <div className="mb-12 md:mb-16">
        <div className="flex items-center justify-center gap-0">
          {STEPS.map((s, idx) => (
            <div key={s.number} className="flex items-center">
              {/* Step circle + label */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 text-sm font-body font-medium",
                    step > s.number
                      ? "bg-gold border-gold text-black-DEFAULT"
                      : step === s.number
                        ? "border-gold text-gold bg-transparent"
                        : "border-black-border text-gray-mid bg-transparent"
                  )}
                >
                  {step > s.number ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    s.number
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-body whitespace-nowrap hidden sm:block",
                    step >= s.number ? "text-gold" : "text-gray-mid"
                  )}
                >
                  {s.label}
                </span>
              </div>

              {/* Connector line */}
              {idx < STEPS.length - 1 && (
                <div
                  className={cn(
                    "w-16 md:w-24 lg:w-32 h-[2px] mx-3 md:mx-4 mb-5 sm:mb-7 transition-all duration-500",
                    step > s.number ? "bg-gold" : "bg-black-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[500px]">
        {step === 1 && <StepDateTime />}
        {step === 2 && <StepDetails />}
        {step === 3 && <StepConfirmation />}
      </div>

      {/* Navigation Buttons */}
      {step < 3 && (
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-black-border">
          <button
            type="button"
            onClick={handleBack}
            className={cn(
              "btn-ghost",
              step === 1 && "opacity-0 pointer-events-none"
            )}
          >
            Back
          </button>

          {step === 1 && (
            <button
              type="button"
              onClick={handleContinue}
              disabled={!canProceedStep1}
              className={cn(
                "btn-gold",
                !canProceedStep1 && "opacity-40 cursor-not-allowed"
              )}
            >
              Continue
            </button>
          )}

          {step === 2 && (
            <button
              type="submit"
              form="booking-details-form"
              disabled={bookingLoading}
              className={cn("btn-gold", bookingLoading && "opacity-60 cursor-not-allowed")}
            >
              {bookingLoading ? "Submitting..." : "Confirm Booking"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
