import { FolderHeart } from 'lucide-react';
import { ClearWishlist } from './clear-wishlist';
import { getTranslations } from 'next-intl/server';
import { WishlistPayload } from '../types/wishlist-products';
import { ApiResponse } from '@/shared/lib/types/api';

export default async function WishlistHeader({
  data,
}: {
  data: ApiResponse<WishlistPayload>;
}) {
  const t = await getTranslations('wishlist');
  if (!data.status) {
    return <p className="text-red-500">Something went wrong</p>;
  }

  return (
    <div className="flex justify-between items-center">
      {/*Title*/}

      <div className="flex items-center gap-2.5">
        <FolderHeart size={60} strokeWidth={1.2} />
        <p className="font-bold text-5xl text-text-plain mt-4">
          {t('title')}
        </p>
        <p className="font-normal text-[16px] text-text-muted mt-12">
          {t('items', { count: data.payload.wishlistItems.length })}
        </p>
      </div>

      {/*clear-wishlist*/}

      {data.payload.wishlistItems.length ? (
        <div>
          <ClearWishlist />
        </div>
      ) : (
        <p className="font-bold text-2xl">{t('empty')}</p>
      )}
    </div>
  );
}
