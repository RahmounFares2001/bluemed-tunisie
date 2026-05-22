"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/bmg/Skeleton";
import { FilterSidebar, DEFAULT_FILTERS, type FilterState } from "./FilterSidebar";
import { NativeSelect } from "@/components/bmg/Input";
import { S } from "@/constants/strings";
import { Grid3X3, List, SlidersHorizontal, X } from "lucide-react";

type SortKey = "newest" | "topRated" | "priceAsc" | "priceDesc" | "bestSelling";

export function ProductGrid({
  products,
  initialFilters,
}: {
  products: Product[];
  initialFilters?: Partial<FilterState>;
}) {
  const [filters, setFilters] = useState<FilterState>({ ...DEFAULT_FILTERS, ...initialFilters });
  const [sort, setSort] = useState<SortKey>("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let r = products.filter((p) => p.isActive !== false);
    if (filters.categories.length) r = r.filter((p) => filters.categories.includes(p.category));
    if (filters.materials.length) r = r.filter((p) => filters.materials.some((m) => (p.specs.material ?? "").includes(m)));
    r = r.filter((p) => (p.salePrice ?? p.price) <= filters.maxPrice);
    if (filters.inStockOnly) r = r.filter((p) => p.inStock);
    if (filters.minRating > 0) r = r.filter((p) => p.rating >= filters.minRating);

    switch (sort) {
      case "topRated": r = [...r].sort((a, b) => b.rating - a.rating); break;
      case "priceAsc": r = [...r].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)); break;
      case "priceDesc": r = [...r].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)); break;
      case "bestSelling": r = [...r].sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller) || b.reviewCount - a.reviewCount); break;
      default: r = [...r].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    }
    return r;
  }, [products, filters, sort]);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Sidebar (desktop) */}
      <div className="hidden lg:block">
        <FilterSidebar filters={filters} setFilters={setFilters} products={products} />
      </div>

      {/* Mobile filters */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm overflow-y-auto bg-background p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold">الفلاتر</h3>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="إغلاق" className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
                <X size={18} />
              </button>
            </div>
            <FilterSidebar filters={filters} setFilters={setFilters} products={products} />
          </div>
        </div>
      )}

      <div>
        {/* Top bar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-white p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-bold lg:hidden"
            >
              <SlidersHorizontal size={16} /> الفلاتر
            </button>
            <span className="text-sm font-bold text-muted-foreground">{S.shop.productsCount(filtered.length)}</span>
          </div>
          <div className="flex items-center gap-2">
            <NativeSelect value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="h-10 w-auto">
              <option value="newest">{S.shop.sort.newest}</option>
              {/* <option value="topRated">{S.shop.sort.topRated}</option> */}
              <option value="priceAsc">{S.shop.sort.priceAsc}</option>
              <option value="priceDesc">{S.shop.sort.priceDesc}</option>
              {/* <option value="bestSelling">{S.shop.sort.bestSelling}</option> */}
            </NativeSelect>
            <div className="flex overflow-hidden rounded-lg border border-border">
              <button
                aria-label={S.shop.viewGrid}
                onClick={() => setView("grid")}
                className={`grid h-10 w-10 place-items-center ${view === "grid" ? "bg-primary text-white" : "bg-white text-foreground"}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                aria-label={S.shop.viewList}
                onClick={() => setView("list")}
                className={`grid h-10 w-10 place-items-center ${view === "list" ? "bg-primary text-white" : "bg-white text-foreground"}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white py-20 text-center">
            <p className="text-lg font-bold text-navy">{S.shop.noResults}</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} view="list" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { ProductCardSkeleton };
