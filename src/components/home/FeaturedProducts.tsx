"use client";

import { ArrowLeft } from "lucide-react";
import { SectionTitle } from "@/components/bmg/Section";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/bmg/Button";
import { useProductsStore } from "@/store/productsStore";
import { S } from "@/constants/strings";
import Link from "next/link";

export function FeaturedProducts() {
  const products = useProductsStore((s) => s.products);
  const featured = products.filter((p) => p.isFeatured).slice(0, 4);
  return (
    <section className="bg-surface-warm/60 py-20">
      <div className="container mx-auto px-4">
        <SectionTitle title={S.home.featuredTitle} subtitle={S.home.featuredSub} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/shop">
              {S.cta.viewAll} <ArrowLeft size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
