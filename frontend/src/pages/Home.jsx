import { HeroSection } from '../components/home/HeroSection';
import { CategoriesBento } from '../components/home/CategoriesBento';
import { IconTicker } from '../components/home/IconTicker';
import { InfiniteTicker } from '../components/home/InfiniteTicker';
import { MerchantBanner } from '../components/home/MerchantBanner';
import { ProductsCarousel } from '../components/home/ProductsCarousel';
import { TestimonialsStack } from '../components/home/TestimonialsStack';

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

