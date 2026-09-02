/**
 * Reusable "Products You May Like" section.
 *
 * Usage:
 * ```tsx
 * <ProductsYouMayLike />
 * ```
 *
 * Can also be passed pre-fetched `products`:
 * ```tsx
 * <ProductsYouMayLike products={productsArray} />
 * ```
 */
import React from 'react';
import { IProduct } from '@/shared/lib/types/product-types';
import { getSuggestedProducts } from '@/features/checkout/apis/suggested-products.service';
import { SuggestedProductsSlider } from '@/features/checkout/components/suggested-products-slider';

interface ProductsYouMayLikeProps {
  products?: IProduct[];
  className?: string;
}

export default async function ProductsYouMayLike({
  products,
  className,
}: ProductsYouMayLikeProps) {
  const fetchedProducts = products ?? (await getSuggestedProducts(8));

  return (
    <SuggestedProductsSlider
      products={fetchedProducts}
      className={className}
    />
  );
}
