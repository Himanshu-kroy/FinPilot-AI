import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Button — Core interactive element.
 *
 * variant: "primary" | "ghost" | "outline" | "danger"
 * size:    "sm" | "md" | "lg"
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    className,
    disabled,
    type = "button",
    ...props
  },
  ref
) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ibm-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";

  const variants = {
    primary:
      "bg-ibm-blue hover:bg-ibm-blue-dark active:scale-[0.98] text-white shadow-ibm-glow-sm hover:shadow-ibm-glow",
    ghost:
      "bg-transparent border border-[rgba(255,255,255,0.10)] hover:border-[rgba(255,255,255,0.20)] hover:bg-[rgba(255,255,255,0.04)] text-text-secondary hover:text-white",
    outline:
      "bg-transparent border border-ibm-blue text-ibm-blue hover:bg-ibm-blue hover:text-white",
    danger:
      "bg-danger hover:bg-red-700 active:scale-[0.98] text-white",
  };

  const sizes = {
    sm: "text-xs px-3.5 py-2",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-7 py-3.5",
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
