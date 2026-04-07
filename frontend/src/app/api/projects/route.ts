import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/lib/data";
import { z } from "zod";

const projectCreateSchema = z.object({
  name: z.string().min(3),
  nameAr: z.string().min(3),
  description: z.string().min(20),
  type: z.string().min(2),
  status: z.enum(["PLANNING", "UNDER_CONSTRUCTION", "COMPLETED"]),
  location: z.string().min(3),
  totalUnits: z.number().positive(),
  launchDate: z.string(),
  completionDate: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let filtered = [...projects].filter((p) => p.isPublished);

    if (status) {
      filtered = filtered.filter(
        (p) => p.status.toLowerCase() === status.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      data: filtered,
      total: filtered.length,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = projectCreateSchema.parse(body);

    // Placeholder: In production, save to database
    const newProject = {
      id: `proj-${Date.now()}`,
      slug: validated.name.toLowerCase().replace(/\s+/g, "-"),
      ...validated,
      launchDate: new Date(validated.launchDate),
      completionDate: validated.completionDate
        ? new Date(validated.completionDate)
        : undefined,
      coverImage: "",
      gallery: [],
      isPublished: false,
      isFeatured: false,
      createdAt: new Date(),
    };

    return NextResponse.json(
      { success: true, data: newProject },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    );
  }
}
