import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { z } from "zod";

// In-memory store for demo purposes
const leads: Array<{
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredContact?: string;
  status: string;
  source: string;
  createdAt: Date;
}> = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const source = searchParams.get("source");

    let filtered = [...leads];

    if (status) {
      filtered = filtered.filter(
        (l) => l.status.toLowerCase() === status.toLowerCase()
      );
    }

    if (source) {
      filtered = filtered.filter(
        (l) => l.source.toLowerCase() === source.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      data: filtered,
      total: filtered.length,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = contactFormSchema.parse(body);

    const newLead = {
      id: `lead-${Date.now()}`,
      ...validated,
      status: "NEW",
      source: body.source || "website",
      createdAt: new Date(),
    };

    leads.push(newLead);

    return NextResponse.json(
      {
        success: true,
        data: newLead,
        message: "Thank you for your inquiry. Our team will contact you shortly.",
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
      { success: false, error: "Failed to create lead" },
      { status: 500 }
    );
  }
}
