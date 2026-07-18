'use client';
import { usePathname } from '@/i18n/navigation';

import {
  ClipboardList,
  Gift,
  Headset,
  Home,
  Info,
  PartyPopper,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

export default function SubHeader() {
  const t = useTranslations('header.subHeader');
  const pathname = usePathname();
  // sub header links
  const navLinks = [
    { href: '/', label: 'subHeaderHome', icon: <Home /> },
    { href: '/products', label: 'subHeaderProducts', icon: <Gift /> },
    {
      href: ' /categories',
      label: 'subHeaderCategories',
      icon: <ClipboardList />,
    },
    {
      href: '/occasions',
      label: 'subHeaderOccasions',
      icon: <PartyPopper />,
    },
    {
      href: '/contact',
      label: 'subHeaderContact',
      icon: <Headset />,
    },
    { href: '/about', label: 'subHederAbout', icon: <Info /> },
  ];
  return (
    <div>
      <div className="capitalize  bg-bg-primary-saturated flex flex-row justify-center  align-center  gap-4">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-row gap-2 p-3 text-[16px] transition-all ${
                isActive
                  ? ' border-soft-pink-200 border-b-2  text-soft-pink-200 dark:border-maroon-800 dark:text-maroon-800'
                  : ' text-text-inverse'
              }`}
            >
              {link.icon}
              {t(link.label)}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
