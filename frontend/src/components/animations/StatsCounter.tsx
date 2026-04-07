"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "@/lib/utils";

interface StatsCounterProps {
  from?: number;
  to: number;
  suffix?: string;
  prefix?: string;
  label?: string;
  duration?: number;
  className?: string;
}

export default function StatsCounter({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  label,
  duration = 2,
  className = "",
}: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    if (!ref.current || !numberRef.current) return;

    if (isReducedMotion()) {
      setDisplayValue(to);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const obj = { value: from };

    const tween = gsap.to(obj, {
      value: to,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        setDisplayValue(Math.round(obj.value));
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [from, to, duration]);

  return (
    <div ref={ref} className={className}>
      <span ref={numberRef} className="font-display text-4xl md:text-display text-gold tabular-nums">
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </span>
      {label && (
        <p className="font-body text-sm md:text-base text-gray-light mt-2 uppercase tracking-wider">
          {label}
        </p>
      )}
    </div>
  );
}
