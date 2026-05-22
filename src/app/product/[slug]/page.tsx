"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { toast } from "sonner";
import {
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Breadcrumb } from "@/components/bmg/Breadcrumb";
import { Badge } from "@/components/bmg/Badge";
import { Button } from "@/components/bmg/Button";
import { QuantityInput } from "@/components/bmg/QuantityInput";
import { StarRating } from "@/components/bmg/StarRating";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPrice } from "@/components/product/ProductPrice";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionTitle } from "@/components/bmg/Section";

import { useProductsStore } from "@/store/productsStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

import { getCategoryBySlug } from "@/data/categories";
import { S } from "@/constants/strings";
import { cn } from "@/utils/cn";

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const products = useProductsStore((s) => s.products);

  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  const cat = getCategoryBySlug(product.category);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const [qty, setQty] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const inWishlist = useWishlistStore((s) => s.ids.includes(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  const handleAdd = () => {
    addItem({ ...product, quantity: qty });
    toast.success(S.cart.addedToCart);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success(S.toast.linkCopied);
    } catch {}
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: S.nav.home, to: "/" },
          { label: S.shop.title, to: "/shop" },
          ...(cat ? [{ label: cat.name }] : []),
          { label: product.name },
        ]}
      />

      {/* Product main */}
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          {/* badges */}
          <div className="flex flex-wrap gap-1.5">
            {product.isNew && <Badge variant="new">{S.product.new}</Badge>}
            {product.isBestSeller && <Badge variant="best">{S.product.bestSeller}</Badge>}
            {product.salePrice && <Badge variant="sale">{S.product.sale}</Badge>}
          </div>

          <h1 className="mt-3 text-3xl font-black text-navy lg:text-4xl">
            {product.name}
          </h1>

          <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
            <span>
              {S.product.sku}:{" "}
              <span className="font-mono font-bold text-foreground">
                {product.sku}
              </span>
            </span>
            <span>|</span>
            <StarRating value={product.rating} count={product.reviewCount} />
          </div>

          {/* price */}
          <div className="mt-5 rounded-2xl bg-surface-warm/60 p-5">
            <ProductPrice price={product.price} salePrice={product.salePrice} size="lg" />
          </div>

          <p className="mt-5 text-foreground/85">{product.description}</p>

          {/* quantity + actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QuantityInput value={qty} onChange={setQty} max={product.stockCount} />

            <Button variant="primary" size="lg" onClick={handleAdd} className="flex-1">
              {S.cta.addToCart}
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const added = toggleWishlist(product.id);
                toast.success(added ? S.wishlist.added : S.wishlist.removed);
              }}
            >
              <Heart className={cn(inWishlist && "fill-destructive text-destructive")} />
            </Button>
          </div>

          {/* stock + share */}
          <div className="mt-4 flex items-center gap-3 text-sm">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1 font-bold",
                product.inStock
                  ? "bg-success/15 text-success"
                  : "bg-destructive/15 text-destructive"
              )}
            >
              {product.inStock ? (
                <CheckCircle2 size={14} />
              ) : (
                <XCircle size={14} />
              )}
              {product.inStock
                ? `${S.product.inStock} (${product.stockCount})`
                : S.product.outOfStock}
            </span>

            <button
              onClick={handleShare}
              className="text-primary font-bold hover:underline"
            >
              <Share2 size={14} /> {S.cta.share}
            </button>
          </div>

          {/* guarantees */}
          <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl bg-surface-warm/40 p-3 text-center text-xs">
            {[
              { icon: ShieldCheck, label: S.product.qualityGuarantee },
              { icon: RotateCcw, label: S.product.freeReturn },
              { icon: Truck, label: S.product.safeDelivery },
            ].map((g, i) => {
              const Icon = g.icon;
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <Icon className="text-primary" />
                  <span className="font-bold">{g.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* specs */}
      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="mb-4 text-xl font-bold text-navy">Specs</h2>
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(product.specs)
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <tr key={k} className="border-b last:border-0">
                    <td className="py-2 font-bold">{k}</td>
                    <td>{v as string}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <h2 className="mb-4 text-xl font-bold text-navy">Features</h2>
          <ul className="space-y-2">
            {product.features.map((f, i) => (
              <li key={i} className="flex gap-2">
                <CheckCircle2 className="text-success" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <section className="mt-16">
          <SectionTitle title={S.product.related} align="right" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}