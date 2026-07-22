import { formatNumber } from '@/shared/lib/utils/formatter';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Props {
  rating: number;
  ratings: number;
  locale: string;
}

export default function ProductRating({
  rating,
  ratings,
  locale,
}: Props) {
  const t = useTranslations('ProductDetails');

  return (
    <div className="flex items-center gap-2 border-y border-border-subtle my-6 py-4">
      <Star
        fill="currentColor"
        size={20}
        className="text-yellow-500"
      />

      <span>
        {t('ratingLabel')} <b>{formatNumber(rating, locale, 1, 1)}</b>{' '}
        / {formatNumber(5, locale)}
      </span>

      <span className="text-blue-600 font-medium">
        (
        {t('ratingsCount', {
          count: formatNumber(ratings, locale),
        })}
        )
      </span>
    </div>
  );
}
