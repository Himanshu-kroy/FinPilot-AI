import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

/**
 * StatCard — Compact metric display used in dashboard and hero illustration.
 *
 * Props:
 *   label       — metric name
 *   value       — formatted value string
 *   change      — optional delta string, e.g. "+12.4%"
 *   changeType  — "positive" | "negative" | "neutral"
 *   icon        — optional Lucide icon component
 *   className   — extra Tailwind classes
 */
export default function StatCard({
  label,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  className,
  ...props
}) {
  const changeBadgeVariant =
    changeType === "positive" ? "success" :
    changeType === "negative" ? "danger"  : "default";

  return (
    <div
      className={cn(
        "bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl p-4",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-xs font-medium text-text-secondary tracking-wide">
          {label}
        </span>
        {Icon && (
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[rgba(15,98,254,0.12)]">
            <Icon size={14} className="text-ibm-blue-light" strokeWidth={1.8} />
          </span>
        )}
      </div>
      <p className="text-xl font-semibold text-white leading-none mb-2">{value}</p>
      {change && (
        <Badge variant={changeBadgeVariant} className="text-2xs">
          {change}
        </Badge>
      )}
    </div>
  );
}
