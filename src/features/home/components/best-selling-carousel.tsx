'use client';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';
import ProductCard from './product-card';
import { IProduct } from '@/shared/lib/types/product-types';
import { useLocale } from 'next-intl';

export default function BestSellingCarousel({
  bestSellingProducts,
}: {
  bestSellingProducts: IProduct[];
}) {
  const locale = useLocale();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <Carousel
      className="w-full relative"
      opts={{
        align: 'start',
        loop: true,
        direction,
        slidesToScroll: 1,
      }}
      dir={direction}
    >
      <CarouselContent className="-ms-4 sm:-ms-6">
        {bestSellingProducts.map((product) => (
          <CarouselItem
            key={product.id}
            className="flex basis-full justify-center ps-4 sm:ps-6 sm:basis-1/2 lg:basis-[280px] xl:basis-[326px] lg:justify-start"
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="w-9 h-9 sm:w-[38px] sm:h-[38px] absolute inset-s-1 md:inset-s-2 z-10 bg-bg-primary text-text-inverse enabled:hover:bg-bg-primary-saturated data-[hover=true]:bg-bg-primary-saturated dark:disabled:bg-bg-muted border-none shadow-md" />
      <CarouselNext className="w-9 h-9 sm:w-[38px] sm:h-[38px] absolute inset-e-1 md:inset-e-2 z-10 bg-bg-primary text-text-inverse enabled:hover:bg-bg-primary-saturated data-[hover=true]:bg-bg-primary-saturated dark:disabled:bg-bg-muted border-none shadow-md" />
    </Carousel>
  );
}
