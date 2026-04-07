"use client";

import React, { useRef, useEffect, createElement } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  splitBy?: "words" | "chars";
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  tag?: keyof JSX.IntrinsicElements;
}

export default function SplitText({
  text,
  splitBy = "words",
  className = "",
  delay = 0,
  duration = 0.6,
  stagger = 0.04,
  tag: Tag = "div",
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion() || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const spans = containerRef.current.querySelectorAll<HTMLSpanElement>("[data-split]");
    if (!spans.length) return;

    gsap.set(spans, { opacity: 0, y: 30 });

    const tween = gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text, splitBy, delay, duration, stagger]);

  const reduced = isReducedMotion();

  const renderSplit = () => {
    if (splitBy === "chars") {
      return text.split("").map((char, i) => (
        <span
          key={i}
          data-split
          className="inline-block"
          style={reduced ? undefined : { opacity: 0 }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }

    return text.split(" ").map((word, i) => (
      <span
        key={i}
        data-split
        className="inline-block mr-[0.25em]"
        style={reduced ? undefined : { opacity: 0 }}
      >
        {word}
      </span>
    ));
  };

  return createElement(
    Tag,
    { ref: containerRef as React.Ref<HTMLElement>, className, "aria-label": text },
    renderSplit()
  );
}
