import { Router, Request, Response } from "express";
import { contactFormSchema } from "../lib/validations";

const router = Router();

// POST /api/contact — submit contact form, create lead
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

    res.json({
      success: true,
      message:
        "Thank you for contacting Telal Development. Our team will respond within 24 hours.",
      data: { id: lead.id },
    });
  } catch {
    res.status(500).json({ success: false, error: "Failed to submit contact form" });
  }
});

export default router;
