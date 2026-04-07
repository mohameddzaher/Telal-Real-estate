"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { isReducedMotion } from "@/lib/utils";

const CURSOR_SIZE = 32;
const CURSOR_SIZE_HOVER = 64;
const LERP = 0.15;
const GOLD = "#C9A84C";

export default function GoldenCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isReducedMotion()) return;

    // Detect touch device
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    setVisible(true);

    const cursor = cursorRef.current;
    if (!cursor) return;

    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const onMouseEnterInteractive = () => {
      gsap.to(cursor, {
        width: CURSOR_SIZE_HOVER,
        height: CURSOR_SIZE_HOVER,
        borderWidth: 1,
        opacity: 0.6,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(cursor, {
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        borderWidth: 1.5,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * LERP;
      pos.y += (target.y - pos.y) * LERP;

      if (cursor) {
        cursor.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    // Bind to interactive elements
    const bindInteractives = () => {
      const elements = document.querySelectorAll<HTMLElement>(
        "a, button, [role='button'], input[type='submit'], [data-cursor-hover]"
      );
      elements.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
      return elements;
    };

    document.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(tick);

    // Bind interactives after a short delay for DOM readiness and on mutations
    let elements = bindInteractives();

    const observer = new MutationObserver(() => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      elements = bindInteractives();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full mix-blend-difference"
      style={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        border: `1.5px solid ${GOLD}`,
        willChange: "transform, width, height",
        transition: "none",
      }}
      aria-hidden="true"
    />
  );
}
