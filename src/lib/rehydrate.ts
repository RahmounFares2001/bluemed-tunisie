import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useProductsStore } from "@/store/productsStore";
import { useAdminStore } from "@/store/adminStore";
import { useOrdersStore } from "@/store/ordersStore";

export function rehydrateStores() {
  if (typeof window === "undefined") return;
  useCartStore.persist.rehydrate();
  useWishlistStore.persist.rehydrate();
  useProductsStore.persist.rehydrate();
  useAdminStore.persist.rehydrate();
  useOrdersStore.persist.rehydrate();
}
