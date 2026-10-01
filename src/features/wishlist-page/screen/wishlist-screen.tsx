import WishlistHeader from '../components/wishlist-header';
import WishlistProducts from '../components/wishlist-products';
import WishlistFooter from '../components/wishlist-footer';

import { getWishlistAction } from '@/features/cart-wishlist/apis/wishlist-actions';

export default async function WishlistScreen() {
  const wishlistData = await getWishlistAction();

  const hasItems = Boolean(
    wishlistData?.status &&
    wishlistData.payload?.wishlistItems?.length > 0
  );

  return (
    <>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 mt-6 sm:mt-10 lg:mt-15.5 h-full">
        {/* Wishlist-header */}

        <div>
          <WishlistHeader data={wishlistData} />
        </div>
        <hr className="my-4"></hr>

        {/* Wishlist-products */}

        <div>
          <WishlistProducts data={wishlistData} />
        </div>

        {hasItems && (
          <>
            <hr className="my-4"></hr>

            {/* Wishlist-footer */}

            <div>
              <WishlistFooter />
            </div>
          </>
        )}
      </div>
    </>
  );
}
