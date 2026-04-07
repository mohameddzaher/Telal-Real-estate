import { Router, Request, Response } from "express";
import { z } from "zod";

const router = Router();

const pageViewSchema = z.object({
  page: z.string().min(1),
  referrer: z.string().optional(),
  userAgent: z.string().optional(),
  sessionId: z.string().optional(),
});

// In-memory analytics store for demo
const pageViews: Array<{
  id: string;
  page: string;
  referrer?: string;
  userAgent?: string;
  sessionId?: string;
  timestamp: Date;
}> = [];

// GET /api/analytics — mock analytics data
router.get("/", (_req: Request, res: Response): void => {
  try {
    const analytics = {
      overview: {
        totalVisitors: 12847,
        uniqueVisitors: 8234,
        pageViews: 34521,
        avgSessionDuration: "3m 42s",
        bounceRate: "32.4%",
      },
      trafficSources: [
        { source: "Direct", visits: 4120, percentage: 32.1 },
        { source: "Google Search", visits: 3856, percentage: 30.0 },
        { source: "Social Media", visits: 2341, percentage: 18.2 },
        { source: "Referral", visits: 1567, percentage: 12.2 },
        { source: "Email Campaign", visits: 963, percentage: 7.5 },
      ],
      topPages: [
        { page: "/", views: 8234, uniqueViews: 6123 },
        { page: "/properties", views: 5621, uniqueViews: 4102 },
        { page: "/projects", views: 3456, uniqueViews: 2890 },
        { page: "/about", views: 2134, uniqueViews: 1876 },
        { page: "/contact", views: 1987, uniqueViews: 1654 },
        { page: "/services", views: 1543, uniqueViews: 1234 },
        { page: "/booking", views: 1102, uniqueViews: 987 },
        { page: "/insights", views: 876, uniqueViews: 743 },
      ],
      dailyVisitors: [
        { date: "2024-03-25", visitors: 423 },
        { date: "2024-03-26", visitors: 467 },
        { date: "2024-03-27", visitors: 512 },
        { date: "2024-03-28", visitors: 489 },
        { date: "2024-03-29", visitors: 534 },
        { date: "2024-03-30", visitors: 321 },
        { date: "2024-03-31", visitors: 287 },
      ],
      recentPageViews: pageViews.slice(-20),
    };

    res.json({ success: true, data: analytics });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch analytics" });
  }
});

// POST /api/analytics — record page view
router.post("/", (req: Request, res: Response): void => {
  try {
    const result = pageViewSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ success: false, error: "Validation failed" });
      return;
    }

    const validated = result.data;
    const pageView = {
      id: `pv-${Date.now()}`,
      page: validated.page || "",
      referrer: validated.referrer,
      userAgent: validated.userAgent,
      sessionId: validated.sessionId,
      timestamp: new Date(),
    };

    pageViews.push(pageView as any);

    res.status(201).json({ success: true, message: "Page view recorded" });
  } catch {
    res.status(500).json({ success: false, error: "Failed to record page view" });
  }
});

export default router;
