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
  const logoRef = useRef<HTMLImageElement>(null);

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
    const logo = logoRef.current;
    if (!overlay || !counter || !line || !logo) return;

    document.body.style.overflow = "hidden";

    gsap.set(logo, { opacity: 0, scale: 0.8 });

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

    // Fade in and scale up logo
    tl.to(
      logo,
      {
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: "power2.out",
      },
      0.2
    );

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
      {/* TELAL Logo */}
      <img
        ref={logoRef}
        src="/images/square-512.png"
        alt="Telal Development"
        className="w-24 h-24 object-contain"
      />

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
