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
import { getSuggestedProductsAction } from '@/features/cart/apis/suggested-products.action';
import { SuggestedProductsSlider } from '@/features/cart/components/suggested-products-slider';

interface ProductsYouMayLikeProps {
  products?: IProduct[];
  className?: string;
}

export default async function ProductsYouMayLike({
  products,
  className,
}: ProductsYouMayLikeProps) {
  const fetchedProducts =
    products ?? (await getSuggestedProductsAction(8));

  return (
    <SuggestedProductsSlider
      initialProducts={fetchedProducts}
      className={className}
    />
  );
}
