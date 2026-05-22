"use client";

import {  Mail, MapPin, Phone, Send } from "lucide-react";
import { S } from "@/constants/strings";
import { CATEGORIES } from "@/data/categories";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 bg-navy text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              {/* <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary-light to-primary text-xl font-black text-white">
                B
              </div> */}
              <div>
                <p className="text-lg font-black">{S.brand.name}</p>
                <p className="text-[10px] tracking-[0.2em] text-gold">{S.brand.nameEn}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/70">{S.footer.about}</p>
            <div className="mt-5 flex gap-2">
              <a href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-gold hover:text-navy">
                <Mail size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-gold hover:text-navy">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-base font-bold text-gold">{S.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-gold">{S.nav.home}</Link></li>
              <li><Link href="/shop" className="hover:text-gold">{S.nav.shop}</Link></li>
              <li><Link href="/about" className="hover:text-gold">{S.nav.about}</Link></li>
              <li><Link href="/contact" className="hover:text-gold">{S.nav.contact}</Link></li>
              <li><Link href="/wishlist" className="hover:text-gold">{S.nav.wishlist}</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 text-base font-bold text-gold">الفئات</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link href={`/category/${c.slug}`} className="hover:text-gold">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + newsletter */}
          <div>
            <h4 className="mb-4 text-base font-bold text-gold">{S.footer.contact}</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" /> تونس العاصمة، تونس</li>
              <li className="flex items-center gap-2"><Phone size={16} className="text-gold" /> +216 000 000 000</li>
              <li className="flex items-center gap-2"><Mail size={16} className="text-gold" /> contact@bluemed</li>
            </ul>
            {/* <h4 className="mb-2 mt-6 text-sm font-bold text-gold">{S.footer.newsletter}</h4> */}
            {/* <p className="mb-3 text-xs text-white/60">{S.footer.newsletterDesc}</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={S.footer.emailPlaceholder}
                className="h-10 flex-1 rounded-lg border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/50 focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                aria-label={S.footer.subscribe}
                className="grid h-10 w-10 place-items-center rounded-lg bg-gold text-navy transition-colors hover:bg-gold-light"
              >
                <Send size={16} />
              </button>
            </form> */}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/60 md:flex-row">
          <span>{S.footer.rights}</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gold">{S.footer.privacy}</a>
            <a href="#" className="hover:text-gold">{S.footer.terms}</a>
            <a href="#" className="hover:text-gold">{S.footer.returns}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
