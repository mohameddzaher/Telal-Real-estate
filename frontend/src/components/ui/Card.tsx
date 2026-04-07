import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

function Card({ className, children, hover = false, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-sm bg-black-surface border border-black-border",
        "transition-all duration-500 ease-luxury",
        hover && [
          "hover:scale-[1.02] hover:border-gold/20",
          "hover:shadow-[0_8px_40px_rgba(201,168,76,0.08)]",
        ],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export { Card, type CardProps };
