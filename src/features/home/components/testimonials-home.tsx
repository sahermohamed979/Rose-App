'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/shared/components/ui/carousel';
import SectionSubtitle from './section-subtitle';
import { testimonialsData } from '../consts/testimonials-data';
import HeaderTitle from './headr-title';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils/utils';

// Data
const extendedTestimonials = [
  ...testimonialsData,
  ...testimonialsData,
];

function TestimonialsSection() {
  // Translation
  const t = useTranslations('home');
  const locale = useLocale();

  // Plugins
  const [plugin] = useState(() =>
    AutoScroll({
      speed: 3,
      stopOnInteraction: true,
    })
  );

  return (
    <section>
      {/* Title */}
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-12">
          <SectionSubtitle
            Text={t('testimonials.label')}
            className="mx-auto"
          />
          <HeaderTitle
            text={t('testimonials.title')}
            className="mx-auto"
          />
        </div>
      </div>

      {/* Carousel */}
      <div className="w-full bg-bg-carosel py-10">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            dragFree: true,
            watchDrag: true,
            direction: locale === 'ar' ? 'rtl' : 'ltr',
          }}
          plugins={[plugin]}
          onMouseEnter={() => plugin.stop()}
          onMouseLeave={() => plugin.play()}
          onMouseUp={() => plugin.play()}
          onTouchEnd={() => plugin.play()}
          className="w-full"
        >
          {/* Testimonials */}
          <CarouselContent className="pt-16 pb-4 -ml-4 md:-ml-6 px-5">
            {extendedTestimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="bg-white rounded-3xl p-8 pt-16 relative flex flex-col items-center text-center h-full select-none cursor-grab active:cursor-grabbing">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={96}
                      height={96}
                      draggable={false}
                      className="w-24 h-24 rounded-full object-cover border-4 border-border-inverse"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="text-zinc-800 font-semibold text-base mb-3">
                    {testimonial.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={cn(
                          'shrink-0',
                          i < testimonial.rating
                            ? 'fill-[#FBA707] text-[#ffb800]'
                            : 'text-[#FBA707]'
                        )}
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-zinc-800 text-sm leading-relaxed mb-8 grow">
                    {testimonial.text}
                  </p>

                  {/* Date */}
                  <span className="text-zinc-400 text-xs">
                    {testimonial.date}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export default TestimonialsSection;
