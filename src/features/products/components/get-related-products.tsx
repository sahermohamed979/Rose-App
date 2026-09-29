import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';
import getRelatedProductsAction from '../apis/get-related-products-action';
import ProductCard from '@/features/home/components/product-card';

export async function GetRelatedProducts({
  categoryId,
  currentProductId,
}: {
  categoryId: string;
  currentProductId: string;
}) {
  const category = await getRelatedProductsAction(categoryId);

  if (!category.status) {
    throw new Error('Failed to load related products');
  }

  const products = category.payload.category.products.filter(
    (product) => product.id !== currentProductId
  );

  return (
    <div className="relative w-full px-10 mt-6.5">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 basis-3/12"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0 bg-maroon-600 text-white  border-none rounded-full" />
        <CarouselNext className="right-0 bg-maroon-600 text-white  border-none rounded-full" />
      </Carousel>
    </div>
  );
}
