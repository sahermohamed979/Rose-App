import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import SubHeader from './sub-header';
import HeaderActions from './header-actions';
import MobileNav from './mobile-nav';
import { Link } from '@/i18n/navigation';

export default async function Header() {
  const t = await getTranslations('header');

  return (
    <div className="sticky top-0 z-50 overflow-x-hidden">
      <div className="bg-bg-muted px-4 md:px-9 py-1 flex flex-row items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" aria-label={t('nav.mainNav')}>
          <Image
            src="/Logo.svg"
            alt="Rose App"
            width={85}
            height={80}
            priority
          />
        </Link>

        {/* Desktop header actions */}
        <div className="hidden md:flex flex-1 min-w-0">
          <HeaderActions />
        </div>

        {/* Mobile: compact icons row + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <HeaderActions mobile />
          <MobileNav />
        </div>
      </div>

      {/* Desktop sub-navigation — hidden on mobile */}
      <SubHeader />
    </div>
  );
}
