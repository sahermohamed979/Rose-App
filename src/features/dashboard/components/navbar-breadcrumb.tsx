'use client';

import { Breadcrumb } from '@/shared/components/ui/breadcrumb';
import { useBreadcrumbLabels } from '@/shared/context/bradcrumb-label-context';
import { usePathname } from 'next/navigation';

export default function NavbarBreadcrumb() {
  const pathname = usePathname();
  const { labels } = useBreadcrumbLabels();
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .filter((segment) => segment !== 'en' && segment !== 'ar');
  const items = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');

    return {
      label:
        labels[segment] ??
        segment
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase()),
      href,
    };
  });

  if (items.length > 0) {
    items[items.length - 1].href = '';
  }
  return <Breadcrumb className="ms-3" items={items} maxVisible={3} />;
}
