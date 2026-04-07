import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { loginSchema } from "../lib/validations";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

// Demo users (matching frontend NextAuth config)
const demoUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@telaldevelopment.com",
    password: "admin123",
    role: "SUPER_ADMIN",
  },
  {
    id: "2",
    name: "Sales Agent",
    email: "agent@telaldevelopment.com",
    password: "agent123",
    role: "AGENT",
  },
  {
    id: "3",
    name: "Demo Client",
    email: "client@telaldevelopment.com",
    password: "client123",
    role: "CLIENT",
  },
];

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const JWT_EXPIRES_IN = "24h";

// POST /api/auth/login
router.post("/login", (req: Request, res: Response): void => {
  try {
    const result = loginSchema.safeParse(req.body);
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

    const { email, password } = result.data;

    // Find demo user (plain text comparison for demo accounts)
    const user = demoUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch {
    res.status(500).json({ success: false, error: "Login failed" });
  }
});

// POST /api/auth/register — placeholder
router.post("/register", (req: Request, res: Response): void => {
  try {
    // Placeholder: In production, create user in database
    res.status(501).json({
      success: false,
      error: "Registration is not yet implemented. Please contact admin for account creation.",
    });
  } catch {
    res.status(500).json({ success: false, error: "Registration failed" });
  }
});

// POST /api/auth/forgot-password — placeholder
router.post("/forgot-password", (req: Request, res: Response): void => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ success: false, error: "Email is required" });
      return;
    }

    // Placeholder: In production, send reset email
    res.json({
      success: true,
      message: "If an account with that email exists, a password reset link has been sent.",
    });
  } catch {
    res.status(500).json({ success: false, error: "Failed to process password reset" });
  }
});

// GET /api/auth/me — get current user from JWT
router.get("/me", authenticate, (req: AuthRequest, res: Response): void => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: "Authentication required" });
      return;
    }

    const user = demoUsers.find((u) => u.id === req.user!.id);
    if (!user) {
      res.status(404).json({ success: false, error: "User not found" });
      return;
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch user" });
  }
});

export default router;
