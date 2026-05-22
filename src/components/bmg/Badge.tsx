import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

type BadgeVariant = "new" | "sale" | "best" | "featured" | "neutral" | "success" | "warning" | "danger" | "info" | "purple";

const VARIANTS: Record<BadgeVariant, string> = {
  new: "bg-primary text-white",
  sale: "bg-destructive text-white",
  best: "bg-gold text-navy",
  featured: "bg-navy text-white",
  neutral: "bg-muted text-foreground",
  success: "bg-success/15 text-success border border-success/30",
  warning: "bg-amber-100 text-amber-800 border border-amber-300",
  danger: "bg-destructive/15 text-destructive border border-destructive/30",
  info: "bg-primary/15 text-primary border border-primary/30",
  purple: "bg-purple-100 text-purple-800 border border-purple-300",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
