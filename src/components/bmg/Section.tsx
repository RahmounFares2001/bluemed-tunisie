import { cn } from "@/utils/cn";

export function SectionTitle({
  title,
  subtitle,
  align = "center",
  className,
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "right";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-right", className)}>
      <h2 className="text-3xl font-bold tracking-tight text-navy md:text-4xl">{title}</h2>
      <div
        className={cn(
          "mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-gold to-gold-light",
          align === "center" && "mx-auto"
        )}
      />
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function GradientDivider({ className }: { className?: string }) {
  return <div className={cn("divider-gradient", className)} />;
}
