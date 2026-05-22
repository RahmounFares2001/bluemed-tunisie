import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";
import { INITIAL_PRODUCTS } from "@/data/products";

interface ProductsState {
  products: Product[];
  upsert: (product: Product) => void;
  remove: (id: string) => void;
  toggleActive: (id: string) => void;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set) => ({
      products: INITIAL_PRODUCTS,
      upsert: (product) =>
        set((s) => {
          const exists = s.products.some((p) => p.id === product.id);
          return {
            products: exists
              ? s.products.map((p) => (p.id === product.id ? product : p))
              : [product, ...s.products],
          };
        }),
      remove: (id) => set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
      toggleActive: (id) =>
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)),
        })),
    }),
    {
      name: "bmg_products", skipHydration: true,
      // Don't persist initial products; only persist user changes
      // Actually persist all so admin edits stick
    }
  )
);
