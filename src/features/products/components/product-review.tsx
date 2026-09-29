/**
 * you only need to pass the product id and the component will handle the rest
 * for example:
 * <ProductReview productId="1" />
 *
 */

import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { OverallRating } from './rating';
import { ReviewsList, ReviewsListSkeleton } from './reviews-list';
import {
  getProductReviews,
  getProductById,
} from '../apis/product-reviews.actions';
import { ReviewSubmissionForm } from './review-submision-form';

interface ProductReviewProps {
  productId: string;
  className?: string;
}

export async function ProductReview({
  productId,
  className = '',
}: ProductReviewProps) {
  const t = await getTranslations('productReview');

  const [productResponse, reviewsResponse] = await Promise.all([
    getProductById(productId),
    getProductReviews({ productId }),
  ]);

  const product = productResponse.status
    ? productResponse.payload.products?.[0]
    : null;

  const rating = product?.rating ?? 0;
  const ratingsCount = product?.ratings ?? 0;

  const reviews = reviewsResponse.status
    ? (reviewsResponse.payload?.data ?? [])
    : [];
  const isError = !reviewsResponse.status;

  return (
    <div className={`flex flex-col gap-6 w-full ${className}`}>
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-text-primary">
          {t('title')}
        </h2>
      </div>

      {/* Overall Rating Section - Full Width */}
      <div className="w-full">
        <OverallRating rating={rating} ratingsCount={ratingsCount} />
      </div>

      <hr className="border-border-subtle" />

      {/* Grid container (3 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reviews List Section (takes 2 columns) */}
        <div className="lg:col-span-2">
          <Suspense fallback={<ReviewsListSkeleton />}>
            <ReviewsList reviews={reviews} isError={isError} />
          </Suspense>
        </div>

        {/* Placeholder for Add Review Form (takes 1 column - to be added later) */}
        <div className="lg:col-span-1">
          <ReviewSubmissionForm />
        </div>
      </div>
    </div>
  );
}

export default ProductReview;
