'use client';

import { StarRating } from '@/shared/components/ui/star-rating';
import type { Review } from '../../../shared/lib/types/product-types';
import { useLocale } from 'next-intl';

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const initials = getInitials(
    review.user.firstName,
    review.user.lastName
  );
  const fullName = `${review.user.firstName} ${review.user.lastName}`;
  const locale = useLocale();
  const formattedDate = new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    numberingSystem: locale === 'ar' ? 'arab' : 'latn',
  }).format(new Date(review.createdAt));

  const formattedRating = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    numberingSystem: locale === 'ar' ? 'arab' : 'latn',
  }).format(review.rating);

  return (
    <article
      role="listitem"
      className="flex flex-col gap-2 border-b border-border-subtle pb-4 last:border-b-0 last:pb-0"
    >
      {/* Header: Avatar & User Info */}
      <div className="flex gap-3">
        {/* Avatar */}
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-bg-primary-saturated text-sm font-semibold text-text-inverse"
          aria-label={fullName}
        >
          {initials}
        </div>

        {/* Name, Date & Star Rating */}
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <div className="flex flex-col gap-0.5">
            <span className="text-[16px] font-semibold text-text-plain">
              {fullName}
            </span>
            <time
              dateTime={review.createdAt}
              className="text-sm text-text-muted"
            >
              {formattedDate}
            </time>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <StarRating value={review.rating} size="sm" readOnly />
        <span className="text-[16px] font-medium text-text-plain">
          ({formattedRating})
        </span>
      </div>

      {/* Review Title & Body */}
      {(review.headline || review.content) && (
        <div className="flex flex-col gap-1">
          {review.headline && (
            <p className="text-[16px] font-semibold text-text-plain">
              {review.headline}
            </p>
          )}

          {review.content && (
            <p className="text-sm leading-relaxed text-text-default">
              {review.content}
            </p>
          )}
        </div>
      )}
    </article>
  );
}
