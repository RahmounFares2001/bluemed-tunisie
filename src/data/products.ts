import type { Product, ProductCategory } from "@/types/product";

// Unsplash image pools per category
const IMG = {
  "wood-panels": [
    "photo-1604079628040-94301bb21b91",
    "photo-1611967164521-abae8fba4668",
    "photo-1581539250439-c96689b516dd",
    "photo-1620552051420-7adb6e2c5da3",
    "photo-1606744824163-985d376605aa",
    "photo-1565538810643-b5bdb714032a",
  ],
  "marble-alternatives": [
    "photo-1615971677499-5467cbab01c0",
    "photo-1604769850-d3cd9ac4b6c4",
    "photo-1600607687939-ce8a6c25118c",
    "photo-1604014237800-1c9102c219da",
    "photo-1605117882932-f9e32b03fea9",
    "photo-1615874959474-d609969a20ed",
  ],
  "wall-cladding": [
    "photo-1597072689227-8882273e8f6a",
    "photo-1615873968403-89e068629265",
    "photo-1615874694520-474822394e73",
    "photo-1615876234886-fd9a39fda97f",
    "photo-1604079628040-94301bb21b91",
  ],
  "decorative-flooring": [
    "photo-1622372738946-62e02505feb3",
    "photo-1581858726788-75bc0f6a952d",
    "photo-1604014237800-1c9102c219da",
    "photo-1601762603339-fd61e28b698a",
    "photo-1615529182904-14819c35db37",
  ],
  "decorative-accessories": [
    "photo-1586023492125-27b2c045efd7",
    "photo-1513519245088-0e12902e5a38",
    "photo-1583847268964-b28dc8f51f92",
    "photo-1551105378-78e609e1d468",
    "photo-1531873984846-9d1148ed5f7d",
  ],
  "decorative-ceilings": [
    "photo-1600585154340-be6161a56a0c",
    "photo-1615874959474-d609969a20ed",
    "photo-1582582494705-f8ce0b0c24f0",
    "photo-1567016432779-094069958ea5",
    "photo-1615527615845-1b8e0e76d1aa",
  ],
} as const;

function img(cat: ProductCategory, i: number): string {
  const pool = IMG[cat];
  return `https://images.unsplash.com/${pool[i % pool.length]}?w=900&q=80&auto=format&fit=crop`;
}

function imgs(cat: ProductCategory, base: number): string[] {
  return [img(cat, base), img(cat, base + 1), img(cat, base + 2), img(cat, base + 3)];
}

let id = 0;
const mk = (
  cat: ProductCategory,
  name: string,
  price: number,
  opts: Partial<Product> = {}
): Product => {
  id++;
  const slug = `${cat}-${id}`;
  const sale = opts.salePrice;
  return {
    id: `p${id}`,
    slug,
    name,
    description:
      opts.description ??
      "منتج فاخر مصنوع بأعلى معايير الجودة العالمية، مثالي لإضفاء لمسة من الأناقة والرقي على مساحاتك الداخلية. خامة متينة وتشطيب احترافي يدوم طويلاً.",
    category: cat,
    price,
    salePrice: sale,
    images: imgs(cat, id),
    specs: opts.specs ?? {
      dimensions: "120 × 60 سم",
      material: "MDF عالي الجودة",
      finish: "لمسة لامعة",
      color: "بيج طبيعي",
      thickness: "8 ملم",
      coverage: "0.72 م²/قطعة",
    },
    features: opts.features ?? [
      "مقاوم للرطوبة والحرارة",
      "سهل التركيب",
      "صديق للبيئة",
      "ضمان جودة لمدة سنتين",
    ],
    inStock: opts.inStock ?? true,
    stockCount: opts.stockCount ?? 25 + (id * 17) % 75,
    rating: opts.rating ?? Number((4 + ((id * 13) % 10) / 10).toFixed(1)),
    reviewCount: opts.reviewCount ?? 20 + (id * 31) % 150,
    isNew: opts.isNew ?? false,
    isFeatured: opts.isFeatured ?? false,
    isBestSeller: opts.isBestSeller ?? false,
    isActive: true,
    tags: opts.tags ?? [],
    sku: `BMG-${cat.slice(0, 3).toUpperCase()}-${String(id).padStart(4, "0")}`,
  };
};

