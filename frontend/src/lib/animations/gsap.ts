import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LUXURY_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const GSAP_LUXURY_EASE = "power4.out";
const GOLD = "#C9A84C";

let initialized = false;

export function initGSAP(): void {
  if (initialized) return;
  if (typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({
    ease: GSAP_LUXURY_EASE,
    duration: 0.8,
  });
  initialized = true;
}

export function fadeInUp(
  element: gsap.TweenTarget,
  options: {
    delay?: number;
    duration?: number;
    distance?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
): gsap.core.Tween {
  const { delay = 0, duration = 0.8, distance = 60, scrollTrigger } = options;
  return gsap.fromTo(
    element,
    { opacity: 0, y: distance },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: GSAP_LUXURY_EASE,
      scrollTrigger: scrollTrigger ?? undefined,
    }
  );
}

export function staggerReveal(
  elements: gsap.TweenTarget,
  options: {
    stagger?: number;
    delay?: number;
    duration?: number;
    distance?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
): gsap.core.Tween {
  const {
    stagger = 0.1,
    delay = 0,
    duration = 0.8,
    distance = 60,
    scrollTrigger,
  } = options;
  return gsap.fromTo(
    elements,
    { opacity: 0, y: distance },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: GSAP_LUXURY_EASE,
      scrollTrigger: scrollTrigger ?? undefined,
    }
  );
}

export function clipPathReveal(
  element: gsap.TweenTarget,
  options: {
    direction?: "left" | "right" | "top" | "bottom";
    delay?: number;
    duration?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
): gsap.core.Tween {
  const { direction = "left", delay = 0, duration = 1, scrollTrigger } = options;

  const clipPaths: Record<string, { from: string; to: string }> = {
    left: {
      from: "inset(0 100% 0 0)",
      to: "inset(0 0% 0 0)",
    },
    right: {
      from: "inset(0 0 0 100%)",
      to: "inset(0 0 0 0%)",
    },
    top: {
      from: "inset(0 0 100% 0)",
      to: "inset(0 0 0% 0)",
    },
    bottom: {
      from: "inset(100% 0 0 0)",
      to: "inset(0% 0 0 0)",
    },
  };

  const clip = clipPaths[direction];

  return gsap.fromTo(
    element,
    { clipPath: clip.from },
    {
      clipPath: clip.to,
      duration,
      delay,
      ease: GSAP_LUXURY_EASE,
      scrollTrigger: scrollTrigger ?? undefined,
    }
  );
}

export function scrollPin(
  trigger: string | Element,
  options: {
    start?: string;
    end?: string;
    pin?: boolean | string | Element;
    scrub?: boolean | number;
  } = {}
): ScrollTrigger {
  initGSAP();
  const { start = "top top", end = "+=100%", pin = true, scrub = true } = options;
  return ScrollTrigger.create({
    trigger,
    start,
    end,
    pin,
    scrub,
  });
}

export function counterAnimation(
  element: gsap.TweenTarget,
  options: {
    from?: number;
    to: number;
    duration?: number;
    delay?: number;
    scrollTrigger?: ScrollTrigger.Vars;
    onUpdate?: (value: number) => void;
  }
): gsap.core.Tween {
  const { from = 0, to, duration = 2, delay = 0, scrollTrigger, onUpdate } = options;
  const obj = { value: from };

  return gsap.to(obj, {
    value: to,
    duration,
    delay,
    ease: "power2.out",
    scrollTrigger: scrollTrigger ?? undefined,
    onUpdate: () => {
      onUpdate?.(Math.round(obj.value));
    },
  });
}

export { LUXURY_EASE, GSAP_LUXURY_EASE, GOLD };
