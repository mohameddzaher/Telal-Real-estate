import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import propertiesRouter from "./routes/properties";
import projectsRouter from "./routes/projects";
import bookingsRouter from "./routes/bookings";
import leadsRouter from "./routes/leads";
import contactRouter from "./routes/contact";
import newsletterRouter from "./routes/newsletter";
import analyticsRouter from "./routes/analytics";
import authRouter from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 5001;

// Security
app.use(helmet());
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "http://localhost:3000",
    "https://telal.netlify.app",
    "http://localhost:3000",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: "Too many requests, please try again later" },
}));

// Body parsing
app.use(express.json({ limit: "10mb" }));

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "Telal Backend API is running", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/properties", propertiesRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/leads", leadsRouter);
app.use("/api/contact", contactRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/auth", authRouter);

// 404
app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Server error:", err.message);
  res.status(500).json({ success: false, error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`\n  Telal Backend API running on http://localhost:${PORT}`);
  console.log(`  Health: http://localhost:${PORT}/api/health\n`);
});

export default app;
