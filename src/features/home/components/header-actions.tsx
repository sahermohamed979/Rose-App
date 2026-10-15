'use client';

import { useState } from 'react';
import type { Session } from 'next-auth';
import {
  MapPin,
  User as UserIcon,
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

  // Displayed counts
  const displayedCartCount = isGuest
    ? (localCartData?.cartItems.length ?? 0)
    : cartCount;
  const displayedWishlistCount = isGuest
    ? (localWishlistData?.length ?? 0)
    : wishlistCount;

  // ── Mobile compact row ──
  if (mobile) {
    return (
      <div className="flex items-center gap-1.5">
        <Link
          href={'/wishlist'}
          aria-label={t('nav.wishlist')}
          className="w-9 h-9 flex items-center justify-center rounded-full text-foreground/80 hover:text-maroon-600 dark:hover:text-soft-pink-400 hover:bg-muted/80 transition-colors relative"
        >
          <Heart className="w-[18px] h-[18px]" />
          <CountBadge count={displayedWishlistCount} />
        </Link>

        <Link
          href={'/cart'}
          aria-label={t('nav.cart')}
          className="w-9 h-9 flex items-center justify-center rounded-full text-foreground/80 hover:text-maroon-600 dark:hover:text-soft-pink-400 hover:bg-muted/80 transition-colors relative"
        >
          <ShoppingCart className="w-[18px] h-[18px]" />
          <CountBadge count={displayedCartCount} />
        </Link>

        <NotificationsContainer status={status} />

        <div className="flex items-center gap-1 ps-1">
          <LangToggle className="text-xs font-semibold px-1.5 py-1 text-foreground/80 hover:text-maroon-600" />
          <ThemeToggle />
        </div>
      </div>
    );
  }

  // ── Full desktop bar ──
  return (
    <>
      <div className="flex items-center justify-between w-full min-w-0 gap-3 lg:gap-5">
        {/* Delivery location chip (authenticated only) */}
        {isAuthenticated && (
          <button
            type="button"
            onClick={() => setIsAddressOpen(true)}
            className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-soft-pink-500/10 dark:bg-maroon-950/40 border border-soft-pink-200/50 dark:border-maroon-800/40 text-start hover:bg-soft-pink-500/20 dark:hover:bg-maroon-900/40 transition-colors shrink-0 group"
          >
            <div className="w-6 h-6 rounded-full bg-maroon-600/10 dark:bg-soft-pink-400/15 flex items-center justify-center text-maroon-600 dark:text-soft-pink-300">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                {t('deliver')}
              </span>
              <span className="text-xs font-semibold text-foreground group-hover:text-maroon-600 dark:group-hover:text-soft-pink-300 transition-colors truncate max-w-[100px]">
                {deliverCity}
              </span>
            </div>
          </button>
        )}

        {/* Central Search Bar */}
        <div className="flex-1 min-w-0 max-w-xl mx-auto">
          <HeaderSearch />
        </div>

        {/* Right side actions group */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          {/* User Auth */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 ps-1">
              <div className="hidden lg:flex flex-col text-end leading-tight">
                <span className="text-[11px] text-muted-foreground">
                  {t('hello')}
                </span>
                <span className="text-xs font-bold text-foreground truncate max-w-[110px]">
                  {session?.user?.firstName}
                </span>
              </div>
              <div className="flex items-center gap-1.5 p-1 pe-2 rounded-full hover:bg-muted/70 transition-colors border border-border/40">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-maroon-600 to-soft-pink-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  {session?.user?.firstName?.[0]?.toUpperCase() ||
                    'U'}
                </div>
                <HeaderDropdown
                  name={session?.user?.firstName}
                  onOpenAddresses={() => setIsAddressOpen(true)}
                />
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border/60 hover:border-maroon-600/40 hover:bg-muted/50 text-foreground font-medium text-xs lg:text-sm transition-all shadow-xs shrink-0 group"
            >
              <UserIcon className="w-4 h-4 text-muted-foreground group-hover:text-maroon-600 dark:group-hover:text-soft-pink-400 transition-colors" />
              <span>{t('headerLogin')}</span>
            </Link>
          )}

          {/* Divider */}
          <div className="h-5 w-px bg-border/60 mx-0.5" />

          {/* Wishlist */}
          <Link
            href={'/wishlist'}
            aria-label={t('nav.wishlist')}
            className="w-9 h-9 flex items-center justify-center rounded-full text-foreground/80 hover:text-maroon-600 dark:hover:text-soft-pink-400 hover:bg-muted/80 transition-colors relative"
          >
            <Heart className="w-[19px] h-[19px]" />
            <CountBadge count={displayedWishlistCount} />
          </Link>

          {/* Cart */}
          <Link
            href={'/cart'}
            aria-label={t('nav.cart')}
            className="w-9 h-9 flex items-center justify-center rounded-full text-foreground/80 hover:text-maroon-600 dark:hover:text-soft-pink-400 hover:bg-muted/80 transition-colors relative"
          >
            <ShoppingCart className="w-[19px] h-[19px]" />
            <CountBadge count={displayedCartCount} />
          </Link>

          {/* Notifications */}
          <NotificationsContainer status={status} />

          {/* Divider */}
          <div className="h-5 w-px bg-border/60 mx-0.5" />

          {/* Language & Theme toggles */}
          <div className="flex items-center gap-1.5">
            <LangToggle className="text-xs font-semibold px-2 py-1.5 rounded-full hover:bg-muted/80 text-foreground/80 hover:text-maroon-600 transition-colors" />
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
