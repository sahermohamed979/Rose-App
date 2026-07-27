'use client';

import { LocationEdit, User, ShoppingCart, Heart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import LangToggle from '@/shared/components/ui/langToggle';
import { useTranslations } from 'next-intl';

import HeaderSearch from '../../search/components/header-search';
import NotificationsContainer from '../../notifications/components/notifications-container';
import HeaderDropdown from './header-dropdown';
import { Link } from '@/i18n/navigation';
import { fetchWishlist } from '@/features/products/apis/wishlist-api';
import { fetchCart } from '@/features/products/apis/cart-api';
import { CountBadge } from './count-bages';

export default function HeaderActions() {
  // Translation
  const t = useTranslations('header');

  // Session
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  // Query
  const { data: wishlistData } = useQuery({
    queryKey: ['user-wishlist'],
    queryFn: fetchWishlist,
    enabled: isAuthenticated,
  });

  const { data: cartData } = useQuery({
    queryKey: ['user-cart'],
    queryFn: fetchCart,
    enabled: isAuthenticated,
  });

  // Variables (derived)
  const wishlistCount = wishlistData?.payload?.wishlistItems?.length || 0;
  const cartCount = cartData?.payload?.cartItems?.length || 0;

  return (
    <div className="flex items-center w-full">
      {/* Location display for authenticated users */}
      {isAuthenticated && (
        <div className="flex flex-col justify-center items-center px-2 shrink-0">
          <h2 className="text-text-default text-[12px]">{t('deliver')}</h2>
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
              <span className="text-[12px] text-text-default">{t('hello')}</span>
              <span className="text-[14px] font-bold text-text-primary">
                {session?.user?.firstName}
              </span>
            </div>
            <HeaderDropdown name={session?.user?.firstName} />
          </div>
        ) : (
          <div className="flex items-center gap-1 px-2">
            <User className="w-5 h-5" />
            <Link href="/login" className="text-text-plain font-medium">
              {t('headerLogin')}
            </Link>
          </div>
        )}
      </div>

      {/* Action icons */}
      <div className="flex items-center gap-3 ps-2 border-s border-border-muted shrink-0">
        <Link href={isAuthenticated ? '/wish-list' : '/login'} className="relative">
          <Heart className="w-5 h-5 cursor-pointer" />
          {isAuthenticated && <CountBadge count={wishlistCount} />}
        </Link>

        <Link href={isAuthenticated ? '/cart' : '/login'} className="relative">
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
          {isAuthenticated && <CountBadge count={cartCount} />}
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