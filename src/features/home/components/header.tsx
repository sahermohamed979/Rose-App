import Image from 'next/image';

import SubHeader from './sub-header';
import HeaderActions from './header-actions';
import { Link } from '@/i18n/navigation';
import { getCartAction } from '@/features/cart/apis/cart-actions';
import { getWishlistAction } from '@/features/cart-wishlist/apis/wishlist-actions';

export default async function Header() {
  const [cart, wishlist] = await Promise.all([
    getCartAction(),
    getWishlistAction(),
  ]);

  const cartCount =
    cart.status && cart.payload ? cart.payload.cartItems.length : 0;
  const wishlistCount =
    wishlist.status && wishlist.payload
      ? wishlist.payload.wishlistItems.length
      : 0;

  return (
    <>
      <div className=" sticky top-0 z-50 ">
        <div className="  bg-bg-muted px-9 py-1  flex flex-row items-center justify-between">
          {/* logo image */}
          <Link href="/">
            <Image
              src="/Logo.svg"
              alt="Header Logo"
              width={85}
              height={80}
            />
          </Link>
          {/* header actions */}
          <HeaderActions
            cartCount={cartCount}
            wishlistCount={wishlistCount}
          />
        </div>
        {/* subHeader */}
        <SubHeader />
      </div>
    </>
  );
}
