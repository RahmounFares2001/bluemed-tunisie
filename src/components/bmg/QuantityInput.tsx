import { Minus, Plus } from "lucide-react";
import { cn } from "@/utils/cn";

export function QuantityInput({
  value,
  onChange,
  min = 1,
  max = 999,
  className,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center rounded-lg border border-border bg-white", className)}>
      <button
        type="button"
        aria-label="إنقاص الكمية"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="grid h-10 w-10 place-items-center text-foreground hover:bg-muted disabled:opacity-40"
      >
        <Minus size={16} />
      </button>
      <span className="grid h-10 min-w-[3rem] place-items-center text-sm font-bold tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="زيادة الكمية"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="grid h-10 w-10 place-items-center text-foreground hover:bg-muted disabled:opacity-40"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
