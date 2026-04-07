"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  animated?: boolean;
  className?: string;
}

function AccordionRow({
  item,
  isOpen,
  onToggle,
  animated,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  animated: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const animateOpen = useCallback(() => {
    const content = contentRef.current;
    const inner = innerRef.current;
    if (!content || !inner || !animated) return;

    if (typeof window !== "undefined") {
      import("gsap").then(({ gsap }) => {
        const height = inner.scrollHeight;
        gsap.to(content, {
          height,
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => {
            content.style.height = "auto";
          },
        });
        gsap.to(inner, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.out",
        });
      });
    }
  }, [animated]);

  const animateClose = useCallback(() => {
    const content = contentRef.current;
    const inner = innerRef.current;
    if (!content || !inner || !animated) return;

    if (typeof window !== "undefined") {
      import("gsap").then(({ gsap }) => {
        gsap.to(inner, {
          opacity: 0,
          y: -8,
          duration: 0.2,
          ease: "power2.in",
        });
        gsap.to(content, {
          height: 0,
          duration: 0.4,
          delay: 0.1,
          ease: "power3.inOut",
        });
      });
    }
  }, [animated]);

  const handleToggle = useCallback(() => {
    if (!isOpen) {
      animateOpen();
    } else {
      animateClose();
    }
    onToggle();
  }, [isOpen, onToggle, animateOpen, animateClose]);

  return (
    <div className="border-b border-black-border last:border-b-0">
      <button
        onClick={handleToggle}
        className={cn(
          "flex w-full items-center justify-between py-5 text-left",
          "transition-colors duration-300",
          "hover:text-gold focus-visible:outline-none focus-visible:text-gold",
          isOpen ? "text-gold" : "text-white"
        )}
        aria-expanded={isOpen}
      >
        <span className="text-sm font-body pr-4">{item.question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-gold/60 transition-transform duration-500 ease-luxury",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: animated ? 0 : isOpen ? "auto" : 0 }}
      >
        <div
          ref={innerRef}
          className="pb-5"
          style={animated ? { opacity: 0, transform: "translateY(-8px)" } : undefined}
        >
          <p className="text-sm text-gray-light leading-relaxed font-body">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function Accordion({ items, animated = true, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("divide-y divide-black-border", className)}>
      {items.map((item, index) => (
        <AccordionRow
          key={index}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          animated={animated}
        />
      ))}
    </div>
  );
}

export { Accordion, type AccordionProps, type AccordionItem };
