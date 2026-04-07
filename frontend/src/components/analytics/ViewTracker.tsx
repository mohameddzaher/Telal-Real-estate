"use client";

import { useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://telal-bakend.onrender.com";

export function ViewTracker({ path }: { path: string }) {
  useEffect(() => {
    fetch(`${API_URL}/api/analytics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: path, referrer: document.referrer }),
    }).catch(() => {}); // silent fail
  }, [path]);
  return null;
}
