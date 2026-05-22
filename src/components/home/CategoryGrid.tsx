"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { SectionTitle } from "@/components/bmg/Section";
import { CATEGORIES } from "@/data/categories";
import { S } from "@/constants/strings";
import { useProductsStore } from "@/store/productsStore";
import Link from "next/link";

export function CategoryGrid() {
  const products = useProductsStore((s) => s.products);
  return (
    <section className="container mx-auto px-4 py-20">
      <SectionTitle title={S.home.categoriesTitle} subtitle={S.home.categoriesSub} />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c, i) => {
          const count = products.filter((p) => p.category === c.id).length;
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href={`/category/${c.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-elegant)] hover:ring-2 hover:ring-gold/50"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="inline-block rounded-full bg-gold/95 px-3 py-1 text-xs font-bold text-navy">
                    {count} منتج
                  </span>
                  <h3 className="mt-3 text-2xl font-black">{c.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/80">{c.description}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-gold opacity-0 transition-all group-hover:opacity-100">
                    استكشف <ArrowLeft size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
