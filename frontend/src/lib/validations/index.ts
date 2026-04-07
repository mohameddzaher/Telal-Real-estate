import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  preferredContact: z.enum(["email", "phone", "whatsapp"]).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const bookingFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(9, "Phone number must be at least 9 digits"),
  company: z.string().optional(),
  purpose: z.string().min(10, "Please describe the purpose of your meeting"),
  attendees: z.number().min(1).max(50),
  notes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  consent: z.boolean().refine((v) => v === true, "You must agree to receive emails"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().min(8, "Please enter a valid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const propertySchema = z.object({
  title: z.string().min(3),
  titleAr: z.string().min(3),
  description: z.string().min(20),
  descriptionAr: z.string().min(20),
  type: z.enum(["RESIDENTIAL", "COMMERCIAL", "MIXED_USE", "OFF_PLAN", "RETAIL", "HOSPITALITY"]),
  status: z.enum(["AVAILABLE", "SOLD", "OFF_PLAN", "UNDER_CONSTRUCTION", "RESERVED"]),
  price: z.number().positive(),
  currency: z.string().default("SAR"),
  area: z.number().positive(),
  bedrooms: z.number().min(0).optional(),
  bathrooms: z.number().min(0).optional(),
  floors: z.number().min(0).optional(),
  parkingSpots: z.number().min(0).optional(),
  location: z.string().min(3),
  city: z.string().min(2),
  amenities: z.array(z.string()),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
});

export type PropertyFormData = z.infer<typeof propertySchema>;

export const leadNoteSchema = z.object({
  content: z.string().min(1, "Note cannot be empty"),
});

export const faqSearchSchema = z.object({
  query: z.string(),
  category: z.string().optional(),
});
