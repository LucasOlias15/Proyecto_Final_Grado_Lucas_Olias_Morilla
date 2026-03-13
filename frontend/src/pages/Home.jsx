import { HeroSection } from "../components/HeroSection";
import { CategoriesBento } from "../components/CategoriesBento";
import { ProductsCarousel } from "../components/ProductsCarousel";
import { InfiniteTicker } from "../components/InfiniteTicker";
import { MerchantBanner } from "../components/MerchantBanner";
import { TestimonialsStack } from "../components/TestimonialsStack";

export const Home = () => {
  return (
    <div className="w-full relative min-h-screen flex flex-col items-center">
      <HeroSection />
      <CategoriesBento />
      <InfiniteTicker />
      <ProductsCarousel /> 
      <MerchantBanner /> 
      <TestimonialsStack /> 
    </div>
  );
};

