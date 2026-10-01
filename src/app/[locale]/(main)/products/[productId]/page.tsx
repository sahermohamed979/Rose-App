import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';
import { getTranslations } from 'next-intl/server';

import { getProductDetailsInfo } from '@/features/products/apis/product-details-info.api';
import ProductDetailsInfo from '@/features/products/components/product-details-info';
import ProductReview from '@/features/products/components/product-review';
import RelatedProducts from '@/features/products/components/related-products';
import RelatedProductsSkeleton from '@/features/products/skeletons/related-peoducts-skeleton';

interface PageProps {
  params: Promise<{
    productId: string;
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string; locale: string }>;
}): Promise<Metadata> {
  // Translations
  const { productId, locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.productDetails',
  });

  try {
    const response = await getProductDetailsInfo(productId);

    if (!response.status || !response.payload?.product) {
      return {
        title: t('notFound'),
      };
    }

    const product = response.payload.product;
    const title = product.title;
    const description =
      product.description?.replace(/<[^>]*>?/gm, '').slice(0, 160) ||
      t('description');
    const image = product.cover;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: image ? [{ url: image, alt: title }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: image ? [image] : [],
      },
    };
  } catch {
    return {
      title: t('title'),
      description: t('description'),
    };
  }
}

export default async function Page({ params }: PageProps) {
  // Translations
  const t = await getTranslations('ProductDetails');

  const { productId } = await params;

  const response = await getProductDetailsInfo(productId);

  // Product doesn't exist
  if (response.code === 404) {
    notFound();
  }

  // Server / Network errors
  if (!response.status) {
    throw new Error('Failed to load product details');
  }

  const product = response.payload.product;
  const categoryId = product.categoryId;

  return (
    <div>
      <div className="flex flex-col gap-5 px-4">
        <ProductDetailsInfo
          productId={productId}
          initialData={response.payload.product}
        />
      </div>
      <div className="w-full px-4 sm:px-6 md:px-9">
        <ProductReview productId={productId} />
      </div>
      <div>
        <ErrorBoundary
          fallback={
            <p className="text-text-danger">
              {t('relatedProductsError')}
            </p>
          }
        >
          <Suspense fallback={<RelatedProductsSkeleton />}>
            <RelatedProducts
              currentProductId={productId}
              categoryId={categoryId}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
