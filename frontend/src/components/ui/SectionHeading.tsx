import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-accent uppercase tracking-[0.25em] text-gold mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-display text-white leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm md:text-base text-gray-light font-body leading-relaxed">
          {description}
        </p>
      )}
      {/* Gold accent line */}
      <div
        className={cn(
          "mt-6 h-px w-16 bg-gold/40",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}

export { SectionHeading, type SectionHeadingProps };
