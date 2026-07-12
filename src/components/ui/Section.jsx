import { cn } from "@/lib/utils";

/**
 * Section — Semantic page section wrapper with consistent spacing.
 */
export default function Section({ id, children, className, ...props }) {
  return (
    <section
      id={id}
      className={cn("py-20 lg:py-28", className)}
      {...props}
    >
      {children}
    </section>
  );
}

/**
 * Container — Max-width centred content wrapper.
 */
export function Container({ children, className, ...props }) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * SectionLabel — Small eyebrow label above section headings.
 */
export function SectionLabel({ children, className, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-ibm-blue mb-4",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
