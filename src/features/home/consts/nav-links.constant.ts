import {
  ClipboardList,
  Gift,
  Headset,
  Home,
  Info,
  PartyPopper,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type NavLink = {
  href: string;
  label: string;
  Icon: LucideIcon;
};

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'subHeaderHome', Icon: Home },
  { href: '/products', label: 'subHeaderProducts', Icon: Gift },
  {
    href: '/categories',
    label: 'subHeaderCategories',
    Icon: ClipboardList,
  },
  {
    href: '/occasions',
    label: 'subHeaderOccasions',
    Icon: PartyPopper,
  },
  { href: '/contact', label: 'subHeaderContact', Icon: Headset },
  { href: '/about', label: 'subHeaderAbout', Icon: Info },
];
