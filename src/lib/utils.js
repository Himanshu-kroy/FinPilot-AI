import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn() — Merge Tailwind classes safely.
 *
 * Combines clsx (conditional classes) with tailwind-merge
 * (deduplication of conflicting Tailwind utilities).
 *
 * Usage:
 *   cn("px-4 py-2", isActive && "bg-ibm-blue", className)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * formatCurrency() — Format a number as USD currency string.
 *
 * Usage:
 *   formatCurrency(1234567.89)  →  "$1,234,567.89"
 */
export function formatCurrency(value, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * formatPercent() — Format a number as a percentage string.
 *
 * Usage:
 *   formatPercent(0.0742)  →  "7.42%"
 */
export function formatPercent(value, decimals = 1) {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * truncate() — Clamp a string to maxLength with ellipsis.
 */
export function truncate(str, maxLength = 80) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}
