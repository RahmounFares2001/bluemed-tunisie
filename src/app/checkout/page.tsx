"use client";


import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, Wallet, MapPin, User, Edit3 } from "lucide-react";
import { Breadcrumb } from "@/components/bmg/Breadcrumb";
import { Button } from "@/components/bmg/Button";
import { Input, Textarea, NativeSelect, FieldLabel, FieldError } from "@/components/bmg/Input";
import { useCartStore } from "@/store/cartStore";
import { useOrdersStore } from "@/store/ordersStore";
import { WILAYAS } from "@/constants/wilayas";
import { S } from "@/constants/strings";
import { formatPrice } from "@/utils/formatPrice";
import { generateOrderRef } from "@/utils/generateOrderRef";
import type { CustomerInfo, Order } from "@/types/order";
import Link from "next/link";
import { useRouter } from "next/navigation";


const schema = z.object({
  fullName: z.string().min(3, S.checkout.errors.nameMin),
  phone: z.string().regex(/^0[567]\d{8}$/, S.checkout.errors.phoneInvalid),
  phoneAlt: z.string().optional().or(z.literal("")),
  wilaya: z.string().min(1, S.checkout.errors.wilayaRequired),
  city: z.string().min(2, S.checkout.errors.cityRequired),
  address: z.string().min(8, S.checkout.errors.addressMin),
  notes: z.string().optional().or(z.literal("")),
});
type FormData = z.infer<typeof schema>;

