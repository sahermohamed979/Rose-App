'use client';

import { Link, usePathname } from '@/i18n/navigation';
import {
  CalendarHeart,
  ClipboardList,
  LayoutDashboard,
  Package,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils/utils';
import { useTranslations } from 'next-intl';
export default function DashboardList() {
  const pathname = usePathname();
  const t = useTranslations();
  return (
    <ul className=" flex  md:flex-col  gap-1 md:items-center  items-start w-full text-lg mt-4 space-y-2">
      <Link
        href="/dashboard"
        className={cn(
          'flex w-full items-center justify-start gap-2 rounded-[8px] p-2.5',
          'flex-col gap-1',
          'md:flex-row md:gap-2',
          pathname === '/dashboard' &&
            'bg-bg-primary-fade text-text-primary'
        )}
      >
        <LayoutDashboard size={25} />
        {t('dashboard.overview')}
      </Link>
      <Link
        href="/dashboard/categories"
        className={cn(
          'flex w-full items-center justify-start gap-2 rounded-[8px] p-2.5',
          'flex-col gap-1',
          'md:flex-row md:gap-2',
          pathname === '/dashboard/categories' &&
            'bg-bg-primary-fade text-text-primary'
        )}
      >
        {' '}
        <ClipboardList size={25} />
        {t('footer.nav.categories')}
      </Link>
      <Link
        href="/dashboard/occasions"
        className={cn(
          'flex w-full items-center justify-start gap-2 rounded-[8px] p-2.5',
          'flex-col gap-1',
          'md:flex-row md:gap-2',
          pathname === '/dashboard/occasions' &&
            'bg-bg-primary-fade text-text-primary'
        )}
      >
        {' '}
        <CalendarHeart size={25} />
        {t('footer.nav.occasions')}
      </Link>
      <Link
        href="/dashboard/products"
        className={cn(
          'flex w-full items-center justify-start gap-2 rounded-[8px] p-2.5',
          'flex-col gap-1',
          'md:flex-row md:gap-2',
          pathname === '/dashboard/products' &&
            'bg-bg-primary-fade text-text-primary'
        )}
      >
        {' '}
        <Package size={25} />
        {t('footer.nav.products')}
      </Link>
    </ul>
  );
}
