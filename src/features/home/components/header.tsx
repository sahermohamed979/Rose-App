import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import SubHeader from './sub-header';
import HeaderActions from './header-actions';
import MobileNav from './mobile-nav';
import { Link } from '@/i18n/navigation';
import { getCart } from '@/features/cart/apis/cart-service';
import { getWishlistAction } from '@/features/cart-wishlist/apis/wishlist-actions';

export default async function Header() {
  const t = await getTranslations('header');

  const [cart, wishlist] = await Promise.all([
    getCart(),
    getWishlistAction(),
  ]);

  const wishlistCount =
    wishlist.status && wishlist.payload
      ? wishlist.payload.wishlistItems.length
      : 0;
  const cartCount =
    cart.status && cart.payload ? cart.payload.cartItems.length : 0;

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
          <HeaderActions
            wishlistCount={wishlistCount}
            cartCount={cartCount}
          />
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
