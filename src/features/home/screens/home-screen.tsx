import Bestselling from '../components/best-selling';
import { Suspense } from 'react';
import MostPopularSection from '../components/most-popular-section';
import MostPopularSkeleton from '../skeletons/most-popular-skelton';
import AboutSection from '../components/about-home';
import GallerySection from '../components/gallery-home';
import TestimonialsSection from '../components/testimonials-home';
import BrandsSection from '../components/brands-home';
import HeroSection from '../components/hero-section/hero-section';
import PromoCards from '../components/hero-section/promo-cards';
import FeaturesStrip from '../components/features-section/features-section';

interface HomeProps {
  searchParams: {
    occasion?: string | string[];
  };
}
export default function HomeScreen({
  searchParams,
}: {
  searchParams: HomeProps['searchParams'];
}) {
  return (
    <div className="flex flex-col gap-4 w-full overflow-x-hidden lg:px-20">
      <HeroSection />

      {/* Promo cards — previously inside hero section */}
      <div className="px-4 sm:px-6 md:px-9 mt-2">
        <PromoCards />
      </div>

      {/* Features strip */}
      <div className="px-4 sm:px-6 md:px-9 mt-4 md:mt-6">
        <FeaturesStrip />
      </div>

      <Bestselling />
      <Suspense fallback={<MostPopularSkeleton />}>
        <MostPopularSection searchParams={searchParams} />
      </Suspense>
      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <BrandsSection />
    </div>
  );
}
