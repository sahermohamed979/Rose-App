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
    <div className="sticky top-0 z-50 overflow-x-hidden">
      <div className="bg-bg-muted px-4 md:px-9 py-1 flex flex-row items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" aria-label="Rose App, home">
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
            initialAddresses={initialAddresses}
            initialSession={session}
          />
        </div>

        {/* Mobile: compact icons row + hamburger */}
        <div className="flex md:hidden items-center gap-2">
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

      {/* Desktop sub-navigation — hidden on mobile */}
      <SubHeader />
    </div>
  );
}
