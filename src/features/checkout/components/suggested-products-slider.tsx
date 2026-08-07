'use client';

import React, { useEffect, useState } from 'react';
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
import { IProduct } from '@/shared/lib/types/product-types';
import { getSuggestedProductsAction } from '../apis/suggested-products.action';

interface SuggestedProductsSliderProps {
  initialProducts?: IProduct[];
  className?: string;
}

export function SuggestedProductsSlider({
  initialProducts,
  className = '',
}: SuggestedProductsSliderProps) {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const [products, setProducts] = useState<IProduct[]>(
    initialProducts ?? []
  );
  const [isLoading, setIsLoading] = useState<boolean>(
    !initialProducts || initialProducts.length === 0
  );

  useEffect(() => {
    if (!initialProducts || initialProducts.length === 0) {
      let isMounted = true;
      setIsLoading(true);
      getSuggestedProductsAction(8)
        .then((data) => {
          if (isMounted) {
            setProducts(data);
          }
        })
        .catch((err) => {
          // console.error('[SuggestedProductsSlider Error]:', err);
        })
        .finally(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        });

      return () => {
        isMounted = false;
      };
    }
  }, [initialProducts]);

  if (isLoading) {
    return (
      <div className={`w-full my-8 ${className}`}>
        <HeaderTitle text={t('suggestedProducts')} className="mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="h-[340px] rounded-2xl bg-bg-muted/60 w-full"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className={`w-full my-8 ${className}`}>
      {/* Title */}
      <HeaderTitle text={t('suggestedProducts')} className="mb-6" />

      {/* Carousel Container */}
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
          <CarouselPrevious className="z-10 inset-s-1 md:inset-s-1 bg-bg-primary text-text-inverse hover:bg-bg-primary-saturated dark:enabled:hover:!bg-maroon-600  hover:text-text-plain border-none shadow-md transition-colors" />
          <CarouselNext className="z-10 inset-e-1 md:inset-e-1 bg-bg-primary text-text-inverse hover:bg-bg-primary-saturated dark:enabled:hover:!bg-maroon-600 dark:hover:!bg-maroon-600 hover:text-text-plain border-none shadow-md transition-colors" />
        </Carousel>
      </div>
    </section>
  );
}
