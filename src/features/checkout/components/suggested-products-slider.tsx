'use client';

import { useLocale, useTranslations } from 'next-intl';
import HeaderTitle from '@/features/home/components/headr-title';
import ProductCard from '@/features/home/components/product-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';
import type { IProduct } from '@/shared/lib/types/product-types';

interface SuggestedProductsSliderProps {
  products: IProduct[];
  className?: string;
}

export function SuggestedProductsSlider({
  products,
  className = '',
}: SuggestedProductsSliderProps) {
  const t = useTranslations('checkout');
  const locale = useLocale();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className={`w-full my-8 ${className}`}>
      <HeaderTitle text={t('suggestedProducts')} className="mb-6" />

      <div className="relative px-2 sm:px-4">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            direction: locale === 'ar' ? 'rtl' : 'ltr',
          }}
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
          className="w-full"
        >
          <CarouselContent className="-ml-4 rtl:-mr-4 rtl:ml-0">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 rtl:pr-4 rtl:pl-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="z-10 inset-s-1 md:inset-s-1 bg-bg-primary text-text-inverse hover:bg-bg-primary-saturated dark:enabled:hover:!bg-maroon-600 hover:text-text-plain border-none shadow-md transition-colors" />
          <CarouselNext className="z-10 inset-e-1 md:inset-e-1 bg-bg-primary text-text-inverse hover:bg-bg-primary-saturated dark:enabled:hover:!bg-maroon-600 dark:hover:!bg-maroon-600 hover:text-text-plain border-none shadow-md transition-colors" />
        </Carousel>
      </div>
    </section>
  );
}
