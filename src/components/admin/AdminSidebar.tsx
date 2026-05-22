import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Package, ShoppingBag, LogOut, ExternalLink } from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { S } from "@/constants/strings";

export function AdminSidebar() {
  const logout = useAdminStore((s) => s.logout);
  const items = [
    { to: "/admin/dashboard", label: S.admin.nav.dashboard, icon: LayoutDashboard },
    { to: "/admin/products", label: S.admin.nav.products, icon: Package },
    { to: "/admin/orders", label: S.admin.nav.orders, icon: ShoppingBag },
  ] as const;

  return (
    <aside className="fixed inset-y-0 right-0 z-40 hidden w-64 flex-col bg-navy text-white lg:flex">
      <div className="border-b border-white/10 px-6 py-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary-light to-gold text-lg font-black text-navy">
            B
          </div>
          <div>
            <p className="text-base font-black leading-tight">{S.brand.name}</p>
            <p className="text-[10px] tracking-[0.2em] text-gold">{S.brand.nameEn}</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-white/70 transition-all hover:bg-white/10 hover:text-white"
              activeProps={{ className: "bg-gold text-navy hover:bg-gold hover:text-navy" }}
            >
              <Icon size={18} /> {it.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-white/10 p-4">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold text-white/70 transition-colors hover:bg-white/10"
        >
          <ExternalLink size={16} /> عرض المتجر
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl bg-destructive/20 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-destructive"
        >
          <LogOut size={16} /> {S.admin.logout}
        </button>
      </div>
    </aside>
  );
}

export function AdminMobileNav() {
  const items = [
    { to: "/admin/dashboard", label: S.admin.nav.dashboard, icon: LayoutDashboard },
    { to: "/admin/products", label: S.admin.nav.products, icon: Package },
    { to: "/admin/orders", label: S.admin.nav.orders, icon: ShoppingBag },
  ] as const;
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-white lg:hidden">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <Link
            key={it.to}
            to={it.to}
            className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold text-muted-foreground"
            activeProps={{ className: "text-primary" }}
          >
            <Icon size={20} /> {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
