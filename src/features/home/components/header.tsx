'use client';
import { usePathname } from '@/i18n/navigation';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { Input } from '@/shared/components/ui/input';
import LangToggle from '@/shared/components/ui/langToggle';
import {
  Bell,
  ClipboardList,
  Gift,
  Headset,
  Heart,
  Home,
  Info,
  PartyPopper,
  SearchIcon,
  ShoppingCart,
  User,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Header() {
  // transilations
  const t = useTranslations('header');
  const pathname = usePathname();
  // sub header links
  const navLinks = [
    { href: '/', label: 'home', icon: <Home /> },
    { href: '/products', label: 'products', icon: <Gift /> },
    {
      href: '/occasions',
      label: 'occasions',
      icon: <ClipboardList />,
    },
    {
      href: '/categories',
      label: 'categories',
      icon: <PartyPopper />,
    },
    { href: '/contact', label: 'contact', icon: <Headset /> },
    { href: '/about', label: 'about', icon: <Info /> },
  ];
  return (
    <>
      {/* header */}
      <div className="bg-bg-white px-9 py-1 gap-4 flex flex-row items-center justify-between">
        {/* logo image */}
        <Link href="/">
          <Image
            src="/Logo.svg"
            alt="Header Logo"
            width={85}
            height={80}
          />
        </Link>
        {/* search input */}
        <div className="relative w-full items-center flex py-2 gap-1 flex-row">
          <div className="absolute ps-3 inset-y-0 inset-s-0 flex items-center justify-center  pointer-events-none">
            <SearchIcon className="w-5 h-5 text-text-muted" />
          </div>
          <Input
            className="ps-8 pe-4"
            type="search"
            placeholder={t('searchPlaceholder')}
          />
        </div>
        {/* right side */}
        <div className="flex flex-row items-center ">
          {/* Login */}
          <Link
            href="/login"
            className="flex items-center gap-2 px-4 py-2 text-text-plain"
          >
            <User className="w-5 h-5" />
            {t('headerLogin')}
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-3 px-4 py-2 border-s border-border-muted">
            <Heart className="w-5 h-5 cursor-pointer" />
            <ShoppingCart className="w-5 h-5 cursor-pointer" />
            <Bell className="w-5 h-5 cursor-pointer" />
          </div>
          {/*  Toggles */}
          <div className="flex items-center gap-2 px-4 border-s border-border-muted">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
      {/* subHeader */}
      <div className="capitalize  bg-bg-primary-saturated flex flex-row justify-center  align-center  gap-4">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-row gap-2 p-3 transition-all ${
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
    </>
  );
}
