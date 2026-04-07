import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

function Skeleton({ className, width, height }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-sm bg-black-border/60",
        "bg-[length:200%_100%] animate-shimmer",
        "bg-gradient-to-r from-black-border/60 via-black-surface/80 to-black-border/60",
        className
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
      aria-hidden="true"
    />
  );
}

export { Skeleton, type SkeletonProps };
