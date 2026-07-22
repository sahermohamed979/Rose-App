'use client';
import { useLocale } from 'next-intl';
import { ProductGallery } from './product-details-gallery';
import { useProductInfo } from '../hooks/use-product-details-info';
import { ProductDetailsSkeleton } from '../skeletons/product-details-skelton';
import ProductDetailsPrice from './product-details-price';
import ProductStockBadge from './product-details-stock';
import ProductRating from './product-details-ratings';
import ProductActions from './product-details-actions';
import { ProductDetailsResponse } from '@/shared/lib/types/product-details';

interface Props {
  productId: string;
  initialData?: ProductDetailsResponse['product'];
}

export default function ProductDetailsInfo({
  productId,
  initialData,
}: Props) {
  const { data: product, isLoading } = useProductInfo(
    productId,
    initialData
  );

  const locale = useLocale();

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  // Product doesn't exist
  if (!product) {
    return null;
  }

  const gallery = product.gallery ? JSON.parse(product.gallery) : [];

  const images = [...new Set([product.cover, ...gallery])];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 w-full">
      <ProductGallery images={images} title={product.title} />

      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl text-text-plain font-semibold">
            {product.title}
          </h1>

          <div className="flex items-center">
            <ProductDetailsPrice
              price={product.price}
              discountValue={product.discountValue}
              locale={locale}
            />

            <ProductStockBadge
              stock={product.stock}
              locale={locale}
            />
          </div>

          <ProductRating
            rating={product.rating}
            ratings={product.ratings}
            locale={locale}
          />

          <article className="max-h-56 overflow-y-auto">
            {product.description}
          </article>
        </div>

        <ProductActions stock={product.stock} />
      </div>
    </section>
  );
}
