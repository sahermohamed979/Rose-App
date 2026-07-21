'use client';

import * as React from 'react';
import { Star } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/shared/lib/utils/utils';

interface StarRatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

const sizeMap = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-5',
};

function StarRating({
  value,
  max = 5,
  size = 'md',
  readOnly = true,
  onChange,
  className,
}: StarRatingProps) {
  const t = useTranslations('productReview');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [hovered, setHovered] = React.useState<number | null>(null);

  const displayed = hovered ?? value;

  return (
    <div
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={t('starLabel', { value, max })}
      className={cn('flex items-center gap-0.5', className)}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        // Calculate exact fill ratio for fractional ratings (e.g. 3.2 -> 1, 1, 1, 0.2, 0)
        const fillRatio = Math.max(0, Math.min(1, displayed - i));
        const cropPercent = (1 - fillRatio) * 100;
        // In RTL (Arabic) clip from the left side, in LTR clip from the right
        const clipPath = isRtl
          ? `inset(0 0 0 ${cropPercent}%)`
          : `inset(0 ${cropPercent}% 0 0)`;

        return (
          <button
            key={i}
            type="button"
            role={readOnly ? undefined : 'radio'}
            aria-checked={readOnly ? undefined : value >= starValue}
            aria-label={
              starValue === 1
                ? t('starSingular', { n: starValue })
                : t('starPlural', { n: starValue })
            }
            tabIndex={readOnly ? -1 : 0}
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(starValue)}
            onMouseEnter={() => !readOnly && setHovered(starValue)}
            onMouseLeave={() => !readOnly && setHovered(null)}
            className={cn(
              'relative inline-flex items-center justify-center outline-none transition-transform',
              !readOnly &&
                'cursor-pointer hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring',
              readOnly && 'cursor-default pointer-events-none'
            )}
          >
            {/* Background (empty) star */}
            <Star
              className={cn(
                sizeMap[size],
                'text-text-muted transition-colors'
              )}
              strokeWidth={1.5}
            />
            {/* Filled overlay star clipped precisely with clip-path */}
            {fillRatio > 0 && (
              <Star
                className={cn(
                  sizeMap[size],
                  'absolute inset-0 fill-yellow-400 text-yellow-400 transition-colors pointer-events-none'
                )}
                style={{ clipPath }}
                strokeWidth={1.5}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export { StarRating };
export type { StarRatingProps };
