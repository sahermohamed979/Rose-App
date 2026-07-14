'use client';

import { usePathname } from 'next/navigation';
import Header from './header';
import { authPages } from '@/proxy';

export default function HeaderWrapper() {
  const pathname = usePathname();
  const isAuthPage = authPages.some((page) =>
    pathname.includes(page)
  );

  if (isAuthPage) {
    return null;
  }

  return (
    <>
      <Header />
    </>
  );
}
