'use client';

import { StarRating } from '@/shared/components/ui/star-rating';
import type { Review } from '../types/product-types';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

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

  return (
    <article className="flex gap-3 border-b border-border-subtle pb-4 last:border-none last:pb-0">
      {/* Avatar */}
      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-bg-primary-saturated text-sm font-semibold text-text-inverse"
        aria-label={fullName}
      >
        {initials}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        {/* Header */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[16px] font-semibold text-text-plain">
            {fullName}
          </span>
          <time
            dateTime={review.createdAt}
            className="text-sm text-text-muted"
          >
            {formatDate(review.createdAt)}
          </time>
        </div>

        {/* Stars + numeric */}
        <div className="flex items-center gap-1.5">
          <StarRating value={review.rating} size="sm" readOnly />
          <span className="text-[16px] font-medium text-text-plain">
            ({review.rating.toFixed(1)})
          </span>
        </div>

        {/* Title */}
        {review.title && (
          <p className="text-[16px] font-semibold text-text-plain">
            {review.title}
          </p>
        )}

        {/* Body */}
        {review.body && (
          <p className="text-sm leading-relaxed text-text-default">
            {review.body}
          </p>
        )}
      </div>
    </article>
  );
}
