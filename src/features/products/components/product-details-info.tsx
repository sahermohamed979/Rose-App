'use client';
import { useLocale } from 'next-intl';
import { ProductGallery } from './product-details-gallery';
import { useProductInfo } from '../hooks/use-product-details-info';
import { ProductDetailsSkeleton } from '../skeletons/product-details.skelton';
import ProductDetailsPrice from './product-details-price';
import ProductStockBadge from './product-details-stock';
import ProductRating from './product-details-ratings';
import ProductActions from './product-details-actions';
import { IProduct } from '@/shared/lib/types/product-types';

interface Props {
  productId: string;
  initialData?: IProduct;
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

  let parsedGallery: string[] = [];
  if (Array.isArray(product.gallery)) {
    parsedGallery = product.gallery;
  } else if (typeof product.gallery === 'string') {
    try {
      parsedGallery = JSON.parse(product.gallery);
    } catch {
      parsedGallery = [];
    }
  }
  const images = [
    ...new Set([product.cover, ...parsedGallery]),
  ].filter(Boolean);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 w-full">
      <ProductGallery images={images} title={product.title} />

      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="text-3xl text-text-plain font-semibold">
            {product.title}
          </h1>

          <div className="flex items-center">
            <ProductDetailsPrice
              price={product.price}
              discountValue={product.discountValue ?? '0'}
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

          <article className="max-h-56 overflow-y-auto text-text-default font-normal">
            {product.description}
          </article>
        </div>

        <ProductActions productId={productId} stock={product.stock} />
      </div>
    </section>
  );
}
