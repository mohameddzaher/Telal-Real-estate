"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validations";
import { Loader2, CheckCircle } from "lucide-react";

const subjects = [
  "General Inquiry",
  "Property Purchase",
  "Investment",
  "Partnership",
  "Career",
  "Other",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      preferredContact: "email",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (_data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-gold" />
        </div>
        <h3 className="font-display text-2xl text-white mb-3">
          Message Sent Successfully
        </h3>
        <p className="body-text max-w-md">
          Thank you for reaching out. Our team will get back to you within 24
          hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm text-gray-light mb-2">
          Full Name *
        </label>
        <input
          id="name"
          type="text"
          className="input-luxury"
          placeholder="Your full name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-error text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm text-gray-light mb-2">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          className="input-luxury"
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-error text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm text-gray-light mb-2">
          Phone Number *
        </label>
        <div className="flex">
          <span className="flex items-center px-4 bg-black-surface border border-black-border border-r-0 rounded-l-sm text-gray-light text-sm">
            +966
          </span>
          <input
            id="phone"
            type="tel"
            className="input-luxury rounded-l-none"
            placeholder="5X XXX XXXX"
            {...register("phone")}
          />
        </div>
        {errors.phone && (
          <p className="text-error text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm text-gray-light mb-2"
        >
          Subject *
        </label>
        <select
          id="subject"
          className="input-luxury appearance-none"
          {...register("subject")}
        >
          <option value="">Select a subject</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className="text-error text-xs mt-1">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm text-gray-light mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          className="input-luxury resize-none"
          placeholder="Tell us about your inquiry..."
          {...register("message")}
        />
        {errors.message && (
          <p className="text-error text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Preferred Contact Method */}
      <div>
        <p className="text-sm text-gray-light mb-3">
          Preferred Contact Method
        </p>
        <div className="flex flex-wrap gap-6">
          {(["email", "phone", "whatsapp"] as const).map((method) => (
            <label
              key={method}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                value={method}
                className="w-4 h-4 accent-[#C9A84C]"
                {...register("preferredContact")}
              />
              <span className="text-sm text-white capitalize">{method}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
