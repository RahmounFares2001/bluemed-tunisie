export interface AdminStats {
  totalOrders: number;
  todayOrders: number;
  totalSales: number;
  activeProducts: number;
}

export interface WeeklySalesPoint {
  day: string;
  sales: number;
}

export interface CategorySalesPoint {
  name: string;
  value: number;
  color: string;
}
