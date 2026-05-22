import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/bmg/Breadcrumb";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { getCategoryBySlug } from "@/data/categories";
import { S } from "@/constants/strings";
import { INITIAL_PRODUCTS } from "@/data/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);

  if (!cat) {
    return {};
  }

  return {
    title: `${cat.name} — ${S.brand.name}`,
    description: cat.description ?? "",
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);

  if (!cat) {
    notFound();
  }

  const products = INITIAL_PRODUCTS.filter((p) => p.category === cat!.id);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: S.nav.home, to: "/" },
          { label: S.shop.title, to: "/shop" },
          { label: cat!.name },
        ]}
      />

      {/* Hero Section */}
      <div
        className="relative mt-6 overflow-hidden rounded-3xl bg-cover bg-center p-10 text-white shadow-[var(--shadow-elegant)]"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(13,37,69,0.85), rgba(26,111,191,0.6)), url(${cat!.image})`,
        }}
      >
        <h1 className="text-4xl font-black md:text-5xl">
          {cat!.name}
        </h1>

        <p className="mt-3 max-w-xl text-white/85">
          {cat!.description}
        </p>

        <p className="mt-4 inline-block rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy">
          {S.shop.productsCount(products.length)}
        </p>
      </div>

      {/* Products Grid */}
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}