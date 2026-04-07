import { Router, Request, Response } from "express";
import { newsletterSchema } from "../lib/validations";
import { z } from "zod";

const router = Router();

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

// POST /api/newsletter — subscribe
router.post("/", (req: Request, res: Response): void => {
  try {
    const result = newsletterSchema.safeParse(req.body);
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

    // Check for duplicate
    const existing = subscribers.find((s) => s.email === validated.email);
    if (existing) {
      if (existing.confirmed) {
        res.status(409).json({
          success: false,
          error: "This email is already subscribed to our newsletter.",
        });
        return;
      }
      // Resend confirmation for unconfirmed subscribers
      res.json({
        success: true,
        message: "A confirmation email has been resent. Please check your inbox.",
      });
      return;
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

    res.status(201).json({
      success: true,
      message:
        "Thank you for subscribing! Please check your email to confirm your subscription.",
    });
  } catch {
    res.status(500).json({ success: false, error: "Failed to subscribe" });
  }
});

// GET /api/newsletter/confirm — confirm by token
router.get("/confirm", (req: Request, res: Response): void => {
  try {
    const { token } = req.query;

    if (!token) {
      res.status(400).json({
        success: false,
        error: "Confirmation token is required.",
      });
      return;
    }

    // Placeholder: In production, look up token in database and confirm subscription
    const subscriber = subscribers.find((s) => s.token === token);
    if (subscriber) {
      subscriber.confirmed = true;
    }

    res.json({
      success: true,
      message: "Subscription confirmed! You will now receive the latest updates from Telal Development.",
    });
  } catch {
    res.status(500).json({ success: false, error: "Failed to confirm subscription" });
  }
});

export default router;
