import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, AddToCartInput, CartTotals } from "@/types/cart";
import { FREE_SHIPPING_THRESHOLD, PROMO_CODES, SHIPPING_FEE } from "@/constants/strings";

interface CartState {
  items: CartItem[];
  promoCode: string | null;
  drawerOpen: boolean;
  addItem: (input: AddToCartInput) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clear: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  getTotals: () => CartTotals;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      drawerOpen: false,
      addItem: (input) => {
        const qty = input.quantity ?? 1;
        const unit = input.salePrice ?? input.price;
        set((s) => {
          const existing = s.items.find((i) => i.productId === input.id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.productId === input.id
                  ? { ...i, quantity: Math.min(i.quantity + qty, input.stockCount) }
                  : i
              ),
              drawerOpen: true,
            };
          }
          return {
            items: [
              ...s.items,
              {
                productId: input.id,
                name: input.name,
                image: input.images[0],
                price: unit,
                quantity: qty,
                slug: input.slug,
                maxStock: input.stockCount,
              },
            ],
            drawerOpen: true,
          };
        });
      },
      removeItem: (productId) => set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      updateQuantity: (productId, qty) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.productId === productId ? { ...i, quantity: Math.max(1, Math.min(qty, i.maxStock)) } : i
          ),
        })),
      clear: () => set({ items: [], promoCode: null }),
      applyPromo: (code) => {
        const up = code.trim().toUpperCase();
        if (PROMO_CODES[up]) {
          set({ promoCode: up });
          return true;
        }
        return false;
      },
      removePromo: () => set({ promoCode: null }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),
      getTotals: () => {
        const { items, promoCode } = get();
        const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
        const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
        const discountPct = promoCode ? PROMO_CODES[promoCode] ?? 0 : 0;
        const discount = Math.round((subtotal * discountPct) / 100);
        const total = Math.max(0, subtotal - discount + shipping);
        return { subtotal, shipping, discount, total, itemCount };
      },
    }),
    { name: "bmg_cart", skipHydration: true, }
  )
);
