"use client";

import { Heart, ShoppingCart, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { Badge } from "@/components/bmg/Badge";
import { Button } from "@/components/bmg/Button";
import { StarRating } from "@/components/bmg/StarRating";
import { ProductPrice } from "./ProductPrice";
import { getCategoryName } from "@/data/categories";
import { S } from "@/constants/strings";
import { cn } from "@/utils/cn";
import Link from "next/link";

export function ProductCard({ product, view = "grid" }: { product: Product; view?: "grid" | "list" }) {
  const addItem = useCartStore((s) => s.addItem);
  const inWishlist = useWishlistStore((s) => s.ids.includes(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  const discount =
    product.salePrice && product.salePrice < product.price
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ ...product, quantity: 1 });
    toast.success(S.cart.addedToCart, { description: product.name });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product.id);
    toast.success(added ? S.wishlist.added : S.wishlist.removed);
  };

  if (view === "list") {
    return (
      <div className="group flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-white p-4 transition-all hover:border-gold/40 hover:shadow-[var(--shadow-elegant)] sm:flex-row">
        <Link href={`/product/${product.slug}`} className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted sm:w-56 sm:shrink-0">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute right-2 top-2 flex flex-col gap-1">
            {product.isNew && <Badge variant="new">{S.product.new}</Badge>}
            {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
            {product.isBestSeller && <Badge variant="best">{S.product.bestSeller}</Badge>}
          </div>
        </Link>
        <div className="flex flex-1 flex-col">
          <span className="text-xs text-muted-foreground">{getCategoryName(product.category)}</span>
          <Link href={`/product/${product.slug}`} className="mt-1 line-clamp-2 text-lg font-bold text-navy hover:text-primary">
            {product.name}
          </Link>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
          <StarRating value={product.rating} count={product.reviewCount} className="mt-2" />
          <div className="mt-auto flex items-end justify-between pt-3">
            <ProductPrice price={product.price} salePrice={product.salePrice} size="md" />
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" onClick={handleWishlist} aria-label={S.cta.addToWishlist}>
                <Heart size={16} className={cn(inWishlist && "fill-destructive text-destructive")} />
              </Button>
              <Button size="sm" variant="secondary" onClick={handleAdd}>
                <ShoppingCart size={16} /> {S.cta.addToCart}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-[var(--shadow-elegant)]"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600&q=80";
            }}
          />
          {/* badges */}
          <div className="absolute right-3 top-3 flex flex-col gap-1.5">
            {product.isNew && <Badge variant="new">{S.product.new}</Badge>}
            {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
            {product.isBestSeller && <Badge variant="best">{S.product.bestSeller}</Badge>}
          </div>
          {/* wishlist */}
          <button
            aria-label={S.cta.addToWishlist}
            onClick={handleWishlist}
            className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground shadow-md backdrop-blur transition-all hover:scale-110 hover:bg-white"
          >
            <Heart size={16} className={cn(inWishlist && "fill-destructive text-destructive")} />
          </button>
          {/* quick add overlay */}
          <div className="absolute inset-x-3 bottom-3 flex translate-y-4 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Button size="sm" variant="secondary" onClick={handleAdd} className="flex-1">
              <ShoppingCart size={14} /> {S.cta.addToCart}
            </Button>
            <Button size="sm" variant="ghost" className="bg-white/90 backdrop-blur" aria-label={S.cta.details}>
              <Eye size={14} />
            </Button>
          </div>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">
            {getCategoryName(product.category)}
          </span>
          <h3 className="mt-1 line-clamp-2 min-h-[2.75rem] text-sm font-bold text-navy transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          <StarRating value={product.rating} count={product.reviewCount} className="mt-2" />
          <div className="mt-3 flex items-center justify-between">
            <ProductPrice price={product.price} salePrice={product.salePrice} size="md" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
