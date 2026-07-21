'use client';

import { useTranslations } from 'next-intl';
import { OverallRating } from './rating';
import { ReviewsList } from './reviews-list';

interface ProductReviewProps {
  productId: string;
  rating: number;
  ratingsCount: number;
  className?: string;
}

export function ProductReview({
  productId,
  rating,
  ratingsCount,
  className = '',
}: ProductReviewProps) {
  const t = useTranslations('productReview');

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
          <ReviewsList productId={productId} />
        </div>

        {/* Placeholder for Add Review Form (takes 1 column - to be added later) */}
        <div className="lg:col-span-1">
          {/* Reserved space for Add Review Form component */}
        </div>
      </div>
    </div>
  );
}

export default ProductReview;
