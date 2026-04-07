import { Router, Request, Response } from "express";
import { projects } from "../lib/data";
import { z } from "zod";

const router = Router();

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

// GET /api/projects — list with status filter
router.get("/", (req: Request, res: Response): void => {
  try {
    const { status } = req.query;

    let filtered = [...projects].filter((p) => p.isPublished);

    if (status) {
      filtered = filtered.filter(
        (p) => p.status.toLowerCase() === (status as string).toLowerCase()
      );
    }

    res.json({
      success: true,
      data: filtered,
      total: filtered.length,
    });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch projects" });
  }
});

// POST /api/projects — create
router.post("/", (req: Request, res: Response): void => {
  try {
    const result = projectCreateSchema.safeParse(req.body);
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

    const validated = result.data;
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

    res.status(201).json({ success: true, data: newProject });
  } catch {
    res.status(500).json({ success: false, error: "Failed to create project" });
  }
});

export default router;
