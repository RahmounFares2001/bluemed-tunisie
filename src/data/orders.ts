import type { Order } from "@/types/order";

export const INITIAL_ORDERS: Order[] = [
  {
    ref: "BMG-4829-XK",
    customer: { fullName: "أحمد بن صالح", phone: "0555123456", wilaya: "تونس", city: "بئر مراد رايس", address: "حي السلام، شارع الاستقلال رقم 12" },
    items: [
      { productId: "p1", name: "ألواح خشب البلوط الفاخر", image: "", price: 6800, quantity: 4 },
      { productId: "p11", name: "لوح رخامي كلاسيكي أبيض", image: "", price: 11500, quantity: 2 },
    ],
    subtotal: 50200, shipping: 0, discount: 0, total: 50200,
    status: "delivered", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(), paymentMethod: "cod",
  },
  {
    ref: "BMG-4830-PL",
    customer: { fullName: "ليلى مرابط", phone: "0666789012", wilaya: "وهران", city: "بئر الجير", address: "شارع الأمير عبد القادر رقم 45" },
    items: [{ productId: "p18", name: "أرضية باركيه بلوط فاخر", image: "", price: 12500, quantity: 3 }],
    subtotal: 37500, shipping: 0, discount: 3750, total: 33750, promoCode: "BMG10",
    status: "shipped", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), paymentMethod: "cod",
  },
  {
    ref: "BMG-4831-MR",
    customer: { fullName: "كريم بوعلام", phone: "0777345678", wilaya: "قسنطينة", city: "وسط المدينة", address: "شارع 19 جوان رقم 8" },
    items: [{ productId: "p26", name: "ثريا كريستال كلاسيكية", image: "", price: 22500, quantity: 1 }],
    subtotal: 22500, shipping: 0, discount: 0, total: 22500,
    status: "processing", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), paymentMethod: "cod",
  },
  {
    ref: "BMG-4832-TR",
    customer: { fullName: "سامية حمدي", phone: "0555987654", wilaya: "سطيف", city: "العلمة", address: "حي 8 ماي رقم 22" },
    items: [{ productId: "p21", name: "كسوة جدران حجرية طبيعية", image: "", price: 7800, quantity: 5 }],
    subtotal: 39000, shipping: 0, discount: 0, total: 39000,
    status: "new", createdAt: new Date().toISOString(), paymentMethod: "cod",
  },
  {
    ref: "BMG-4833-NB",
    customer: { fullName: "يوسف زيدان", phone: "0666112233", wilaya: "عنابة", city: "البوني", address: "حي القدس، عمارة 12، شقة 4" },
    items: [{ productId: "p44", name: "سقف جبس مزخرف كلاسيكي", image: "", price: 5800, quantity: 8 }],
    subtotal: 46400, shipping: 0, discount: 6960, total: 39440, promoCode: "VIP20",
    status: "new", createdAt: new Date().toISOString(), paymentMethod: "cod",
  },
];