export const INITIAL_PRODUCTS: Product[] = [
  // ── ألواح خشبية (10)
  mk("wood-panels", "ألواح خشب البلوط الفاخر", 8500, { salePrice: 6800, isNew: true, isFeatured: true, specs: { dimensions: "120×60 سم", material: "خشب بلوط طبيعي", finish: "مات", color: "بني داكن", thickness: "12 ملم", coverage: "0.72 م²/قطعة" } }),
  mk("wood-panels", "ألواح خشب الجوز الكلاسيكية", 9200, { isBestSeller: true, isFeatured: true }),
  mk("wood-panels", "ألواح خشبية بنقوش هندسية", 6500, { isNew: true }),
  mk("wood-panels", "ألواح خشب الصنوبر الطبيعي", 5800, { salePrice: 4900 }),
  mk("wood-panels", "ألواح خشب رمادي عصري", 7200, { isFeatured: true }),
  mk("wood-panels", "ألواح خشب فحمي مات", 7800),
  mk("wood-panels", "ألواح خشب أبيض فاخر", 6900, { isNew: true }),
  mk("wood-panels", "ألواح خشب ثلاثية الأبعاد", 12500, { isBestSeller: true, isFeatured: true }),
  mk("wood-panels", "ألواح خشب ريفي عتيق", 8200),
  mk("wood-panels", "ألواح خشب البامبو الطبيعي", 9500, { salePrice: 7600 }),

  // ── بدائل الرخام (10)
  mk("marble-alternatives", "لوح رخامي كلاسيكي أبيض", 11500, { isFeatured: true, isBestSeller: true, specs: { dimensions: "240×120 سم", material: "PVC + ألياف زجاجية", finish: "لامع عالي", color: "أبيض كلاسيكي", thickness: "5 ملم", coverage: "2.88 م²/قطعة" } }),
  mk("marble-alternatives", "لوح رخامي عروق ذهبية", 14500, { salePrice: 11900, isNew: true, isFeatured: true }),
  mk("marble-alternatives", "لوح رخامي أسود فاخر", 13800, { isBestSeller: true }),
  mk("marble-alternatives", "لوح رخامي بيج كلاسيكي", 10500, { salePrice: 8900 }),
  mk("marble-alternatives", "لوح رخامي رمادي عصري", 12200),
  mk("marble-alternatives", "لوح رخامي عروق زرقاء", 15500, { isFeatured: true, isNew: true }),
  mk("marble-alternatives", "لوح رخامي ترافرتين طبيعي", 11800),
  mk("marble-alternatives", "لوح رخامي أخضر إمبراطوري", 16200, { isFeatured: true }),
  mk("marble-alternatives", "لوح رخامي أونيكس بترانسبارنسي", 19500, { isBestSeller: true }),
  mk("marble-alternatives", "لوح رخامي وردي ملوكي", 13200, { salePrice: 10500 }),

  // ── كسوة الجدران (8)
  mk("wall-cladding", "كسوة جدران حجرية طبيعية", 7800, { isFeatured: true, specs: { dimensions: "60×30 سم", material: "حجر طبيعي معاد التشكيل", finish: "مات خشن", color: "رمادي صخري", thickness: "15 ملم", coverage: "0.18 م²/قطعة" } }),
  mk("wall-cladding", "كسوة جدران طوب أحمر عتيق", 5500, { isBestSeller: true, salePrice: 4400 }),
  mk("wall-cladding", "كسوة جدران ثلاثية الأبعاد", 8900, { isNew: true, isFeatured: true }),
  mk("wall-cladding", "كسوة جدران رخامية فاخرة", 9800),
  mk("wall-cladding", "كسوة جدران معدنية فضية", 7200, { isNew: true }),
  mk("wall-cladding", "كسوة جدران بلاط مغربي", 6500, { isFeatured: true }),
  mk("wall-cladding", "كسوة جدران فوم 3D", 3500, { salePrice: 2800, isBestSeller: true }),
  mk("wall-cladding", "كسوة جدران ألواح أكوستيك", 11200),

  // ── أرضيات ديكورية (8)
  mk("decorative-flooring", "أرضية باركيه بلوط فاخر", 12500, { isFeatured: true, isBestSeller: true, specs: { dimensions: "190×19 سم", material: "خشب بلوط مهجن", finish: "لاكر مات", color: "بني فاتح", thickness: "12 ملم", coverage: "0.36 م²/قطعة" } }),
  mk("decorative-flooring", "أرضية فينيل مضادة للماء", 6800, { salePrice: 5400 }),
  mk("decorative-flooring", "أرضية SPC رخامية", 9500, { isNew: true, isFeatured: true }),
  mk("decorative-flooring", "أرضية باركيه جوز داكن", 14200),
  mk("decorative-flooring", "أرضية لامينيت كلاسيكي", 4500, { isBestSeller: true, salePrice: 3600 }),
  mk("decorative-flooring", "أرضية إيبوكسي ميتاليك", 16800, { isFeatured: true, isNew: true }),
  mk("decorative-flooring", "أرضية باركيه هرمي فاخر", 18500),
  mk("decorative-flooring", "أرضية فينيل بنقوش هندسية", 7200),

  // ── إكسسوارات ديكور (8)
  mk("decorative-accessories", "مرآة ذهبية مدورة فاخرة", 8500, { isFeatured: true, isNew: true, specs: { dimensions: "80 سم قطر", material: "إطار معدني + زجاج", finish: "ذهبي لامع", color: "ذهبي", thickness: "—", coverage: "—" } }),
  mk("decorative-accessories", "ساعة حائط معدنية أنيقة", 4500, { salePrice: 3600, isBestSeller: true }),
  mk("decorative-accessories", "إطار جداري ثلاثي ذهبي", 6200, { isFeatured: true }),
  mk("decorative-accessories", "مزهرية سيراميك فاخرة", 3800),
  mk("decorative-accessories", "ثريا كريستال كلاسيكية", 22500, { isFeatured: true, isNew: true }),
  mk("decorative-accessories", "تمثال ذهبي عصري", 5500, { isBestSeller: true }),
  mk("decorative-accessories", "شمعدان نحاسي فاخر", 2800, { salePrice: 2200 }),
  mk("decorative-accessories", "وحدة رفوف جدارية معدنية", 9500),

  // ── أسقف مزخرفة (6)
  mk("decorative-ceilings", "سقف جبس مزخرف كلاسيكي", 5800, { isFeatured: true, isBestSeller: true, specs: { dimensions: "60×60 سم", material: "جبس بورد فاخر", finish: "مات بارز", color: "أبيض ناصع", thickness: "10 ملم", coverage: "0.36 م²/قطعة" } }),
  mk("decorative-ceilings", "سقف معلق ألواح PVC", 3500, { salePrice: 2800 }),
  mk("decorative-ceilings", "سقف خشبي ثلاثي الأبعاد", 8900, { isNew: true, isFeatured: true }),
  mk("decorative-ceilings", "سقف معدني فضي عصري", 7200),
  mk("decorative-ceilings", "سقف جبس بنقوش أوروبية", 9800, { isFeatured: true }),
  mk("decorative-ceilings", "سقف ممتد لامع لاكيه", 12500, { isNew: true, isBestSeller: true }),
];

export function getProductBySlug(slug: string, all: Product[] = INITIAL_PRODUCTS): Product | undefined {
  return all.find((p) => p.slug === slug);
}

export function getProductsByCategory(cat: ProductCategory, all: Product[] = INITIAL_PRODUCTS): Product[] {
  return all.filter((p) => p.category === cat);
}

export function getRelatedProducts(p: Product, all: Product[] = INITIAL_PRODUCTS, limit = 4): Product[] {
  return all.filter((x) => x.category === p.category && x.id !== p.id).slice(0, limit);
}
