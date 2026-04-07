"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { isReducedMotion } from "@/lib/utils";
import { useAppStore } from "@/store";

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState(true);
  const setPreloaderComplete = useAppStore((s) => s.setPreloaderComplete);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("telal_visited")) {
      setShow(false);
      setPreloaderComplete();
      return;
    }

    if (isReducedMotion()) {
      setShow(false);
      setPreloaderComplete();
      sessionStorage.setItem("telal_visited", "true");
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setShow(false);
        setPreloaderComplete();
        sessionStorage.setItem("telal_visited", "true");
      },
    });

    // Counter animation 00 → 100
    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(counter.value)).padStart(2, "0");
        }
      },
    });

    // Text fade in
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      0.3
    );

    // Golden line sweep at the end
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
      1.8
    );

    // Fade out everything
    tl.to(preloaderRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    }, 2.3);

    return () => { tl.kill(); };
  }, [setPreloaderComplete]);

  if (!show) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
    >
      {/* TELAL text */}
      <span
        ref={textRef}
        className="font-display text-4xl md:text-6xl text-gold tracking-[0.4em] uppercase opacity-0 select-none"
      >
        TELAL
      </span>

      {/* Golden line */}
      <div
        ref={lineRef}
        className="absolute bottom-1/2 left-1/4 right-1/4 h-px bg-gold origin-left"
        style={{ transform: "scaleX(0)", marginTop: "60px" }}
      />

      {/* Counter */}
      <span
        ref={counterRef}
        className="absolute bottom-8 right-8 font-display text-xl text-gold/40"
      >
        00
      </span>
    </div>
  );
}
