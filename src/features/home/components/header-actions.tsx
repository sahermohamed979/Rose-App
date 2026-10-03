'use client';

import { useState } from 'react';
import type { Session } from 'next-auth';
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
import AddressDialog from '@/features/checkout/components/address-dialog';
import { Link } from '@/i18n/navigation';
import { CountBadge } from './count-bages';
import { useLocalCart } from '@/features/cart/hooks/cart-local-hook';
import { useLocalWishlist } from '@/features/cart-wishlist/hooks/use-local-wishlist';
import type { AddressesPayload } from '@/shared/lib/types/adresses.type';

interface HeaderActionsProps {
  mobile?: boolean;
  wishlistCount?: number;
  cartCount?: number;
  initialAddresses?: AddressesPayload;
  initialSession?: Session | null;
}
export default function HeaderActions({
  wishlistCount = 0,
  cartCount = 0,
  mobile = false,
  initialAddresses,
  initialSession = null,
}: HeaderActionsProps) {
  // Translations
  const t = useTranslations('header');

  // State
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  // Session
  const { data: clientSession, status } = useSession();
  const session = clientSession ?? initialSession;
  const isAuthenticated =
    status === 'authenticated' || Boolean(initialSession?.user);
  const isGuest = status === 'unauthenticated' && !initialSession;

  // Address
  const primaryAddress =
    initialAddresses?.addresses?.find((addr) => addr.isPrimary) ??
    initialAddresses?.addresses?.[0];
  const deliverCity = primaryAddress?.city || t('country');

  // Queries
  const { data: localCartData } = useLocalCart(isGuest);
  const { data: localWishlistData } = useLocalWishlist(isGuest);

  // Displayed counts: server counts for authenticated/loading, local storage only for confirmed guests
  const displayedCartCount = isGuest
    ? (localCartData?.cartItems.length ?? 0)
    : cartCount;
  const displayedWishlistCount = isGuest
    ? (localWishlistData?.length ?? 0)
    : wishlistCount;

  if (mobile) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href={'/wishlist'}
          aria-label={t('nav.wishlist')}
          className="relative"
        >
          <Heart className="w-5 h-5" />
          <CountBadge count={displayedWishlistCount} />
        </Link>

        <Link
          href={'/cart'}
          aria-label={t('nav.cart')}
          className="relative"
        >
          <ShoppingCart className="w-5 h-5" />
          <CountBadge count={displayedCartCount} />
        </Link>

        <NotificationsContainer status={status} />

        <div className="flex items-center gap-1">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    );
  }

  // ── Full desktop bar ──
  return (
    <>
      <div className="flex items-center w-full min-w-0">
        {/* Location — desktop only */}
        {isAuthenticated && (
          <button
            type="button"
            onClick={() => setIsAddressOpen(true)}
            className="hidden lg:flex flex-col justify-center items-center px-2 shrink-0 cursor-pointer text-start hover:opacity-80 transition-opacity"
          >
            <h2 className="text-text-default text-[12px]">
              {t('deliver')}
            </h2>
            <span className="text-text-primary text-[14px] flex items-center gap-1 font-medium">
              <LocationEdit className="w-5 h-5 text-primary" />{' '}
              {deliverCity}
            </span>
          </button>
        )}

        {/* Search — fills remaining space */}
        <div className="flex-1 min-w-0">
          <HeaderSearch />
        </div>

        {/* User auth */}
        <div className="flex items-center gap-1 shrink-0">
          {isAuthenticated ? (
            <div className="flex items-center gap-2 px-2 cursor-pointer">
              <div className="hidden lg:flex flex-col leading-none">
                <span className="text-[12px] text-text-default">
                  {t('hello')}
                </span>
                <span className="text-[14px] font-bold text-text-primary">
                  {session?.user?.firstName}
                </span>
              </div>
              <HeaderDropdown
                name={session?.user?.firstName}
                onOpenAddresses={() => setIsAddressOpen(true)}
              />
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2">
              <User className="w-5 h-5" />
              <Link
                href="/login"
                className="text-text-plain font-medium whitespace-nowrap"
              >
                {t('headerLogin')}
              </Link>
            </div>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-3 ps-2 border-s border-border-muted shrink-0">
          <Link
            href={'/wishlist'}
            aria-label={t('nav.wishlist')}
            className="relative"
          >
            <Heart className="w-5 h-5 cursor-pointer" />
            <CountBadge count={displayedWishlistCount} />
          </Link>

          <Link
            href={'/cart'}
            aria-label={t('nav.cart')}
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

      <AddressDialog
        open={isAddressOpen}
        onOpenChange={setIsAddressOpen}
        initialData={initialAddresses}
      />
    </>
  );
}
