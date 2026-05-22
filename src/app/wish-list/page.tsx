"use client";

import { toast } from "sonner";
import { Heart, Share2 } from "lucide-react";
import { Breadcrumb } from "@/components/bmg/Breadcrumb";
import { Button } from "@/components/bmg/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { useWishlistStore } from "@/store/wishlistStore";
import { useProductsStore } from "@/store/productsStore";
import { S } from "@/constants/strings";
import Link from "next/link";



export default function WishlistPage() {
  const ids = useWishlistStore((s) => s.ids);
  const products = useProductsStore((s) => s.products);
  const items = products.filter((p) => ids.includes(p.id));

  const onShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success(S.toast.linkCopied);
    } catch {}
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: S.nav.home, to: "/" }, { label: S.wishlist.title }]} />
      <div className="mt-4 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-black text-navy">{S.wishlist.title}</h1>
        {items.length > 0 && (
          <Button variant="outline" onClick={onShare}>
            <Share2 size={16} /> {S.wishlist.shareList}
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mx-auto mt-12 max-w-md rounded-3xl border border-border bg-white p-12 text-center">
          <Heart size={64} className="mx-auto text-muted-foreground/40" />
          <h2 className="mt-5 text-2xl font-bold text-navy">{S.wishlist.empty}</h2>
          <p className="mt-2 text-muted-foreground">{S.wishlist.emptyDesc}</p>
          <Button variant="primary" size="lg" className="mt-6" asChild>
            <Link href="/shop">{S.cta.shopNow}</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
