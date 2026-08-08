'use client';

import {
  LocationEdit,
  User,
  ShoppingCart,
  Heart,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import LangToggle from '@/shared/components/ui/langToggle';
import { useTranslations } from 'next-intl';

import HeaderSearch from '../../search/components/header-search';
import NotificationsContainer from '../../notifications/components/notifications-container';
import HeaderDropdown from './header-dropdown';
import { useWishlist } from '@/features/cart-wishlist/hooks/use-wishlist';
import { Link } from '@/i18n/navigation';
import { CountBadge } from './count-bages';
import { getLocalCartCount } from '@/features/cart-wishlist/lib/local-cart-client';
import { useEffect, useState } from 'react';

export default function HeaderActions({
  cartCount,
}: {
  cartCount: number;
}) {
  // Translation
  const t = useTranslations('header');

  // Session
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  // State
  const [localCartCount, setLocalCartCount] = useState(0);

  // Hooks
  const { data: wishlistData } = useWishlist(isAuthenticated);
  // console.log(wishlistData?.payload.wishlistItems.length);
  const wishlistCount =
    wishlistData?.payload?.wishlistItems?.length || 0;

  useEffect(() => {
    if (isAuthenticated) {
      return;
    }

    const updateLocalCartCount = () => {
      setLocalCartCount(getLocalCartCount());
    };

    updateLocalCartCount();

    window.addEventListener(
      'local-cart-updated',
      updateLocalCartCount
    );

    return () => {
      window.removeEventListener(
        'local-cart-updated',
        updateLocalCartCount
      );
    };
  }, [isAuthenticated]);
  const displayedCartCount = isAuthenticated
    ? cartCount
    : localCartCount;

  return (
    <div className="flex items-center w-full">
      {/* Location display for authenticated users */}
      {isAuthenticated && (
        <div className="flex flex-col justify-center items-center px-2 shrink-0">
          <h2 className="text-text-default text-[12px]">
            {t('deliver')}
          </h2>
          <span className="text-text-primary text-[14px] flex items-center gap-1">
            <LocationEdit className="w-5 h-5" /> {t('country')}
          </span>
        </div>
      )}

      <HeaderSearch />

      {/* User authentication status */}
      <div className="flex items-center gap-1 shrink-0">
        {isAuthenticated ? (
          <div className="flex items-center gap-2 px-2 cursor-pointer">
            <div className="flex flex-col leading-none">
              <span className="text-[12px] text-text-default">
                {t('hello')}
              </span>
              <span className="text-[14px] font-bold text-text-primary">
                {session?.user?.firstName}
              </span>
            </div>
            <HeaderDropdown name={session?.user?.firstName} />
          </div>
        ) : (
          <div className="flex items-center gap-1 px-2">
            <User className="w-5 h-5" />
            <Link
              href="/login"
              className="text-text-plain font-medium"
            >
              {t('headerLogin')}
            </Link>
          </div>
        )}
      </div>

      {/* Action icons */}
      <div className="flex items-center gap-3 ps-2 border-s border-border-muted shrink-0">
        <Link
          href={isAuthenticated ? '/wish-list' : '/login'}
          className="relative"
        >
          <Heart className="w-5 h-5 cursor-pointer" />
          {isAuthenticated && <CountBadge count={wishlistCount} />}
        </Link>

        <Link
          href={isAuthenticated ? '/cart' : '/login'}
          className="relative"
        >
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
          <CountBadge count={displayedCartCount} />
        </Link>

        <NotificationsContainer status={status} />

        <div className="flex items-center gap-2 border-s ps-4 border-border-muted">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
