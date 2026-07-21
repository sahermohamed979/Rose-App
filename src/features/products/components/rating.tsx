'use client';

import { useTranslations } from 'next-intl';
import { StarRating } from '@/shared/components/ui/star-rating';

interface OverallRatingProps {
  /** Average rating value (0–5) */
  rating: number;
  ratingsCount: number;
}

export function OverallRating({
  rating,
  ratingsCount,
}: OverallRatingProps) {
  // translation
  const t = useTranslations('productReview');

  const hasRatings = ratingsCount > 0;

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xl font-semi-bold text-text-plain">
        {t('generalRating')}
      </p>

      {hasRatings ? (
        <>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-text-plain">
              {rating.toFixed(1)}
            </span>
            <span className="text-sm text-text-muted">
              ({ratingsCount}{' '}
              {ratingsCount === 1
                ? //   singular and plural
                  t('ratingSingular')
                : t('ratingPlural')}
              )
            </span>
          </div>
          <StarRating value={rating} size="lg" readOnly />
        </>
      ) : (
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold text-text-muted">
            —
          </span>
          <StarRating value={0} size="lg" readOnly />
          <p className="text-sm text-text-muted">
            {t('noReviewsYet')}
          </p>
        </div>
      )}
    </div>
  );
}
