'use client';

import { Input } from '@/shared/components/ui/input';
import {
  LocationEdit,
  SearchIcon,
  User,
  ShoppingCart,
  Heart,
  Bell,
  ChevronDown,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import LangToggle from '@/shared/components/ui/langToggle';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HeaderActions() {
  const { data: session, status } = useSession();
  const t = useTranslations('header');
  const cartCount = '8';
  const favoriteCount = '8';
  const notificationCount = '8';

  return (
    <div className="flex items-center">
      {status === 'authenticated' && (
        <div className="flex flex-col justify-center items-center px-2 shrink-0">
          <h2 className="text-text-default text-[12px]">
            {t('deliver')}
          </h2>
          <span className="text-text-primary text-[14px] flex items-center gap-1">
            <LocationEdit className="w-4 h-4" /> {t('country')}
          </span>
        </div>
      )}

      <div className="relative flex-grow min-w-[830px] flex items-center">
        <div className="absolute ps-3 pointer-events-none">
          <SearchIcon className="w-5 h-5 text-text-muted" />
        </div>
        <Input
          className="ps-10 pe-4 w-full"
          type="search"
          placeholder={t('searchPlaceholder')}
        />
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {status === 'authenticated' ? (
          <div className="flex items-center gap-2 px-2 cursor-pointer">
            <User className="w-5 h-5" />
            <div className="flex flex-col">
              <span className="text-[12px] text-text-default">
                {t('hello')}
              </span>
              <p className="text-[14px] font-bold text-text-primary">
                {session?.user?.firstName}
              </p>
            </div>
            <ChevronDown className="w-4 h-4" />
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

      <div className="flex items-center gap-3 ps-2 border-s border-border-muted shrink-0">
        <Link href="/login" className="relative">
          <Heart className="w-5 h-5 cursor-pointer" />
          {status === 'authenticated' && favoriteCount && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
              {favoriteCount}
            </span>
          )}
        </Link>
        <Link href="/login" className="relative">
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
          {status === 'authenticated' && cartCount && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
              {cartCount}
            </span>
          )}
        </Link>

        <Link href="/login" className="relative">
          <Bell className="w-5 h-5 cursor-pointer" />
          {status === 'authenticated' && notificationCount && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
              {notificationCount}
            </span>
          )}
        </Link>
        <div className="flex items-center gap-2 border-s ps-4 border-border-muted">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
