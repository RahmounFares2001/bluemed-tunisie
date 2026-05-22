"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/bmg/Button";
import { QuantityInput } from "@/components/bmg/QuantityInput";
import { formatPrice } from "@/utils/formatPrice";
import { S } from "@/constants/strings";
import Link from "next/link";

export function CartDrawer() {
  const open = useCartStore((s) => s.drawerOpen);
  const close = useCartStore((s) => s.closeDrawer);
  const items = useCartStore((s) => s.items);
  const getTotals = useCartStore((s) => s.getTotals);
  const totals = getTotals();  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={close}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl"
            role="dialog"
            aria-label={S.cart.title}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary" />
                <h3 className="text-lg font-bold text-navy">
                  {S.cart.title} <span className="text-sm font-normal text-muted-foreground">({totals.itemCount})</span>
                </h3>
              </div>
              <button onClick={close} aria-label="إغلاق" className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
                <X size={18} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
                <ShoppingBag size={56} className="text-muted-foreground/40" />
                <p className="text-lg font-bold text-navy">{S.cart.empty}</p>
                <p className="text-sm text-muted-foreground">{S.cart.emptyDesc}</p>
                <Button variant="secondary" onClick={close} asChild>
                  <Link href="/shop">{S.cta.shopNow}</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto px-6 py-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-3 rounded-xl border border-border bg-surface-warm/40 p-3">
                      <Link href={`/product/${item.slug}`} onClick={close} className="block h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </Link>
                      <div className="flex-1">
                        <Link href={`/product/${item.slug}`} onClick={close} className="line-clamp-2 text-sm font-bold text-navy hover:text-primary">
                          {item.name}
                        </Link>
                        <p className="mt-0.5 text-sm font-bold text-primary tabular-nums">{formatPrice(item.price)}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <QuantityInput
                            value={item.quantity}
                            onChange={(n) => updateQuantity(item.productId, n)}
                            max={item.maxStock}
                          />
                          <button
                            onClick={() => removeItem(item.productId)}
                            aria-label="حذف من السلة"
                            className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t border-border bg-surface-warm/40 px-6 py-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{S.cart.subtotal}</span>
                    <span className="font-bold tabular-nums">{formatPrice(totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{S.cart.shipping}</span>
                    <span className="font-bold tabular-nums">{totals.shipping === 0 ? S.cart.shippingFree : formatPrice(totals.shipping)}</span>
                  </div>
                  {totals.discount > 0 && (
                    <div className="flex justify-between text-sm text-success">
                      <span>{S.cart.discount}</span>
                      <span className="font-bold tabular-nums">- {formatPrice(totals.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-border pt-2 text-base">
                    <span className="font-bold text-navy">{S.cart.total}</span>
                    <span className="text-lg font-black text-primary tabular-nums">{formatPrice(totals.total)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button variant="outline" onClick={close} asChild>
                      <Link href="/cart">{S.cta.details}</Link>
                    </Button>
                    <Button variant="primary" onClick={close} asChild>
                      <Link href="/checkout">{S.cta.checkout}</Link>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
