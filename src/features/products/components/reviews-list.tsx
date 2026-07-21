'use client';

import { useTranslations } from 'next-intl';
import { MessageSquareOff } from 'lucide-react';
import { useProductReviews } from '../hooks/use-product-reviews';
import { ReviewCard } from './review-card';
import { ReviewCardSkeleton } from './review-card-skeleton';

// Empty State
function EmptyReviews() {
  const t = useTranslations('productReview');

  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-bg-muted">
        <MessageSquareOff className="size-5 text-text-muted" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-text-plain">
          {t('noReviewsTitle')}
        </p>
        <p className="text-xs text-text-muted">
          {t('noReviewsDescription')}
        </p>
      </div>
    </div>
  );
}

interface ReviewsListProps {
  productId: string;
}

export function ReviewsList({ productId }: ReviewsListProps) {
  // translation
  const t = useTranslations('productReview');

  // hook to get reviews
  const { data, isLoading, isError } = useProductReviews({
    productId,
  });

  // extract reviews
  const reviews = data?.data ?? [];

  return (
    <section
      aria-label={t('customerReviews')}
      className="flex flex-col gap-3"
    >
      {/* Scrollable list */}
      <div
        className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border-soft flex max-h-[367px] flex-col gap-4 overflow-y-auto pr-1"
        role="list"
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>
            {[...Array(3)].map((_, i) => (
              <ReviewCardSkeleton key={i} />
            ))}
          </>
        ) : isError ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <p className="text-sm text-text-danger">
              {t('loadError')}
            </p>
          </div>
        ) : reviews.length === 0 ? (
          <EmptyReviews />
        ) : (
          reviews.map((review) => (
            <div key={review.id} role="listitem">
              <ReviewCard review={review} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
