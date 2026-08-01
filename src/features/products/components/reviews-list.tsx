'use client';

import { useTranslations } from 'next-intl';
import { MessageSquareOff } from 'lucide-react';
import { ReviewCard } from './review-card';
import { ReviewCardSkeleton } from '../skeletons/review-card-skeleton';
import type { ProductReview } from '../../../shared/lib/types/product-types';

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
// skeleton for fallback when loading reviews
export function ReviewsListSkeleton() {
  return (
    <div
      className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border-soft flex max-h-[367px] flex-col gap-4 overflow-y-auto pe-1"
      role="list"
      aria-busy={true}
    >
      {[...Array(3)].map((_, i) => (
        <ReviewCardSkeleton key={i} />
      ))}
    </div>
  );
}

interface ReviewsListProps {
  reviews?: ProductReview[];
  isError?: boolean;
}

export function ReviewsList({
  reviews = [],
  isError = false,
}: ReviewsListProps) {
  const t = useTranslations('productReview');

  return (
    <section
      aria-label={t('customerReviews')}
      className="flex flex-col gap-3"
    >
      {/* Scrollable list */}
      <div
        className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border-soft flex max-h-[367px] flex-col gap-4 overflow-y-auto pe-1"
        role="list"
      >
        {isError ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <p className="text-sm text-text-danger">
              {t('loadError')}
            </p>
          </div>
        ) : reviews.length === 0 ? (
          <EmptyReviews />
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>
    </section>
  );
}
