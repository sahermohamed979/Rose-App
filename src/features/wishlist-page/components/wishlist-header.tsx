import { FolderHeart } from 'lucide-react';
import { ClearWishlist } from './clear-wishlist';
import { getTranslations } from 'next-intl/server';
import { WishlistResponse } from '@/features/cart-wishlist/types/cart-wishlist.types';
import { ApiResponse } from '@/shared/lib/types/api';

export default async function WishlistHeader({
  data,
}: {
  data: ApiResponse<WishlistResponse>;
}) {
  const t = await getTranslations('wishlist');
  if (!data.status) {
    return <p className="text-red-500">Something went wrong</p>;
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      {/* Title */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        <FolderHeart className="w-8 h-8 sm:w-12 sm:h-12 md:w-15 md:h-15 shrink-0" strokeWidth={1.2} />
        <p className="font-bold text-2xl sm:text-4xl md:text-5xl text-text-plain mt-0 sm:mt-2 md:mt-4">
          {t('title')}
        </p>
        <p className="font-normal text-xs sm:text-sm md:text-[16px] text-text-muted mt-2 sm:mt-6 md:mt-12">
          {t('items', { count: data.payload.wishlistItems.length })}
        </p>
      </div>

      {/* Clear wishlist */}
      {data.payload.wishlistItems.length ? (
        <div className="w-full sm:w-auto flex justify-end">
          <ClearWishlist />
        </div>
      ) : (
        <p className="font-bold text-xl sm:text-2xl">{t('empty')}</p>
      )}
    </div>
  );
}
