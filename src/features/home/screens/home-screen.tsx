import Bestselling from '../components/best-selling';
import { Suspense } from 'react';
import MostPopularSection from '../components/most-popular-section';
import MostPopularSkeleton from '../skeletons/most-popular-skelton';
import AboutSection from '../components/about-home';
import GallerySection from '../components/gallery-home';
import TestimonialsSection from '../components/testimonials-home';
import BrandsSection from '../components/brands-home';
import HeroSection from '../components/hero-section/hero-section';

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
    <div className="flex flex-col gap-4">
      <HeroSection />

      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <BrandsSection />
      <div className="container mx-auto">
        <Bestselling />
        <Suspense fallback={<MostPopularSkeleton />}>
          <MostPopularSection searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
