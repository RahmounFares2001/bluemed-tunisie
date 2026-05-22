"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionTitle } from "@/components/bmg/Section";
import { StarRating } from "@/components/bmg/StarRating";
import { TESTIMONIALS } from "@/data/testimonials";
import { S } from "@/constants/strings";

export function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const visible = [
    TESTIMONIALS[idx % TESTIMONIALS.length],
    TESTIMONIALS[(idx + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(idx + 2) % TESTIMONIALS.length],
  ];

  return (
    <section className="bg-surface-warm/60 py-20">
      <div className="container mx-auto px-4">
        <SectionTitle title={S.home.testimonialsTitle} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((t, i) => (
              <motion.div
                key={`${t.id}-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)]"
              >
                <Quote className="absolute right-4 top-4 text-gold/30" size={40} />
                <StarRating value={t.rating} />
                <p className="mt-4 text-sm leading-relaxed text-foreground">"{t.text}"</p>
                <div className="mt-5 border-t border-border pt-4">
                  <p className="font-bold text-navy">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.wilaya}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              aria-label={`الانتقال للتقييم ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-primary" : "w-2 bg-border"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function BrandsStrip() {
  const brands = ["LUXURY DECOR", "MARBLE CO.", "WOOD CRAFT", "INTERIOR PLUS", "ARTISAN", "ELITE TILES", "MEDITERRANEAN", "PRESTIGE"];
  return (
    <section className="border-y border-border bg-white py-10">
      <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
        {S.home.brandsTitle}
      </p>
      <div className="marquee">
        <div className="marquee__inner">
          {brands.map((b, i) => (
            <span key={i} className="whitespace-nowrap text-2xl font-black tracking-tight text-navy/30">
              {b}
            </span>
          ))}
        </div>
        <div className="marquee__inner" aria-hidden="true">
          {brands.map((b, i) => (
            <span key={i} className="whitespace-nowrap text-2xl font-black tracking-tight text-navy/30">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
