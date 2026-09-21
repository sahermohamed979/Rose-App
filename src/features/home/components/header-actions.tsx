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
import { Link } from '@/i18n/navigation';
import { CountBadge } from './count-bages';

interface HeaderActionsProps {
  mobile?: boolean;
  wishlistCount?: number;
  cartCount?: number;
}
export default function HeaderActions({
  wishlistCount = 0,
  cartCount = 0,
  mobile = false,
}: HeaderActionsProps) {
  const t = useTranslations('header');
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  if (mobile) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href={isAuthenticated ? '/wish-list' : '/login'}
          aria-label={t('nav.wishlist')}
          className="relative"
        >
          <Heart className="w-5 h-5" />
          {isAuthenticated && <CountBadge count={wishlistCount} />}
        </Link>

        <Link
          href={isAuthenticated ? '/cart' : '/login'}
          aria-label={t('nav.cart')}
          className="relative"
        >
          <ShoppingCart className="w-5 h-5" />
          {isAuthenticated && <CountBadge count={cartCount} />}
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
    <div className="flex items-center w-full min-w-0">
      {/* Location — desktop only */}
      {isAuthenticated && (
        <div className="hidden lg:flex flex-col justify-center items-center px-2 shrink-0">
          <h2 className="text-text-default text-[12px]">
            {t('deliver')}
          </h2>
          <span className="text-text-primary text-[14px] flex items-center gap-1">
            <LocationEdit className="w-5 h-5" /> {t('country')}
          </span>
        </div>
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
            <HeaderDropdown name={session?.user?.firstName} />
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
          href={isAuthenticated ? '/wishlist' : '/login'}
          aria-label={t('nav.wishlist')}
          className="relative"
        >
          <Heart className="w-5 h-5 cursor-pointer" />
          <CountBadge count={wishlistCount} />
        </Link>

        <Link
          href={isAuthenticated ? '/cart' : '/login'}
          aria-label={t('nav.cart')}
          className="relative"
        >
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
          <CountBadge count={cartCount} />
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
