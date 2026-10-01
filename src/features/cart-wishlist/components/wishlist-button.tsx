'use client';

import { HeartMinusIcon, HeartPlusIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils/utils';
import { useLocalWishlist } from '../hooks/use-local-wishlist';
import { useToggleWishlist } from '../hooks/use-toggle-wishlist';
import { useWishlist } from '../hooks/use-wishlist';

interface WishlistButtonProps {
  isAddedToWishlist?: boolean;
  productId: string;
  className?: string;
  addedClassName?: string;
  notAddedClassName?: string;
}

export default function WishlistButton({
  isAddedToWishlist,
  productId,
  className,
  addedClassName,
  notAddedClassName,
}: WishlistButtonProps) {
  // Context
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  // Translations
  const t = useTranslations('products');

  // Hooks
  const { handleToggleWishlist, isPending } = useToggleWishlist();
  const { data: wishlistData } = useWishlist(isAuthenticated);
  const { data: localWishlist } = useLocalWishlist();

  // Variables
  const isProductInWishlist =
    wishlistData?.status === true &&
    !!wishlistData.payload?.wishlistItems.some(
      (item) => item.productId === productId
    );
  const isLocalAdded = !!localWishlist?.includes(productId);
  const isAdded = isAuthenticated
    ? (isAddedToWishlist ?? isProductInWishlist)
    : isLocalAdded;

  // Functions
  const onToggleWishlist = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    handleToggleWishlist({ productId, isAddedToWishlist: isAdded });
  };

  return (
    <>
      {isAdded ? (
        <Button
          className={cn(
            `w-7.5 
      h-7.5 rounded-full bg-bg-inverse enabled:hover:bg-bg-inverse enabled:text-text-white
       p-0  overflow-hidden group transition-all duration-300 hover:w-40`,
            className,
            addedClassName
          )}
          onClick={onToggleWishlist}
          disabled={isPending}
        >
          <HeartMinusIcon className="w-4.5 h-4.5 text-text-white" />
          <span className="text-text-white text-[12px] font-medium hidden group-hover:block">
            {t('removeFromWishList')}
          </span>
        </Button>
      ) : (
        <Button
          className={cn(
            `w-7.5 
    h-7.5 rounded-full bg-bg-plain enabled:hover:bg-bg-plain
     p-0  overflow-hidden group transition-all duration-300 hover:w-40`,
            className,
            notAddedClassName
          )}
          onClick={onToggleWishlist}
          disabled={isPending}
        >
          <HeartPlusIcon className="w-4.5 h-4.5 text-text-primary " />
          <span className="text-text-primary text-[12px] font-medium hidden group-hover:block">
            {t('addToWishList')}
          </span>
        </Button>
      )}
    </>
  );
}
