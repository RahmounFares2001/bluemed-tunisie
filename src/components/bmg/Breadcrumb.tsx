import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="مسار التنقل" className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
      {items.map((c, i) => (
        <Fragment key={i}>
          {i > 0 && <ChevronLeft size={14} className="rotate-180 opacity-50" />}
          {c.to && i < items.length - 1 ? (
            <Link href={c.to} className="transition-colors hover:text-primary">
              {c.label}
            </Link>
          ) : (
            <span className="font-bold text-foreground">{c.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
