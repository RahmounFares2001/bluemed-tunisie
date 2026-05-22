export type OrderStatus = "new" | "processing" | "shipped" | "delivered" | "cancelled";

export interface CustomerInfo {
  fullName: string;
  phone: string;
  phoneAlt?: string;
  wilaya: string;
  city: string;
  address: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  ref: string;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  promoCode?: string;
  status: OrderStatus;
  createdAt: string; // ISO
  paymentMethod: "cod";
}
