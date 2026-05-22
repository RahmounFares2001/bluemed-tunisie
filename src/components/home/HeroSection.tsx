"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { S } from "@/constants/strings";
import { Button } from "@/components/bmg/Button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-marble">
      <div className="container mx-auto grid items-center gap-10 px-4 py-20 lg:grid-cols-2 lg:py-28">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center lg:text-right"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-bold text-primary backdrop-blur">
            <Sparkles size={14} className="text-gold" /> منذ 2018 — في تونس
          </span>
          <h1 className="mt-5 text-4xl font-black leading-tight text-navy sm:text-5xl lg:text-6xl">
            {S.brand.tagline}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground lg:mx-0 lg:text-lg">
            {S.brand.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button variant="primary" size="lg" asChild>
              <Link href="/shop">
                {S.cta.shopNow} <ArrowLeft size={18} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/shop">{S.cta.explore}</Link>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6 lg:max-w-md">
            {[
              { v: "+500", l: "منتج" },
              { v: "+1000", l: "عميل" },
              { v: "58", l: "ولاية" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-2xl font-black text-primary">{s.v}</p>
                <p className="text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?w=1000&q=80&auto=format&fit=crop"
              alt="ديكور فاخر"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-navy/30 via-transparent to-transparent" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -bottom-4 -right-4 hidden rounded-2xl bg-white/90 p-4 shadow-2xl backdrop-blur md:block"
          >
            <p className="text-xs text-muted-foreground">جودة معروفة</p>
            <p className="text-lg font-black text-primary">★ 4.9 / 5</p>
            <p className="text-xs text-muted-foreground">من +1000 عميل</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -top-4 -left-4 hidden rounded-2xl bg-gold p-4 text-navy shadow-2xl md:block"
          >
            <p className="text-xs font-bold">خصم حتى</p>
            <p className="text-2xl font-black">20%</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
