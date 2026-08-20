'use client';

import { Breadcrumb } from '@/shared/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

export default function NavbarBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .filter((segment) => segment !== 'en' && segment !== 'ar');
  const items = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const displaySegment = segment.includes('--')
      ? segment.split('--')[0]
      : segment;
    return {
      label: displaySegment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase()),
      href,
    };
  });

  if (items.length > 0) {
    items[items.length - 1].href = '';
  }
  return <Breadcrumb className="ms-3" items={items} maxVisible={4} />;
}
