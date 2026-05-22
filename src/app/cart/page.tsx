"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ShoppingBag, Trash2, Tag, ShieldCheck, RotateCcw, Truck } from "lucide-react";
import { Breadcrumb } from "@/components/bmg/Breadcrumb";
import { Button } from "@/components/bmg/Button";
import { Input } from "@/components/bmg/Input";
import { QuantityInput } from "@/components/bmg/QuantityInput";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/formatPrice";
import { S, FREE_SHIPPING_THRESHOLD } from "@/constants/strings";
import Link from "next/link";



export default function Cart() {
  const items = useCartStore((s) => s.items);
  const getTotals = useCartStore((s) => s.getTotals);
  const totals = getTotals();  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const applyPromo = useCartStore((s) => s.applyPromo);
  const promoCode = useCartStore((s) => s.promoCode);
  const removePromo = useCartStore((s) => s.removePromo);
  const [code, setCode] = useState("");

  const onApply = () => {
    const ok = applyPromo(code);
    if (ok) toast.success(S.cart.promoApplied(code.toUpperCase()));
    else toast.error(S.cart.promoInvalid);
    setCode("");
  };

  const toNextFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totals.subtotal);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-white p-12 text-center">
          <ShoppingBag size={64} className="mx-auto text-muted-foreground/40" />
          <h2 className="mt-5 text-2xl font-bold text-navy">{S.cart.empty}</h2>
          <p className="mt-2 text-muted-foreground">{S.cart.emptyDesc}</p>
          <Button variant="primary" size="lg" className="mt-6" asChild>
            <Link href="/shop">{S.cta.shopNow}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: S.nav.home, to: "/" }, { label: S.cart.title }]} />
      <h1 className="mt-4 text-3xl font-black text-navy">{S.cart.title}</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Items */}
        <div className="space-y-3">
          {toNextFreeShipping > 0 && (
            <div className="rounded-xl bg-gold/15 px-4 py-3 text-sm font-bold text-navy">
              🚚 أضف {formatPrice(toNextFreeShipping)} أخرى للحصول على شحن مجاني!
            </div>
          )}
          {items.map((item) => (
            <div key={item.productId} className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-4 sm:flex-row">
              <Link href={`/product/${item.slug}`} className="block h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-28">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col justify-between gap-3">
                <div className="flex items-start justify-between gap-3">
                  <Link href={`/product/${item.slug}`} className="text-sm font-bold text-navy hover:text-primary sm:text-base">
                    {item.name}
                  </Link>
                  <button
                    onClick={() => {
                      removeItem(item.productId);
                      toast.success(S.cart.removed);
                    }}
                    aria-label="حذف"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <QuantityInput value={item.quantity} onChange={(n) => updateQuantity(item.productId, n)} max={item.maxStock} />
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">السعر الإجمالي</p>
                    <p className="text-lg font-black text-primary tabular-nums">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Link href="/shop" className="inline-block text-sm font-bold text-primary hover:underline">
            ← {S.cta.continueShopping}
          </Link>
        </div>

        {/* Summary */}
        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-soft)]">
            <h3 className="mb-5 text-lg font-bold text-navy">{S.cart.summary}</h3>

            {/* Promo */}
            {/* <div className="mb-5">
              {promoCode ? (
                <div className="flex items-center justify-between rounded-lg bg-success/10 px-3 py-2 text-sm">
                  <span className="flex items-center gap-2 font-bold text-success">
                    <Tag size={14} /> {promoCode}
                  </span>
                  <button onClick={removePromo} className="text-xs font-bold text-destructive hover:underline">إلغاء</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder={S.cart.promo}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onApply()}
                  />
                  <Button variant="secondary" onClick={onApply} disabled={!code.trim()}>
                    {S.cta.apply}
                  </Button>
                </div>
              )}
              <p className="mt-2 text-[11px] text-muted-foreground">جرّب: BMG10 / SUMMER15 / VIP20</p>
            </div> */}

            <div className="space-y-2.5 border-y border-border py-4 text-sm">
              <Row label={S.cart.subtotal} value={formatPrice(totals.subtotal)} />
              <Row label={S.cart.shipping} value={totals.shipping === 0 ? S.cart.shippingFree : formatPrice(totals.shipping)} highlight={totals.shipping === 0} />
              {totals.discount > 0 && <Row label={S.cart.discount} value={`- ${formatPrice(totals.discount)}`} highlight />}
            </div>

            <div className="my-4 flex items-center justify-between">
              <span className="text-base font-bold text-navy">{S.cart.total}</span>
              <span className="text-2xl font-black text-primary tabular-nums">{formatPrice(totals.total)}</span>
            </div>

            <Button variant="primary" size="lg" className="w-full" asChild>
              <Link href="/checkout">{S.cta.checkout}</Link>
            </Button>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[11px]">
              {[
                { i: ShieldCheck, l: S.cart.secure },
                { i: RotateCcw, l: S.cart.freeReturn },
                { i: Truck, l: S.cart.fastDelivery },
              ].map((b, i) => {
                const Icon = b.i;
                return (
                  <div key={i} className="flex flex-col items-center gap-1 text-muted-foreground">
                    <Icon size={16} className="text-primary" />
                    <span className="font-bold">{b.l}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
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
