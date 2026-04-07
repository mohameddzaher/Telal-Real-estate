import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "gold" | "success" | "error" | "neutral";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantStyles: Record<BadgeVariant, string> = {
  gold: "bg-gold/10 text-gold border-gold/20",
  success: "bg-success/10 text-success border-success/20",
  error: "bg-error/10 text-error border-error/20",
  neutral: "bg-white/5 text-gray-light border-white/10",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[0.6rem]",
  md: "px-3 py-1 text-xs",
  lg: "px-4 py-1.5 text-sm",
};

function Badge({
  variant = "gold",
  size = "md",
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-accent uppercase tracking-wider border rounded-sm",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export { Badge, type BadgeProps, type BadgeVariant, type BadgeSize };
