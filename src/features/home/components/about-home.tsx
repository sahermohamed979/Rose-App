import React from 'react';
import img1 from '@/shared/assets/images/about-home (1).png';
import img2 from '@/shared/assets/images/about-home (2).png';
import img3 from '@/shared/assets/images/about-home (3).png';
import Image from 'next/image';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

const AboutSection = () => {
  const features = [
    'Competitive Prices & Easy Shopping',
    'Premium Quality & Elegant Packaging',
    'Perfect for Every Occasion',
    'Fast & Reliable Delivery',
  ];
  return (
    <section className="flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto py-16 px-5">
      {/* Photos*/}
      <div className="flex flex-col sm:flex-row gap-6 w-75 md:w-1/2 items-center">
        {/* Main Photo*/}
        <div className="relative w-full sm:w-3/5">
          {/*Back Line*/}
          <div className="absolute  -bottom-0.5  rotate-3 -left-6 w-full h-101 border-5 border-bg-primary-saturated rounded-[50px_120px_120px_120px] z-0"></div>
          <Image
            src={img3}
            alt="Purple Gift Box"
            className="relative w-full h-96 aspect-3/4 object-cover rounded-[50px_120px_120px_120px] z-10"
          />
        </div>

        {/* Other Photos*/}
        <div className="flex flex-row sm:flex-col gap-6 w-full sm:w-2/5">
          <Image
            src={img1}
            alt="Wrapped Gift"
            className="w-full aspect-square rounded-full object-cover"
          />
          <Image
            src={img2}
            alt="Gift with Balloons"
            className="w-full aspect-4/3 rounded-[50px_100px_100px_50px] object-cover"
          />
        </div>
      </div>

      {/* About*/}
      <div className="w-full md:w-1/2">
        <span className="text-text-secondary font-bold tracking-[25%] text-sm uppercase block mb-2">
          ABOUT
        </span>

        <h2 className="text-3xl md:text-4xl text-text-primary font-bold leading-snug mb-5">
          Delivering the{' '}
          <span className="text-text-secondary">Finest</span> Gift
          Boxes for Your{' '}
          <span className="text-text-secondary">Special</span> Moments
        </h2>

        <p className="text-text-soft text-base leading-relaxed mb-8 font-normal">
          Make every moment memorable with our premium gift boxes.
          Carefully curated and beautifully packaged, each box is
          filled with handpicked items designed to impress. Whether
          it&apos;s for a birthday,or a simple &quot;thank you,&quot;
          our gift boxes are crafted to leave a lasting impression —
          because thoughtful gifting starts here.
        </p>

        <Button
          className="bg-bg-primary-saturated text-text-inverse mb-5 text-base font-normal"
          variant="default"
        >
          Discover <ArrowRight size={4} />
        </Button>

        {/* Product Features*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 font-normal text-plain text-sm"
            >
              {/* Icon*/}
              <Check size={20} className="text-text-primary" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
