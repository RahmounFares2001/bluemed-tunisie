import { formatPrice } from "@/utils/formatPrice";
import { cn } from "@/utils/cn";

export function ProductPrice({
  price,
  salePrice,
  size = "md",
  className,
}: {
  price: number;
  salePrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const onSale = typeof salePrice === "number" && salePrice < price;
  const sizes = {
    sm: { main: "text-base", old: "text-xs" },
    md: { main: "text-lg", old: "text-sm" },
    lg: { main: "text-2xl", old: "text-base" },
  } as const;
  const s = sizes[size];
  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span className={cn("font-bold tabular-nums", s.main, onSale ? "text-destructive" : "text-navy")}>
        {formatPrice(onSale ? salePrice! : price)}
      </span>
      {onSale && (
        <span className={cn("text-muted-foreground line-through tabular-nums", s.old)}>{formatPrice(price)}</span>
      )}
    </div>
  );
}