export default function Checkout() {
  const router = useRouter();

  const items = useCartStore((s) => s.items);
  const getTotals = useCartStore((s) => s.getTotals);
  const totals = getTotals();  const promoCode = useCartStore((s) => s.promoCode);
  const clearCart = useCartStore((s) => s.clear);
  const addOrder = useOrdersStore((s) => s.addOrder);

  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [info, setInfo] = useState<FormData | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", phone: "", phoneAlt: "", wilaya: "", city: "", address: "", notes: "" },
  });

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-navy">{S.cart.empty}</h1>
        <Button variant="primary" className="mt-6" asChild>
          <Link href="/shop">{S.cta.shopNow}</Link>
        </Button>
      </div>
    );
  }

  const handleStep1 = form.handleSubmit((data) => {
    setInfo(data);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const handlePlaceOrder = () => {
    if (!info) return;
    if (!agreed) {
      toast.error(S.checkout.errors.mustAgree);
      return;
    }
    const ref = generateOrderRef();
    const order: Order = {
      ref,
      customer: info as CustomerInfo,
      items: items.map((i) => ({ productId: i.productId, name: i.name, image: i.image, price: i.price, quantity: i.quantity })),
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      discount: totals.discount,
      total: totals.total,
      promoCode: promoCode ?? undefined,
      status: "new",
      createdAt: new Date().toISOString(),
      paymentMethod: "cod",
    };
    addOrder(order);
    // persist last order for confirmation page
    try {
      localStorage.setItem("bmg_last_order", JSON.stringify(order));
    } catch {}
    clearCart();
    router.push("/success");
};

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: S.nav.home, to: "/" }, { label: S.cart.title, to: "/cart" }, { label: S.checkout.title }]} />
      <h1 className="mt-4 text-3xl font-black text-navy">{S.checkout.title}</h1>

      <StepIndicator step={step} />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-soft)]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleStep1}
                className="space-y-4"
              >
                <h2 className="text-xl font-bold text-navy">
                  <User className="inline-block ml-2 text-primary" size={20} /> {S.checkout.steps.info}
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <FieldLabel required>{S.checkout.form.fullName}</FieldLabel>
                    <Input {...form.register("fullName")} placeholder="مثال: أحمد بن صالح" />
                    <FieldError message={form.formState.errors.fullName?.message} />
                  </div>
                  <div>
                    <FieldLabel required>{S.checkout.form.phone}</FieldLabel>
                    <Input {...form.register("phone")} placeholder="0555123456" type="tel" inputMode="tel" />
                    <FieldError message={form.formState.errors.phone?.message} />
                  </div>
                </div>

                <div>
                  <FieldLabel>{S.checkout.form.phoneAlt}</FieldLabel>
                  <Input {...form.register("phoneAlt")} placeholder="0666789012" type="tel" inputMode="tel" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <FieldLabel required>{S.checkout.form.wilaya}</FieldLabel>
                    <NativeSelect {...form.register("wilaya")}>
                      <option value="">{S.checkout.form.selectWilaya}</option>
                      {WILAYAS.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </NativeSelect>
                    <FieldError message={form.formState.errors.wilaya?.message} />
                  </div>
                  <div>
                    <FieldLabel required>{S.checkout.form.city}</FieldLabel>
                    <Input {...form.register("city")} placeholder="مثال: بئر مراد رايس" />
                    <FieldError message={form.formState.errors.city?.message} />
                  </div>
                </div>

                <div>
                  <FieldLabel required>{S.checkout.form.address}</FieldLabel>
                  <Textarea {...form.register("address")} rows={3} placeholder="حي السلام، شارع الاستقلال رقم 12، الطابق 2" />
                  <FieldError message={form.formState.errors.address?.message} />
                </div>

                <div>
                  <FieldLabel>{S.checkout.form.notes}</FieldLabel>
                  <Textarea {...form.register("notes")} rows={2} placeholder="ملاحظات إضافية للموصّل" />
                </div>

                <div className="flex justify-end pt-2">
                  <Button variant="primary" size="lg" type="submit">
                    {S.cta.next} <ArrowLeft size={18} />
                  </Button>
                </div>
              </motion.form>
            )}

            {step === 2 && info && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <h2 className="text-xl font-bold text-navy">
                  <Check className="inline-block ml-2 text-primary" size={20} /> {S.checkout.steps.review}
                </h2>

                {/* Delivery info */}
                <div className="rounded-xl border border-border bg-surface-warm/40 p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 font-bold text-navy">
                      <MapPin size={18} className="text-primary" /> عنوان التوصيل
                    </h3>
                    <button onClick={() => setStep(1)} className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                      <Edit3 size={12} /> {S.cta.edit}
                    </button>
                  </div>
                  <div className="grid gap-1 text-sm">
                    <p><span className="font-bold">{info.fullName}</span> — {info.phone}</p>
                    <p>{info.wilaya}, {info.city}</p>
                    <p className="text-muted-foreground">{info.address}</p>
                    {info.notes && <p className="text-xs italic text-muted-foreground">📝 {info.notes}</p>}
                  </div>
                </div>

                {/* Payment */}
                <div className="rounded-xl border-2 border-gold bg-gold/10 p-5">
                  <h3 className="flex items-center gap-2 font-bold text-navy">
                    <Wallet size={18} className="text-gold" /> {S.checkout.payment.method}
                  </h3>
                  <div className="mt-3 flex items-start gap-3 rounded-lg bg-white p-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold text-navy text-2xl">💵</div>
                    <div>
                      <p className="font-bold text-navy">{S.checkout.payment.cod}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{S.checkout.payment.codDesc}</p>
                      <p className="mt-2 text-xs font-bold text-primary">🚚 {S.checkout.estDelivery}</p>
                    </div>
                  </div>
                </div>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-muted/50 p-4 text-sm">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-5 w-5 accent-primary"
                  />
                  <span>{S.checkout.agree}</span>
                </label>

                <div className="flex justify-between gap-3 pt-2">
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    <ArrowRight size={18} /> {S.cta.back}
                  </Button>
                  <Button variant="primary" size="lg" onClick={handlePlaceOrder} disabled={!agreed}>
                    {S.checkout.placeOrder}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Summary sticky */}
        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-soft)]">
            <h3 className="mb-4 text-lg font-bold text-navy">{S.cart.summary}</h3>
            <div className="max-h-[260px] space-y-3 overflow-y-auto border-b border-border pb-4">
              {items.map((i) => (
                <div key={i.productId} className="flex gap-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-2 text-xs font-bold text-navy">{i.name}</p>
                    <p className="text-xs text-muted-foreground">× {i.quantity}</p>
                  </div>
                  <p className="text-sm font-bold tabular-nums">{formatPrice(i.price * i.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 py-4 text-sm">
              <Row label={S.cart.subtotal} value={formatPrice(totals.subtotal)} />
              <Row label={S.cart.shipping} value={totals.shipping === 0 ? S.cart.shippingFree : formatPrice(totals.shipping)} />
              {totals.discount > 0 && <Row label={`${S.cart.discount}${promoCode ? ` (${promoCode})` : ""}`} value={`- ${formatPrice(totals.discount)}`} highlight />}
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="font-bold text-navy">{S.cart.total}</span>
              <span className="text-2xl font-black text-primary tabular-nums">{formatPrice(totals.total)}</span>
            </div>

            <div className="mt-4 rounded-lg bg-gold/10 px-3 py-2 text-center text-xs font-bold text-navy">💵 {S.checkout.payment.cod}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StepIndicator({ step }: { step: number }) {
  const steps = [S.checkout.steps.info, S.checkout.steps.review, S.checkout.steps.confirm];
  return (
    <div className="mt-8 flex items-center justify-center gap-2 overflow-x-auto pb-2">
      {steps.map((label, i) => {
        const n = i + 1;
        const isActive = n === step;
        const isDone = n < step;
        return (
          <div key={n} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
              isDone ? "bg-success text-white" : isActive ? "bg-primary text-white shadow-[var(--shadow-elegant)]" : "bg-muted text-muted-foreground"
            }`}>
              <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${isDone || isActive ? "bg-white/20" : "bg-white"}`}>
                {isDone ? <Check size={14} /> : n}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </div>
            {n < 3 && <div className={`h-0.5 w-6 sm:w-12 ${isDone ? "bg-success" : "bg-border"}`} />}
          </div>
        );
      })}
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-bold tabular-nums ${highlight ? "text-success" : "text-foreground"}`}>{value}</span>
    </div>
  );
}
