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
      className="hidden md:block bg-background/50 dark:bg-background/20 backdrop-blur-md border-t border-border/30 overflow-x-auto py-1"
    >
      <ul
        className="flex flex-row justify-center items-center gap-1.5 lg:gap-2 px-4 max-w-7xl mx-auto"
        role="list"
      >
        {NAV_LINKS.map(({ href, label, Icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`group flex flex-row items-center gap-2 py-1.5 px-3.5 rounded-full text-[13px] lg:text-[14px] font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-maroon-700 via-maroon-600 to-soft-pink-600 text-white shadow-xs font-semibold'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted/60 dark:hover:bg-muted/40'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 ${
                    isActive
                      ? 'text-soft-pink-200'
                      : 'text-muted-foreground'
                  }`}
                />
                <span>{t(`subHeader.${label}`)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
