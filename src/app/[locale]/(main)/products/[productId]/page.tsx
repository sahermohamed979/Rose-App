import { notFound } from 'next/navigation';
import { getProductDetailsInfo } from '@/features/products/apis/product-details-info.api';
import ProductDetailsInfo from '@/features/products/components/product-details-info';
import ProductReview from '@/features/products/components/product-review';
import RelatedProducts from '@/features/products/components/related-products';
import { Suspense } from 'react';
import RelatedProductsSkeleton from '@/features/products/skeletons/related-peoducts-skeleton';
import { ErrorBoundary } from 'react-error-boundary';

interface PageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
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
      <div className="ms-10">
        <ProductReview productId={productId} />
      </div>
      <div>
        <ErrorBoundary
          fallback={
            <p className="text-text-danger">
              Failed to load related products
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
