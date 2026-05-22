"use client";
import { Breadcrumb } from "@/components/bmg/Breadcrumb";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { useProductsStore } from "@/store/productsStore";
import { S } from "@/constants/strings";



export default function Shop() {
  const products = useProductsStore((s) => s.products).slice(0, 6);
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: S.nav.home, to: "/" }, { label: S.shop.title }]} />
      <h1 className="mt-4 text-3xl font-black text-navy">{S.shop.title}</h1>
      <p className="mt-2 text-muted-foreground">{S.brand.subtitle}</p>
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
