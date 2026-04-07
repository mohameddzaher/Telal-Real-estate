import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const { clientName, clientTitle, content, rating } = testimonial;

  return (
    <div
      className={cn(
        "relative bg-black-surface border border-black-border rounded-sm p-6 md:p-8",
        "transition-all duration-500 ease-luxury",
        "hover:border-gold/20 hover:shadow-[0_8px_40px_rgba(201,168,76,0.06)]",
        className
      )}
    >
      {/* Gold quote mark */}
      <Quote className="h-8 w-8 text-gold/30 mb-4 rotate-180" />

      {/* Content */}
      <blockquote className="text-sm md:text-base text-gray-light font-body leading-relaxed mb-6">
        &ldquo;{content}&rdquo;
      </blockquote>

      {/* Rating stars */}
      {rating > 0 && (
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={cn(
                "h-3.5 w-3.5",
                i < rating ? "text-gold" : "text-black-border"
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="h-px w-12 bg-gold/30 mb-4" />

      {/* Author */}
      <div>
        <p className="text-sm font-display text-white">{clientName}</p>
        {clientTitle && (
          <p className="text-xs text-gold/70 font-body mt-0.5">{clientTitle}</p>
        )}
      </div>

      {/* Decorative closing quote */}
      <Quote className="absolute bottom-6 right-6 h-6 w-6 text-gold/10" />
    </div>
  );
}

export { TestimonialCard, type TestimonialCardProps };
