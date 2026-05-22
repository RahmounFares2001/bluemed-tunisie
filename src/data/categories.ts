import type { CategoryInfo } from "@/types/product";

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "wood-panels",
    slug: "wood-panels",
    name: "ألواح خشبية",
    description: "ألواح خشبية فاخرة بتشطيبات راقية لإضفاء الدفء على مساحاتك",
    image: "https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "marble-alternatives",
    slug: "marble-alternatives",
    name: "بدائل الرخام",
    description: "بدائل رخامية بأرقى التصاميم بسعر أقل وجودة عالية",
    image: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "wall-cladding",
    slug: "wall-cladding",
    name: "كسوة الجدران",
    description: "حلول متكاملة لكسوة جدرانك بأناقة وعصرية",
    image: "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "decorative-flooring",
    slug: "decorative-flooring",
    name: "أرضيات ديكورية",
    description: "أرضيات بتصاميم عصرية تعكس ذوقك الرفيع",
    image: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "decorative-accessories",
    slug: "decorative-accessories",
    name: "إكسسوارات ديكور",
    description: "لمسات ديكورية مميزة لإكمال أناقة مساحاتك",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "decorative-ceilings",
    slug: "decorative-ceilings",
    name: "أسقف مزخرفة",
    description: "أسقف مزخرفة بتصاميم كلاسيكية وعصرية",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop",
  },
];

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryName(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.name ?? id;
}
