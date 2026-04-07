"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { isReducedMotion } from "@/lib/utils";

const SESSION_KEY = "telal-visited";

export default function Preloader() {
  const [show, setShow] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) {
      setShow(false);
      return;
    }
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    if (isReducedMotion()) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setShow(false);
      return;
    }

    const overlay = overlayRef.current;
    const counter = counterRef.current;
    const line = lineRef.current;
    const svg = lettersRef.current;
    if (!overlay || !counter || !line || !svg) return;

    document.body.style.overflow = "hidden";

    const paths = svg.querySelectorAll<SVGPathElement>("path");
    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fill: "transparent",
      });
    });

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(SESSION_KEY, "1");
        document.body.style.overflow = "";
        setShow(false);
      },
    });

    // Counter: 00 -> 100
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: 2.0,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counter) {
          counter.textContent = String(Math.round(counterObj.value)).padStart(2, "0");
        }
      },
    }, 0);

    // Letter-by-letter SVG path draw
    paths.forEach((path, i) => {
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        0.1 + i * 0.15
      );
      tl.to(
        path,
        {
          fill: "#C9A84C",
          duration: 0.3,
          ease: "power1.in",
        },
        0.3 + i * 0.15
      );
    });

    // Golden line sweep at ~2.0s
    tl.fromTo(
      line,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.5, ease: "power4.out" },
      2.0
    );

    // Fade out overlay
    tl.to(overlay, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
    }, 2.5);

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black-DEFAULT"
      aria-hidden="true"
    >
      {/* TELAL Logo SVG - letter paths */}
      <svg
        ref={lettersRef}
        viewBox="0 0 400 80"
        className="w-[280px] md:w-[400px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* T */}
        <path
          d="M10 15 L70 15 M40 15 L40 65"
          stroke="#C9A84C"
          strokeWidth="3"
          fill="transparent"
          strokeLinecap="round"
        />
        {/* E */}
        <path
          d="M85 15 L85 65 M85 15 L125 15 M85 40 L118 40 M85 65 L125 65"
          stroke="#C9A84C"
          strokeWidth="3"
          fill="transparent"
          strokeLinecap="round"
        />
        {/* L */}
        <path
          d="M145 15 L145 65 L185 65"
          stroke="#C9A84C"
          strokeWidth="3"
          fill="transparent"
          strokeLinecap="round"
        />
        {/* A */}
        <path
          d="M215 65 L235 15 L255 65 M221 50 L249 50"
          stroke="#C9A84C"
          strokeWidth="3"
          fill="transparent"
          strokeLinecap="round"
        />
        {/* L */}
        <path
          d="M275 15 L275 65 L315 65"
          stroke="#C9A84C"
          strokeWidth="3"
          fill="transparent"
          strokeLinecap="round"
        />
      </svg>

      {/* Golden horizontal line */}
      <div
        ref={lineRef}
        className="absolute left-0 right-0 h-[1px] top-1/2 mt-[60px] bg-gold"
        style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
      />

      {/* Percentage counter */}
      <span
        ref={counterRef}
        className="absolute bottom-8 right-8 font-display text-2xl md:text-3xl text-gold tracking-widest"
      >
        00
      </span>
    </div>
  );
}
