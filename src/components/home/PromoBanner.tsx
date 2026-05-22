import { S } from "@/constants/strings";

export function PromoBanner() {
  const text = S.home.promoText;
  return (
    <div className="bg-navy py-3 text-gold">
      <div className="marquee">
        <div className="marquee__inner">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="whitespace-nowrap text-sm font-semibold">
              ✦ {text} ✦
            </span>
          ))}
        </div>
        <div className="marquee__inner" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="whitespace-nowrap text-sm font-semibold">
              ✦ {text} ✦
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
