"use client";

import { forwardRef, useRef, useCallback, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "filled" | "ghost" | "text";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  filled:
    "bg-gold text-black-deep font-semibold hover:bg-gold-light active:bg-gold-muted shadow-[0_0_20px_rgba(201,168,76,0.15)]",
  ghost:
    "border border-gold/40 text-gold bg-transparent hover:border-gold hover:bg-gold/5 active:bg-gold/10",
  text: "text-gold bg-transparent hover:text-gold-light active:text-gold-muted underline-offset-4 hover:underline",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs tracking-wider",
  md: "px-6 py-3 text-sm tracking-wider",
  lg: "px-8 py-4 text-base tracking-widest",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "filled",
      size = "md",
      magnetic = false,
      className,
      children,
      onMouseMove,
      onMouseLeave,
      ...rest
    },
    ref
  ) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    const buttonRef = (ref as React.RefObject<HTMLButtonElement>) || innerRef;

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!magnetic || !buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        buttonRef.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        onMouseMove?.(e);
      },
      [magnetic, buttonRef, onMouseMove]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!magnetic || !buttonRef.current) return;
        buttonRef.current.style.transform = "translate(0, 0)";
        onMouseLeave?.(e);
      },
      [magnetic, buttonRef, onMouseLeave]
    );

    return (
      <button
        ref={buttonRef}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 font-accent uppercase",
          "transition-all duration-500 ease-luxury",
          "disabled:opacity-40 disabled:pointer-events-none",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black-deep",
          variantStyles[variant],
          sizeStyles[size],
          magnetic && "transition-transform duration-300 ease-luxury",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
