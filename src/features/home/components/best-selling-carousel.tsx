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
      className="w-full"
      opts={{
        loop: true,
        direction,
        slidesToScroll: 1,
      }}
    >
      <CarouselContent className="-ms-6">
        {bestSellingProducts.map((product) => (
          <CarouselItem
            key={product.id}
            className="flex basis-full justify-center ps-6  lg:basis-[326px] lg:justify-start"
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="w-[38px] h-[38px] absolute inset-s-[-19px] bg-bg-primary text-text-inverse enabled:hover:bg-bg-primary-saturated data-[hover=true]:bg-bg-primary-saturated dark:disabled:bg-bg-muted" />
      <CarouselNext className="w-[38px] h-[38px] absolute inset-e-[-19px] bg-bg-primary text-text-inverse enabled:hover:bg-bg-primary-saturated data-[hover=true]:bg-bg-primary-saturated dark:disabled:bg-bg-muted" />
    </Carousel>
  );
}
