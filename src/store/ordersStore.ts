import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order, OrderStatus } from "@/types/order";
import { INITIAL_ORDERS } from "@/data/orders";

interface OrdersState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateStatus: (ref: string, status: OrderStatus) => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: INITIAL_ORDERS,
      addOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
      updateStatus: (ref, status) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.ref === ref ? { ...o, status } : o)),
        })),
    }),
    { name: "bmg_orders", skipHydration: true }
  )
);
