'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

import { NAV_LINKS } from '../consts/nav-links.constant';

export default function SubHeader() {
  const t = useTranslations('header');
  const pathname = usePathname();

  return (
    <nav
      aria-label={t('nav.mainNav')}
      className="hidden md:block bg-bg-primary-saturated overflow-x-auto"
    >
      <ul
        className="capitalize flex flex-row justify-center items-center gap-4 px-4"
        role="list"
      >
        {NAV_LINKS.map(({ href, label, Icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-row items-center gap-2 py-2 px-3 text-[16px] transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-soft-pink-200 border-b-2 text-soft-pink-200 dark:border-maroon-800 dark:text-maroon-800'
                    : 'text-text-inverse'
                }`}
              >
                <Icon className="w-4 h-4" />
                {t(`subHeader.${label}`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
