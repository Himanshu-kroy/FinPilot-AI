import { cn } from "@/lib/utils";

/**
 * Badge — Small status/label indicator.
 *
 * variant: "default" | "success" | "danger" | "warning" | "blue"
 */
export default function Badge({ children, variant = "default", className, ...props }) {
  const variants = {
    default:
      "bg-[rgba(255,255,255,0.08)] text-text-secondary border border-[rgba(255,255,255,0.10)]",
    success:
      "bg-[rgba(36,161,72,0.15)] text-success border border-[rgba(36,161,72,0.25)]",
    danger:
      "bg-[rgba(218,30,40,0.15)] text-danger border border-[rgba(218,30,40,0.25)]",
    warning:
      "bg-[rgba(241,194,27,0.15)] text-warning border border-[rgba(241,194,27,0.25)]",
    blue:
      "bg-[rgba(15,98,254,0.15)] text-ibm-blue-light border border-[rgba(15,98,254,0.25)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
