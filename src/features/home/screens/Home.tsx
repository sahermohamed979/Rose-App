import React from 'react';
import AboutSection from '../components/about-home';
import GallerySection from '../components/gallery-home';
import TestimonialsSection from '../components/testimonials-home';
import BrandsSection from '../components/brands-home';

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <BrandsSection />
    </div>
  );
}
