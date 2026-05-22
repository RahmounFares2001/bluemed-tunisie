"use client";

import { useState } from "react";
import type { Product, ProductCategory } from "@/types/product";
import { CATEGORIES } from "@/data/categories";
import { S } from "@/constants/strings";
import { formatPrice } from "@/utils/formatPrice";
import { Button } from "@/components/bmg/Button";
import { ChevronDown } from "lucide-react";

export interface FilterState {
  categories: ProductCategory[];
  materials: string[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  minRating: number;
}

export const DEFAULT_FILTERS: FilterState = {
  categories: [],
  materials: [],
  minPrice: 0,
  maxPrice: 50000,
  inStockOnly: false,
  minRating: 0,
};

const MATERIALS = ["خشب", "رخام", "بوليمر", "ألومنيوم", "جبس", "حجر"];

export function FilterSidebar({
  filters,
  setFilters,
  products,
}: {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  products: Product[];
}) {
  const toggleCategory = (id: ProductCategory) => {
    setFilters({
      ...filters,
      categories: filters.categories.includes(id)
        ? filters.categories.filter((c) => c !== id)
        : [...filters.categories, id],
    });
  };
  const toggleMaterial = (m: string) => {
    setFilters({
      ...filters,
      materials: filters.materials.includes(m) ? filters.materials.filter((x) => x !== m) : [...filters.materials, m],
    });
  };

  const reset = () => setFilters(DEFAULT_FILTERS);

  return (
    <aside className="space-y-5 rounded-2xl border border-border bg-white p-5">
      {/* Categories */}
      <Section title={S.shop.filterByCategory}>
        <div className="space-y-2">
          {CATEGORIES.map((c) => {
            const count = products.filter((p) => p.category === c.id).length;
            const checked = filters.categories.includes(c.id);
            return (
              <label key={c.id} className="flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCategory(c.id)}
                    className="h-4 w-4 accent-primary"
                  />
                  <span className={checked ? "font-bold text-primary" : "text-foreground"}>{c.name}</span>
                </span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">{count}</span>
              </label>
            );
          })}
        </div>
      </Section>

      {/* Price */}
      <Section title={S.shop.priceRange}>
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={50000}
            step={500}
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-primary"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatPrice(0)}</span>
            <span className="rounded-md bg-primary/10 px-2 py-1 font-bold text-primary">حتى {formatPrice(filters.maxPrice)}</span>
          </div>
        </div>
      </Section>

      {/* Materials */}
      {/* <Section title={S.shop.materials}>
        <div className="grid grid-cols-2 gap-1.5">
          {MATERIALS.map((m) => {
            const checked = filters.materials.includes(m);
            return (
              <button
                key={m}
                type="button"
                onClick={() => toggleMaterial(m)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-all ${
                  checked ? "border-primary bg-primary text-white" : "border-border bg-white text-foreground hover:border-primary"
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </Section> */}

      {/* Availability */}
      <Section title={S.shop.availability}>
        <label className="flex cursor-pointer items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted">
          <span>{S.shop.inStockOnly}</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setFilters({ ...filters, inStockOnly: e.target.checked })}
            className="h-4 w-4 accent-primary"
          />
        </label>
      </Section>

      {/* Rating */}
      {/* <Section title={S.shop.ratingFilter}>
        <div className="space-y-1.5">
          {[4, 3, 0].map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === r}
                onChange={() => setFilters({ ...filters, minRating: r })}
                className="h-4 w-4 accent-primary"
              />
              <span>{r === 0 ? "الكل" : `${r}★ فأكثر`}</span>
            </label>
          ))}
        </div>
      </Section> */}

      <Button variant="outline" className="w-full" onClick={reset}>
        {S.shop.resetFilters}
      </Button>
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-border pb-4 last:border-0 last:pb-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="mb-3 flex w-full items-center justify-between text-sm font-bold text-navy"
      >
        {title}
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && children}
    </div>
  );
}
