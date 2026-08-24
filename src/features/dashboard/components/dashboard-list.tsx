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

const NAV_ITEMS = [
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    labelKey: 'dashboard.overview',
  },
  {
    href: '/dashboard/categories',
    icon: ClipboardList,
    labelKey: 'footer.nav.categories',
  },
  {
    href: '/dashboard/occasions',
    icon: CalendarHeart,
    labelKey: 'footer.nav.occasions',
  },
  {
    href: '/dashboard/products',
    icon: Package,
    labelKey: 'footer.nav.products',
  },
] as const;

export default function DashboardList() {
  const pathname = usePathname();
  const t = useTranslations();
  return (
    <ul className=" flex  md:flex-col  gap-1 md:items-center  items-start w-full text-lg mt-4 space-y-2">
      {NAV_ITEMS.map((item) => (
        <li key={item.href} className="w-full">
          <Link
            href={item.href}
            className={cn(
              'flex w-full items-center justify-start gap-2 rounded-[8px] p-2.5',
              'flex-col gap-1',
              'md:flex-row md:gap-2',
              pathname === item.href &&
                'bg-bg-primary-fade text-text-primary'
            )}
          >
            <item.icon size={25} />
            {t(item.labelKey as any)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
