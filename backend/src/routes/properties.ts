import { Router, Request, Response } from "express";
import { properties } from "../lib/data";
import { propertySchema } from "../lib/validations";
import { validate } from "../middleware/validate";
import { z } from "zod";

const router = Router();

// GET /api/properties — list with filters
router.get("/", (req: Request, res: Response): void => {
  try {
    const { type, status, city, search, sort } = req.query;

    let filtered = [...properties].filter((p) => p.isPublished);

    if (type) {
      filtered = filtered.filter(
        (p) => p.type.toLowerCase() === (type as string).toLowerCase()
      );
    }

    if (status) {
      filtered = filtered.filter(
        (p) => p.status.toLowerCase() === (status as string).toLowerCase()
      );
    }

    if (city) {
      filtered = filtered.filter(
        (p) => p.city.toLowerCase() === (city as string).toLowerCase()
      );
    }

    if (search) {
      const q = (search as string).toLowerCase();
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

    res.json({
      success: true,
      data: filtered,
      total: filtered.length,
    });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch properties" });
  }
});

// GET /api/properties/:id — get by ID or slug
router.get("/:id", (req: Request, res: Response): void => {
  try {
    const property = properties.find(
      (p) => p.id === req.params.id || p.slug === req.params.id
    );

    if (!property) {
      res.status(404).json({ success: false, error: "Property not found" });
      return;
    }

    res.json({ success: true, data: property });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch property" });
  }
});

// POST /api/properties — create
router.post("/", validate(propertySchema), (req: Request, res: Response): void => {
  try {
    const validated = req.body;

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

    res.status(201).json({ success: true, data: newProperty });
  } catch {
    res.status(500).json({ success: false, error: "Failed to create property" });
  }
});

// PATCH /api/properties/:id — update
router.patch("/:id", (req: Request, res: Response): void => {
  try {
    const property = properties.find((p) => p.id === req.params.id);

    if (!property) {
      res.status(404).json({ success: false, error: "Property not found" });
      return;
    }

    const result = propertySchema.partial().safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        error: "Validation failed",
        details: result.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      });
      return;
    }

    const updated = {
      ...property,
      ...result.data,
      updatedAt: new Date(),
    };

    res.json({ success: true, data: updated });
  } catch {
    res.status(500).json({ success: false, error: "Failed to update property" });
  }
});

// DELETE /api/properties/:id — delete
router.delete("/:id", (req: Request, res: Response): void => {
  try {
    const property = properties.find((p) => p.id === req.params.id);

    if (!property) {
      res.status(404).json({ success: false, error: "Property not found" });
      return;
    }

    res.json({ success: true, message: "Property deleted successfully" });
  } catch {
    res.status(500).json({ success: false, error: "Failed to delete property" });
  }
});

export default router;
