"use client";

import { useRef, useEffect, useCallback, type ReactNode } from "react";
import gsap from "gsap";
import { isReducedMotion } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  radius?: number;
  strength?: number;
  className?: string;
}

export default function MagneticButton({
  children,
  radius = 50,
  strength = 0.4,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius + Math.max(rect.width, rect.height) / 2) {
        gsap.to(ref.current, {
          x: distX * strength,
          y: distY * strength,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    },
    [radius, strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  useEffect(() => {
    if (isReducedMotion() || !ref.current) return;

    const el = ref.current;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
