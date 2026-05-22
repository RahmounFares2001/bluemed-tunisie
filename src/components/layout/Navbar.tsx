"use client";

import { ShoppingCart, Heart, Search, Menu, X, Home, Store, Info, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { S } from "@/constants/strings";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const itemCount = useCartStore((s) => s.getTotals().itemCount);
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: S.nav.home, icon: Home },
    { to: "/shop", label: S.nav.shop, icon: Store },
    { to: "/about", label: S.nav.about, icon: Info },
    { to: "/contact", label: S.nav.contact, icon: Phone },
  ] as const;

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled ? "bg-white/95 shadow-md backdrop-blur" : "bg-white"
        )}
      >
        <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" aria-label={S.brand.name}>
            {/* <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-navy text-xl font-black text-white shadow-[var(--shadow-elegant)]">
              B
            </div> */}
            <div className="hidden flex-col sm:flex">
              <span className="text-lg font-black leading-tight text-navy">{S.brand.name}</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-gold">{S.brand.nameEn}</span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => {
            const isActive = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                href={l.to}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-bold text-foreground transition-colors hover:bg-muted hover:text-primary",
                  isActive && "text-primary bg-primary/10"  // ← active styles applied conditionally
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* <button
              aria-label={S.nav.search}
              onClick={() => setSearchOpen((s) => !s)}
              className="grid h-11 w-11 place-items-center rounded-full text-foreground transition-colors hover:bg-muted"
            >
              <Search size={20} />
            </button> */}
            <Link
              href="/wishlist"
              aria-label={S.nav.wishlist}
              className="relative grid h-11 w-11 place-items-center rounded-full text-foreground transition-colors hover:bg-muted"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -left-0.5 -top-0.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              aria-label={S.nav.cart}
              onClick={openDrawer}
              className="relative grid h-11 w-11 place-items-center rounded-full text-foreground transition-colors hover:bg-muted"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -left-0.5 -top-0.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-navy">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              aria-label="القائمة"
              onClick={() => setMobileOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full text-foreground transition-colors hover:bg-muted lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Search bar dropdown */}
        {searchOpen && (
          <div className="border-t border-border bg-white px-4 py-4">
            <form onSubmit={onSearchSubmit} className="container mx-auto flex gap-2">
              <input
                autoFocus
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={S.nav.searchPlaceholder}
                className="h-12 flex-1 rounded-lg border border-border bg-background px-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="rounded-lg bg-primary px-6 text-sm font-bold text-white transition-colors hover:bg-primary/90"
              >
                {S.nav.search}
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-primary to-navy font-black text-white">
                  B
                </div>
                <span className="font-bold text-navy">{S.brand.name}</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
                aria-label="إغلاق"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="space-y-2">
              {navLinks.map((l) => {
                const Icon = l.icon;
                return (
                  <Link
                    key={l.to}
                    href={l.to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3 text-base font-bold text-foreground transition-all hover:bg-primary hover:text-white"
                  >
                    <Icon size={20} /> {l.label}
                  </Link>
                );
              })}
              <Link
                href="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3 text-base font-bold text-foreground transition-all hover:bg-primary hover:text-white"
              >
                <Heart size={20} /> {S.nav.wishlist}
              </Link>
              <Link
                href="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl bg-gold px-4 py-3 text-base font-bold text-navy"
              >
                <ShoppingCart size={20} /> {S.nav.cart} ({itemCount})
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
