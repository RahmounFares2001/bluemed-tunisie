"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Home, ShoppingBag, MapPin, Phone, Wallet } from "lucide-react";
import { Button } from "@/components/bmg/Button";
import { S } from "@/constants/strings";
import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";
import type { Order } from "@/types/order";
import { toast } from "sonner";
import Link from "next/link";

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("bmg_last_order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}

    setLoading(false);
  }, []);

  const copyRef = async () => {
    if (!order) return;
    try {
      await navigator.clipboard.writeText(order.ref);
      toast.success(S.toast.linkCopied);
    } catch {}
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-navy">لا يوجد طلب لعرضه</h1>
        <Button variant="primary" className="mt-6" asChild>
          <Link href="/">{S.cta.backHome}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-border bg-white p-8 text-center shadow-[var(--shadow-elegant)]">
          <div className="check-circle mx-auto">
            <Check size={48} strokeWidth={3} />
          </div>

          <h1 className="mt-6 text-3xl font-black text-navy">
            {S.checkout.success}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {S.checkout.contactSoon}
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-2 rounded-xl bg-primary/10 px-5 py-4">
            <span className="text-sm text-muted-foreground">
              {S.checkout.refLabel}
            </span>

            <span className="font-mono text-lg font-black text-primary">
              {order.ref}
            </span>

            <button
              onClick={copyRef}
              aria-label="نسخ"
              className="grid h-8 w-8 place-items-center rounded-full text-primary hover:bg-primary/20"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>

        {/* Order summary */}
        <div className="mt-6 rounded-2xl border border-border bg-white p-6">
          <h3 className="mb-4 text-lg font-bold text-navy">
            ملخص طلبك
          </h3>

          <div className="space-y-3">
            {order.items.map((i) => (
              <div
                key={i.productId}
                className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div className="flex-1">
                  <p className="text-sm font-bold text-navy">{i.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {i.quantity} × {formatPrice(i.price)}
                  </p>
                </div>

                <p className="font-bold text-primary tabular-nums">
                  {formatPrice(i.price * i.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-2 border-t border-border pt-4 text-sm">
            <Row label={S.cart.subtotal} value={formatPrice(order.subtotal)} />
            <Row
              label={S.cart.shipping}
              value={
                order.shipping === 0
                  ? S.cart.shippingFree
                  : formatPrice(order.shipping)
              }
            />
            {order.discount > 0 && (
              <Row
                label={S.cart.discount}
                value={`- ${formatPrice(order.discount)}`}
                highlight
              />
            )}

            <div className="flex items-center justify-between border-t border-border pt-2 text-base">
              <span className="font-bold text-navy">{S.cart.total}</span>
              <span className="text-xl font-black text-primary tabular-nums">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <InfoCard
            icon={MapPin}
            label="عنوان التوصيل"
            value={`${order.customer.fullName}, ${order.customer.city}, ${order.customer.wilaya}`}
          />
          <InfoCard
            icon={Phone}
            label="هاتف التواصل"
            value={order.customer.phone}
          />
          <InfoCard
            icon={Wallet}
            label={S.checkout.payment.method}
            value={S.checkout.payment.cod}
          />
          <InfoCard
            icon={ShoppingBag}
            label="تاريخ الطلب"
            value={formatDate(order.createdAt)}
          />
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="primary" size="lg" asChild>
            <Link href="/">
              <Home size={18} /> {S.cta.backHome}
            </Link>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <Link href="/shop">{S.cta.continueShopping}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`font-bold tabular-nums ${
          highlight ? "text-success" : "text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-white p-4">
      <Icon size={18} className="mt-0.5 shrink-0 text-primary" />
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 text-sm font-bold text-navy">{value}</p>
      </div>
    </div>
  );
}