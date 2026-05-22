"use client";

import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, ChevronDown } from "lucide-react";
import { Breadcrumb } from "@/components/bmg/Breadcrumb";
import { SectionTitle } from "@/components/bmg/Section";
import { Input, Textarea, FieldLabel } from "@/components/bmg/Input";
import { Button } from "@/components/bmg/Button";
import { S, FAQ_ITEMS } from "@/constants/strings";



export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(S.contact.form.success);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: S.nav.home, to: "/" }, { label: S.contact.title }]} />
      <div className="mt-6 text-center">
        <h1 className="text-4xl font-black text-navy">{S.contact.title}</h1>
        <p className="mt-3 text-muted-foreground">{S.contact.subtitle}</p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        {/* Info */}
        <div className="space-y-3">
          {[
            { icon: MapPin, l: S.contact.address, v: "تونس العاصمة، تونس" },
            { icon: Phone, l: S.contact.phone, v: "+216 000 000 000" },
            { icon: MessageCircle, l: S.contact.whatsapp, v: "+216 000 000 000" },
            { icon: Mail, l: S.contact.email, v: "contact@bluemed" },
            { icon: Clock, l: S.contact.hours, v: S.contact.hoursValue },
          ].map((it, i) => {
            const Icon = it.icon;
            return (
              <div key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-navy text-white">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{it.l}</p>
                  <p className="mt-1 font-bold text-navy">{it.v}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-soft)]">
          <h2 className="text-xl font-bold text-navy">أرسل لنا رسالة</h2>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel required>{S.contact.form.name}</FieldLabel>
                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <FieldLabel required>{S.contact.form.email}</FieldLabel>
                <Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div>
              <FieldLabel required>{S.contact.form.subject}</FieldLabel>
              <Input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
            </div>
            <div>
              <FieldLabel required>{S.contact.form.message}</FieldLabel>
              <Textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>
            <Button variant="primary" size="lg" type="submit" className="w-full">
              <Send size={18} /> {S.contact.form.send}
            </Button>
          </form>
        </div>
      </div>

      {/* Map (embed placeholder) */}
      {/* <div className="mt-12 overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
        <iframe
          title="موقعنا"
          src="https://www.openstreetmap.org/export/embed.html?bbox=2.9%2C36.7%2C3.2%2C36.8&layer=mapnik"
          className="block h-[400px] w-full"
          loading="lazy"
        />
      </div> */}

      {/* FAQ */}
      <section className="mt-20">
        <SectionTitle title={S.contact.faqTitle} />
        <div className="mx-auto mt-10 max-w-3xl space-y-2">
          {FAQ_ITEMS.map((it, i) => (
            <FaqRow key={i} q={it.q} a={it.a} />
          ))}
        </div>
      </section>
    </div>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between px-5 py-4 text-right">
        <span className="text-sm font-bold text-navy sm:text-base">{q}</span>
        <ChevronDown size={18} className={`text-primary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
