import Image from 'next/image';
import { Star } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { highlightMatch } from '@/features/search/utils/highlight-match';
import { SearchProduct } from '../schema/search-schema';

interface SearchResultItemProps {
  product: SearchProduct;
  query: string;
  onClick: () => void;
}

export function SearchResultItem({
  product,
  query,
  onClick,
}: SearchResultItemProps) {
  // Translation
  const t = useTranslations('header');

  const discountPrice: number =
    Number(product.price) * (1 - Number(product.discountValue) / 100);
  return (
    <Link
      href={`/products/${product.id}`}
      className="flex items-center gap-4 p-4 hover:bg-bg-subtle rounded-b-lg transition-colors border-t"
      onClick={onClick}
    >
      <div className="w-16 h-16 shrink-0">
        <Image
          width={80}
          height={80}
          src={product.cover}
          alt={product.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="grow flex flex-col justify-center">
        <h3 className="font-semibold text-sm text-text-plain line-clamp-1">
          {highlightMatch(product.title, query)}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-bold text-text-plain text-lg">
            {product.discountValue ? (
              <>
                <span className="text-text-primary me-1">
                  {product.discountType === 'PERCENT'
                    ? `${discountPrice} ${t('currency')}`
                    : `${product.discountValue}% off`}
                </span>
                <span className="text-text-muted line-through text-sm">
                  {`${product.price} ${t('currency')}`}
                </span>
              </>
            ) : (
              <span className="text-text-primary">
                {`${product.price} ${t('currency')}`}
              </span>
            )}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 text-sm shrink-0">
        <Star className="w-4 h-4 fill-text-warning text-text-warning" />
        <span className="text-text-plain font-medium">
          {t('searchRating')}{' '}
          <span className="font-bold">
            {(product.rating ?? 0).toFixed(1)}/5
          </span>
          <span className="text-text-info ml-1">
            ({product.ratings ?? 0} {t('productRating')})
          </span>
        </span>
      </div>
    </Link>
  );
}
