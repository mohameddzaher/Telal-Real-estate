import { NextRequest, NextResponse } from "next/server";
import { properties } from "@/lib/data";
import { propertySchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const city = searchParams.get("city");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");

    let filtered = [...properties].filter((p) => p.isPublished);

    if (type) {
      filtered = filtered.filter(
        (p) => p.type.toLowerCase() === type.toLowerCase()
      );
    }

    if (status) {
      filtered = filtered.filter(
        (p) => p.status.toLowerCase() === status.toLowerCase()
      );
    }

    if (city) {
      filtered = filtered.filter(
        (p) => p.city.toLowerCase() === city.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );
    }

    if (sort) {
      switch (sort) {
        case "price_asc":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "area_asc":
          filtered.sort((a, b) => a.area - b.area);
          break;
        case "area_desc":
          filtered.sort((a, b) => b.area - a.area);
          break;
        case "newest":
          filtered.sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
          );
          break;
        case "popular":
          filtered.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
          break;
        default:
          break;
      }
    }

    return NextResponse.json({
      success: true,
      data: filtered,
      total: filtered.length,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = propertySchema.parse(body);

    // Placeholder: In production, save to database
    const newProperty = {
      id: `prop-${Date.now()}`,
      slug: validated.title.toLowerCase().replace(/\s+/g, "-"),
      ...validated,
      images: [],
      videos: [],
      floorPlans: [],
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json(
      { success: true, data: newProperty },
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
      { success: false, error: "Failed to create property" },
      { status: 500 }
    );
  }
}
