'use client';
import { Link, usePathname } from '@/i18n/navigation';
import {
  ClipboardList,
  Gift,
  Headset,
  Home,
  Info,
  PartyPopper,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function SubHeader() {
  const t = useTranslations('header');
  const pathname = usePathname();

  const navLinks = [
    {
      href: '/',
      label: 'subHeaderHome',
      icon: <Home className="w-4 h-4" />,
    },
    {
      href: '/products',
      label: 'subHeaderProducts',
      icon: <Gift className="w-4 h-4" />,
    },
    {
      href: '/categories',
      label: 'subHeaderCategories',
      icon: <ClipboardList className="w-4 h-4" />,
    },
    {
      href: '/occasions',
      label: 'subHeaderOccasions',
      icon: <PartyPopper className="w-4 h-4" />,
    },
    {
      href: '/contact',
      label: 'subHeaderContact',
      icon: <Headset className="w-4 h-4" />,
    },
    {
      href: '/about',
      label: 'subHeaderAbout',
      icon: <Info className="w-4 h-4" />,
    },
  ];

  return (
    <nav
      aria-label={t('nav.mainNav')}
      className="hidden md:block bg-bg-primary-saturated overflow-x-auto"
    >
      <ul
        className="capitalize flex flex-row justify-center items-center gap-4 px-4"
        role="list"
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-row items-center gap-2 py-2 px-3 text-[16px] transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-soft-pink-200 border-b-2 text-soft-pink-200 dark:border-maroon-800 dark:text-maroon-800'
                    : 'text-text-inverse'
                }`}
              >
                {link.icon}
                {t(`subHeader.${link.label}`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
