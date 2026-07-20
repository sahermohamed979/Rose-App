'use client';
import { HeartPlus, ShoppingCart, Package, Star } from 'lucide-react';
import { useProductInfo } from '../hooks/use-product-details-info';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { ProductDetailsSkeleton } from '../skeletons/product-details-skelton';
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
  const images = [
    product.cover,
    ...(product.gallery ? JSON.parse(product.gallery) : []),
  ];
  // Discount
  const discountPrice =
    Number(product.price) -
    (Number(product.price) * Number(product.discountValue)) / 100;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 ">
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
            <span className="text-text-subtle line-through font-bold text-xl">
              {product.price} EGP
            </span>
            {/* Discount */}
            <span className="text-3xl text-text-plain font-semibold">
              {discountPrice.toFixed(2)} EGP
            </span>
            {/* Stock */}
            <Badge
              className="text-sm text-text-plain bg-bg-muted ml-2"
              variant="subtle"
            >
              <Package size={18} className="mr-1" />{' '}
              {product.discountValue} left in stock
            </Badge>
          </div>
          {/* Rating */}
          <div className="flex items-center gap-2 border-y border-border-subtle my-6 py-4">
            <span className="text-yellow-500">
              <Star fill="currentColor" size={20} />
            </span>
            <span className="text-base font-normal">
              Rating: <b>{product.rating.toFixed(1)}</b> / 5
            </span>
            <span className="text-blue-600 font-medium">
              ({product.ratings} ratings)
            </span>
          </div>
          {/* description */}
          <p className="text-text-default font-normal text-base">
            {product.description}
          </p>
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
            className="flex-1 text-text-inverse flex items-center justify-center gap-2  h-11"
          >
            <ShoppingCart size={25} /> Add to cart
          </Button>
        </div>
      </div>
    </section>
  );
}
