'use client';

import { HeartPlus, Package, ShoppingCart, Star } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { ProductDetailsSkeleton } from '../skeletons/product-details-skelton';
import { useProductInfo } from '../hooks/use-product-details-info';
import { ProductGallery } from './product-details-gallery';

interface ProductDetailsInfoProps {
  productId: string;
}

export default function ProductDetailsInfo({
  productId,
}: ProductDetailsInfoProps) {
  // Hooks
  const { data: product, isLoading } = useProductInfo(productId);

  // Loading State
  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  // Not Found
  if (!product) {
    return (
      <h3 className="text-center text-2xl text-text-danger">
        Product not found
      </h3>
    );
  }

  // Gallery
  let gallery: string[] = [];

  try {
    gallery = product.gallery ? JSON.parse(product.gallery) : [];
  } catch {
    gallery = [];
  }

  const images = [...new Set([product.cover, ...gallery])];

  // Discount
  const hasDiscount = Number(product.discountValue) > 0;
  const discountPrice =
    Number(product.price) -
    (Number(product.price) * Number(product.discountValue)) / 100;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6">
      {/* Gallery Component */}
      <ProductGallery images={images} title={product.title} />

      {/* Details */}
      <div className="flex flex-col justify-between">
        <div>
          {/* Title */}
          <h1 className="text-3xl font-semibold text-text-plain">
            {product.title}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            {hasDiscount ? (
              <>
                <span className="text-text-subtle line-through font-bold text-xl">
                  {product.price} EGP
                </span>

                <span className="text-3xl text-text-plain font-semibold">
                  {discountPrice.toFixed(2)} EGP
                </span>
              </>
            ) : (
              <span className="text-3xl text-text-plain font-semibold">
                {product.price} EGP
              </span>
            )}

            {/* Stock */}
            <Badge
              variant="subtle"
              className="ml-2 bg-bg-muted text-sm text-text-plain"
            >
              <Package size={18} className="mr-1" />
              {product.stock > 0
                ? `${product.stock} units in stock`
                : 'Out of stock'}
            </Badge>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 border-y border-border-subtle my-6 py-4">
            <Star
              fill="currentColor"
              size={20}
              className="text-yellow-500"
            />

            <span className="text-base font-normal">
              Rating: <b>{product.rating.toFixed(1)}</b> / 5
            </span>

            <span className="text-blue-600 font-medium">
              ({product.ratings} ratings)
            </span>
          </div>

          {/* Description */}
          <div className="max-h-56 overflow-y-auto ">
            <p className="text-text-default text-base leading-7">
              {product.description}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-10">
          {/* Add to favorites */}
          <button
            className="w-12 h-12 rounded-2xl bg-bg-muted flex items-center justify-center"
            aria-label="Add to favorites"
          >
            <HeartPlus size={20} />
          </button>

          {/* Add to cart */}
          <Button
            variant="default"
            disabled={product.stock === 0}
            className="flex-1 h-11 flex items-center justify-center gap-2 text-text-inverse"
          >
            <ShoppingCart size={22} />
            Add to cart
          </Button>
        </div>
      </div>
    </section>
  );
}
