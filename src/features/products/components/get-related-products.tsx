import * as React from 'react';
import { getLocale } from 'next-intl/server';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';
import ProductCard from '@/features/home/components/product-card';
import getRelatedProductsAction from '../apis/get-related-products-action';
import { Product } from '../types/get-related-product-type';
import { IProduct } from '@/shared/lib/types/product-types';

interface GetRelatedProductsProps {
  categoryId?: string;
  currentProductId?: string;
  products?: (Product | IProduct)[];
}

export async function GetRelatedProducts({
  categoryId,
  currentProductId,
  products: initialProducts,
}: GetRelatedProductsProps) {
  // Locale
  const locale = await getLocale();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  // Products resolution
  let products = initialProducts;

  if (!products) {
    if (!categoryId) {
      return null;
    }

    const category = await getRelatedProductsAction(categoryId);

    if (!category.status) {
      throw new Error('Failed to load related products');
    }

    products = category.payload.category.products.filter(
      (product) => product.id !== currentProductId
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full px-1 sm:px-3 md:px-4">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          direction,
        }}
        dir={direction}
        className="w-full"
      >
        <CarouselContent className="-ms-3 sm:-ms-4 md:-ms-6">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="ps-3 sm:ps-4 md:ps-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
            >
              <ProductCard product={product as unknown as IProduct} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute start-1 sm:-start-2 md:-start-3 z-10 w-9 h-9 sm:w-10 sm:h-10 bg-maroon-600 hover:bg-maroon-700 text-white border-none rounded-full shadow-md transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none" />
        <CarouselNext className="absolute end-1 sm:-end-2 md:-end-3 z-10 w-9 h-9 sm:w-10 sm:h-10 bg-maroon-600 hover:bg-maroon-700 text-white border-none rounded-full shadow-md transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none" />
      </Carousel>
    </div>
  );
}
