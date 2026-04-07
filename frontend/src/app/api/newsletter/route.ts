import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { z } from "zod";

// In-memory store for demo purposes
const subscribers: Array<{
  id: string;
  email: string;
  confirmed: boolean;
  token: string;
  createdAt: Date;
}> = [];

function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = newsletterSchema.parse(body);

    // Check for duplicate
    const existing = subscribers.find((s) => s.email === validated.email);
    if (existing) {
      if (existing.confirmed) {
        return NextResponse.json(
          {
            success: false,
            error: "This email is already subscribed to our newsletter.",
          },
          { status: 409 }
        );
      }
      // Resend confirmation for unconfirmed subscribers
      return NextResponse.json({
        success: true,
        message:
          "A confirmation email has been resent. Please check your inbox.",
      });
    }

    const token = generateToken();
    const newSubscriber = {
      id: `sub-${Date.now()}`,
      email: validated.email,
      confirmed: false,
      token,
      createdAt: new Date(),
    };

    subscribers.push(newSubscriber);

    // Placeholder: In production, send confirmation email
    // with link: /newsletter/confirm?token=${token}

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for subscribing! Please check your email to confirm your subscription.",
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
      { success: false, error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
