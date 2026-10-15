import Image from 'next/image';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth';
import SubHeader from './sub-header';
import HeaderActions from './header-actions';
import MobileNav from './mobile-nav';
import { Link } from '@/i18n/navigation';
import { getCart } from '@/features/cart/apis/cart-service';
import { getWishlistAction } from '@/features/cart-wishlist/apis/wishlist-actions';
import { getUserAddresses } from '@/features/checkout/apis/get-user-adresses.api';

export default async function Header() {
  const [session, cart, wishlist, addresses] = await Promise.all([
    getServerSession(authOptions),
    getCart(),
    getWishlistAction(),
    getUserAddresses(),
  ]);

  const wishlistCount =
    wishlist.status && wishlist.payload
      ? wishlist.payload.wishlistItems.length
      : 0;
  const cartCount =
    cart.status && cart.payload ? cart.payload.cartItems.length : 0;
  const initialAddresses =
    addresses.status && addresses.payload
      ? addresses.payload
      : undefined;

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/90 dark:bg-background/80 border-b border-border/40 shadow-xs transition-colors">
      <div className="px-4 sm:px-6 md:px-9 py-2.5 flex flex-row items-center justify-between gap-3 lg:gap-6 max-w-[1600px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Rose App, home"
          className="shrink-0 transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/Logo.svg"
            alt="Rose App"
            width={78}
            height={70}
            priority
            className="h-11 sm:h-12 md:h-13 w-auto object-contain"
          />
        </Link>

        {/* Desktop Header Actions & Search */}
        <div className="hidden md:flex flex-1 min-w-0">
          <HeaderActions
            wishlistCount={wishlistCount}
            cartCount={cartCount}
            initialAddresses={initialAddresses}
            initialSession={session}
          />
        </div>

        {/* Mobile: compact icons row + hamburger */}
        <div className="flex md:hidden items-center gap-1.5">
          <HeaderActions
            mobile
            wishlistCount={wishlistCount}
            cartCount={cartCount}
            initialAddresses={initialAddresses}
            initialSession={session}
          />
          <MobileNav />
        </div>
      </div>

      {/* Desktop sub-navigation */}
      <SubHeader />
    </header>
  );
}
