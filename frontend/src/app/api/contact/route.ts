import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = contactFormSchema.parse(body);

    // Create a lead internally
    const lead = {
      id: `lead-${Date.now()}`,
      ...validated,
      status: "NEW",
      source: "contact_form",
      createdAt: new Date(),
    };

    // Placeholder: In production, save lead to database
    // Placeholder: In production, send notification email to team
    // Placeholder: In production, send confirmation email to user

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for contacting Telal Development. Our team will respond within 24 hours.",
        data: { id: lead.id },
      },
      { status: 200 }
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
      { success: false, error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
