'use client';

import { useEffect, useState } from 'react';
import { HeartMinusIcon, HeartPlusIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils/utils';
import { useToggleWishlist } from '../hooks/use-toggle-wishlist';
import { useWishlist } from '../hooks/use-wishlist';
import { isInLocalWishlist } from '../lib/local-wishlist-client';
import { useTranslations } from 'next-intl';

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

  // State
  const [isLocalAdded, setIsLocalAdded] = useState(false);
  const t = useTranslations('products');
  // Hooks
  const { handleToggleWishlist, isPending } = useToggleWishlist();
  const { data: wishlistData } = useWishlist(isAuthenticated);

  // Variables
  const isProductInWishlist =
    wishlistData?.status === true &&
    !!wishlistData.payload?.wishlistItems.some(
      (item) => item.productId === productId
    );
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

  // Effects
  useEffect(() => {
    if (isAuthenticated) {
      return;
    }

    const syncLocalWishlist = () => {
      setIsLocalAdded(isInLocalWishlist(productId));
    };

    syncLocalWishlist();
    window.addEventListener(
      'local-wishlist-updated',
      syncLocalWishlist
    );

    return () => {
      window.removeEventListener(
        'local-wishlist-updated',
        syncLocalWishlist
      );
    };
  }, [isAuthenticated, productId]);

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
