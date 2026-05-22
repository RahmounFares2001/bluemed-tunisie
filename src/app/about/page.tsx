"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "@/components/bmg/Breadcrumb";
import { SectionTitle } from "@/components/bmg/Section";
import { S } from "@/constants/strings";


const TEAM = [
  { n: "أمين بلال", r: "المؤسس والمدير التنفيذي", i: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
  { n: "سارة بن يوسف", r: "مديرة التصميم", i: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
  { n: "كريم حمدي", r: "مدير العمليات", i: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { n: "ليلى مرابط", r: "مديرة خدمة العملاء", i: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
];

export default function About() {
  return (
    <div>
      <div className="bg-marble">
        <div className="container mx-auto px-4 py-16">
          <Breadcrumb items={[{ label: S.nav.home, to: "/" }, { label: S.about.title }]} />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-black text-navy lg:text-5xl">{S.about.title}</h1>
              <p className="mt-4 text-xl font-bold text-primary">{S.about.intro}</p>
              <p className="mt-5 text-base leading-relaxed text-foreground/85">{S.about.body}</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000&q=80"
              alt="تصميم داخلي فاخر"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-20">
        <SectionTitle title="قيمنا" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {S.about.values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-white p-6 text-center"
            >
              <CheckCircle2 size={32} className="mx-auto text-gold" />
              <h3 className="mt-3 text-lg font-bold text-navy">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-surface-warm/60 py-20">
        <div className="container mx-auto px-4">
          <SectionTitle title="رحلتنا" />
          <div className="mx-auto mt-12 max-w-3xl">
            {S.about.timeline.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex gap-5 border-r-2 border-gold pr-8 pb-8 last:pb-0"
              >
                <div className="absolute right-[-9px] top-0 h-4 w-4 rounded-full bg-gold ring-4 ring-surface-warm" />
                <div>
                  <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">{t.y}</span>
                  <h4 className="mt-2 text-xl font-bold text-navy">{t.t}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{t.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="container mx-auto px-4 py-20">
        <SectionTitle title={S.about.team} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-soft)]"
            >
              <img src={m.i} alt={m.n} className="aspect-square w-full object-cover" />
              <div className="p-4 text-center">
                <p className="font-bold text-navy">{m.n}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.r}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section> */}
    </div>
  );
}
