import { HeroSection } from "@/components/home/HeroSection";
import { PromoBanner } from "@/components/home/PromoBanner";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyUsSection, StatsStrip } from "@/components/home/WhyUsSection";
import { TestimonialsSection, BrandsStrip } from "@/components/home/TestimonialsSection";



export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <PromoBanner /> */}
      <CategoryGrid />
      <FeaturedProducts />
      <StatsStrip />
      <WhyUsSection />
      <TestimonialsSection />
      {/* <BrandsStrip /> */}
    </>
  );
}
