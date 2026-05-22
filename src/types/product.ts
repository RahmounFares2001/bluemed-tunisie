export type ProductCategory =
  | "wood-panels"
  | "marble-alternatives"
  | "wall-cladding"
  | "decorative-flooring"
  | "decorative-accessories"
  | "decorative-ceilings";

export interface ProductSpecs {
  dimensions?: string;
  material?: string;
  finish?: string;
  color?: string;
  thickness?: string;
  coverage?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  subcategory?: string;
  price: number;
  salePrice?: number;
  images: string[];
  specs: ProductSpecs;
  features: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  isActive?: boolean;
  tags: string[];
  sku: string;
}

export interface CategoryInfo {
  id: ProductCategory;
  slug: string;
  name: string;
  description: string;
  image: string;
  count?: number;
}
