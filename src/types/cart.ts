import type { Product } from "./product";

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;       // unit price (sale or regular)
  quantity: number;
  slug: string;
  maxStock: number;
}

export interface CartTotals {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  itemCount: number;
}

export type AddToCartInput = Pick<Product, "id" | "slug" | "name" | "images" | "price" | "salePrice" | "stockCount"> & {
  quantity?: number;
};
