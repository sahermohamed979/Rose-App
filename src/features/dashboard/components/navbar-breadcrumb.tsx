'use client';

import { usePathname } from '@/i18n/navigation';
import { Breadcrumb } from '@/shared/components/ui/breadcrumb';
import { useTranslations } from 'next-intl';

export default function NavbarBreadcrumb() {
  const pathname = usePathname();
  const t = useTranslations();

  const getSegmentTranslation = (segment: string) => {
    switch (segment.toLowerCase()) {
      case 'dashboard':
        return t('userMenu.dashboard');
      case 'categories':
        return t('footer.nav.categories');
      case 'occasions':
        return t('footer.nav.occasions');
      case 'products':
        return t('footer.nav.products');
      default:
        return segment
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());
    }
  };

  const segments = pathname
    .split('/')
    .filter(Boolean)
    .filter((segment) => segment !== 'en' && segment !== 'ar');

  const items = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');

    return {
      label: getSegmentTranslation(segment),
      href,
    };
  });

  if (items.length > 0) {
    items[items.length - 1].href = '';
  }
  return <Breadcrumb className="ms-3" items={items} maxVisible={4} />;
}
