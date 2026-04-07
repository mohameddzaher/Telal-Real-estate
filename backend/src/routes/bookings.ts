import { Router, Request, Response } from "express";
import { meetingRooms, timeSlots } from "../lib/data";
import { bookingFormSchema } from "../lib/validations";
import { z } from "zod";

const router = Router();

// Extended schema that includes date/time/room fields
const fullBookingSchema = bookingFormSchema.extend({
  date: z.string().min(1, "Date is required"),
  timeSlot: z.string().min(1, "Time slot is required"),
  roomId: z.string().min(1, "Room is required"),
});

// In-memory store for demo purposes
const bookings: Array<{
  id: string;
  referenceNumber: string;
  date: string;
  timeSlot: string;
  roomId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  company?: string;
  purpose: string;
  attendees: number;
  notes?: string;
  status: string;
  createdAt: Date;
}> = [];

function generateReferenceNumber(): string {
  const prefix = "TBK";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// GET /api/bookings — list with date/room filters
router.get("/", (req: Request, res: Response): void => {
  try {
    const { date, roomId } = req.query;

    let filtered = [...bookings];

    if (date) {
      filtered = filtered.filter((b) => b.date === date);
    }

    if (roomId) {
      filtered = filtered.filter((b) => b.roomId === roomId);
    }

    res.json({
      success: true,
      data: filtered,
      total: filtered.length,
    });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch bookings" });
  }
});

// POST /api/bookings — create with conflict detection
router.post("/", (req: Request, res: Response): void => {
  try {
    const result = fullBookingSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        error: "Validation failed",
        details: result.error.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
      return;
    }

    const validated = result.data;

    // Validate room exists
    const room = meetingRooms.find((r) => r.id === validated.roomId);
    if (!room) {
      res.status(400).json({ success: false, error: "Meeting room not found" });
      return;
    }

    // Validate room is active
    if (!room.isActive) {
      res.status(400).json({ success: false, error: "This meeting room is currently unavailable" });
      return;
    }

    // Validate time slot
    if (!timeSlots.includes(validated.timeSlot)) {
      res.status(400).json({ success: false, error: "Invalid time slot" });
      return;
    }

    // Validate attendees vs room capacity
    if (validated.attendees > room.capacity) {
      res.status(400).json({
        success: false,
        error: `Room capacity is ${room.capacity}. Please select a larger room or reduce attendees.`,
      });
      return;
    }

    // Check for date/time/room conflicts
    const conflict = bookings.find(
      (b) =>
        b.date === validated.date &&
        b.timeSlot === validated.timeSlot &&
        b.roomId === validated.roomId &&
        b.status !== "CANCELLED"
    );

    if (conflict) {
      res.status(409).json({
        success: false,
        error: "This time slot is already booked for the selected room. Please choose a different time or room.",
      });
      return;
    }

    // Validate date is in the future
    const bookingDate = new Date(validated.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (bookingDate < today) {
      res.status(400).json({ success: false, error: "Booking date must be in the future" });
      return;
    }

    const { fullName, email, phone, ...rest } = validated;
    const newBooking = {
      id: `booking-${Date.now()}`,
      referenceNumber: generateReferenceNumber(),
      guestName: fullName,
      guestEmail: email,
      guestPhone: phone,
      ...rest,
      status: "PENDING",
      createdAt: new Date(),
    };

    bookings.push(newBooking);

    res.status(201).json({
      success: true,
      data: newBooking,
      message: `Booking confirmed! Your reference number is ${newBooking.referenceNumber}`,
    });
  } catch {
    res.status(500).json({ success: false, error: "Failed to create booking" });
  }
});

export default router;
