import { Star } from "lucide-react";
import { cn } from "@/utils/cn";

export function StarRating({
  value,
  size = 14,
  showValue = false,
  count,
  className,
}: {
  value: number;
  size?: number;
  showValue?: boolean;
  count?: number;
  className?: string;
}) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full || (i === full && half);
          return (
            <Star
              key={i}
              size={size}
              className={filled ? "fill-gold text-gold" : "text-border"}
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      {showValue && <span className="text-xs font-bold text-foreground">{value.toFixed(1)}</span>}
      {count !== undefined && <span className="text-xs text-muted-foreground">({count} تقييم)</span>}
    </div>
  );
}
