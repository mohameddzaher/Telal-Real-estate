import { Router, Request, Response } from "express";
import { contactFormSchema } from "../lib/validations";

const router = Router();

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

// GET /api/leads — list with filters
router.get("/", (req: Request, res: Response): void => {
  try {
    const { status, source } = req.query;

    let filtered = [...leads];

    if (status) {
      filtered = filtered.filter(
        (l) => l.status.toLowerCase() === (status as string).toLowerCase()
      );
    }

    if (source) {
      filtered = filtered.filter(
        (l) => l.source.toLowerCase() === (source as string).toLowerCase()
      );
    }

    res.json({
      success: true,
      data: filtered,
      total: filtered.length,
    });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch leads" });
  }
});

// POST /api/leads — create from contact form
router.post("/", (req: Request, res: Response): void => {
  try {
    const result = contactFormSchema.safeParse(req.body);
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
    const newLead = {
      id: `lead-${Date.now()}`,
      ...validated,
      status: "NEW",
      source: req.body.source || "website",
      createdAt: new Date(),
    };

    leads.push(newLead);

    res.status(201).json({
      success: true,
      data: newLead,
      message: "Thank you for your inquiry. Our team will contact you shortly.",
    });
  } catch {
    res.status(500).json({ success: false, error: "Failed to create lead" });
  }
});

export default router;
