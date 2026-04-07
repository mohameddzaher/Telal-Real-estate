import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...rest }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-accent uppercase tracking-widest text-gray-light"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full bg-black-deep border border-black-border rounded-sm",
            "px-4 py-3 text-sm text-white font-body",
            "placeholder:text-gray-mid",
            "transition-all duration-300 ease-luxury",
            "focus:outline-none focus:border-gold/50 focus:shadow-[0_0_0_1px_rgba(201,168,76,0.2)]",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            error && "border-error/60 focus:border-error focus:shadow-[0_0_0_1px_rgba(255,68,68,0.2)]",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...rest}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-error" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-xs text-gray-mid">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, type InputProps };
