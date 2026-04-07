import { NextRequest, NextResponse } from "next/server";
import { meetingRooms, timeSlots } from "@/lib/data";
import { bookingFormSchema } from "@/lib/validations";
import { z } from "zod";

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const roomId = searchParams.get("roomId");

    let filtered = [...bookings];

    if (date) {
      filtered = filtered.filter((b) => b.date === date);
    }

    if (roomId) {
      filtered = filtered.filter((b) => b.roomId === roomId);
    }

    return NextResponse.json({
      success: true,
      data: filtered,
      total: filtered.length,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = fullBookingSchema.parse(body);

    // Validate room exists
    const room = meetingRooms.find((r) => r.id === validated.roomId);
    if (!room) {
      return NextResponse.json(
        { success: false, error: "Meeting room not found" },
        { status: 400 }
      );
    }

    // Validate room is active
    if (!room.isActive) {
      return NextResponse.json(
        { success: false, error: "This meeting room is currently unavailable" },
        { status: 400 }
      );
    }

    // Validate time slot
    if (!timeSlots.includes(validated.timeSlot)) {
      return NextResponse.json(
        { success: false, error: "Invalid time slot" },
        { status: 400 }
      );
    }

    // Validate attendees vs room capacity
    if (validated.attendees > room.capacity) {
      return NextResponse.json(
        {
          success: false,
          error: `Room capacity is ${room.capacity}. Please select a larger room or reduce attendees.`,
        },
        { status: 400 }
      );
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
      return NextResponse.json(
        {
          success: false,
          error:
            "This time slot is already booked for the selected room. Please choose a different time or room.",
        },
        { status: 409 }
      );
    }

    // Validate date is in the future
    const bookingDate = new Date(validated.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (bookingDate < today) {
      return NextResponse.json(
        { success: false, error: "Booking date must be in the future" },
        { status: 400 }
      );
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

    return NextResponse.json(
      {
        success: true,
        data: newBooking,
        message: `Booking confirmed! Your reference number is ${newBooking.referenceNumber}`,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
