import { FolderHeart } from 'lucide-react';
import { ClearWishlist } from './clear-wishlist';
import { wishListProductsResponse } from '../../types/wishlist-products';
import { getLocale, getTranslations } from 'next-intl/server';

interface WishlistHeaderType {
  data: wishListProductsResponse;
}

export default async function WishlistHeader({
  data,
}: WishlistHeaderType) {
  const t = await getTranslations('wishlist');
  if (!data.status) {
    return 'Somthing went wrong';
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
