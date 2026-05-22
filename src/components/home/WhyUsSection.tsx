"use client";
import { Award, DollarSign, Truck, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/bmg/Section";
import { S } from "@/constants/strings";

const ICONS = [Award, DollarSign, Truck, Headphones];

export function WhyUsSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <SectionTitle title={S.home.whyTitle} />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {S.home.why.map((w, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-border bg-white p-6 text-center transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary/10 to-gold/10 text-primary transition-colors group-hover:from-primary group-hover:to-navy group-hover:text-white">
                <Icon size={28} />
              </div>
              <h3 className="text-lg font-bold text-navy">{w.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export function StatsStrip() {
  return (
    <section className="bg-navy py-14 text-white">
      <div className="container mx-auto grid grid-cols-2 gap-6 px-4 md:grid-cols-4">
        {S.home.stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <p className="text-4xl font-black text-gold md:text-5xl">{s.v}</p>
            <p className="mt-1 text-sm text-white/70">{s.l}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
