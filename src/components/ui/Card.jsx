import { cn } from "@/lib/utils";

/**
 * Card — Glass surface container.
 *
 * variant: "glass" | "solid" | "bordered"
 */
export default function Card({ children, className, variant = "glass", ...props }) {
  const variants = {
    glass:
      "bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] backdrop-blur-sm",
    solid:
      "bg-[#111111] border border-[rgba(255,255,255,0.08)]",
    bordered:
      "bg-transparent border border-[rgba(255,255,255,0.10)]",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * CardHeader — Optional structured header inside a Card.
 */
export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

/**
 * CardTitle — Semantic heading inside a Card.
 */
export function CardTitle({ children, className, ...props }) {
  return (
    <h3 className={cn("text-base font-semibold text-white", className)} {...props}>
      {children}
    </h3>
  );
}
