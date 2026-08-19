import { FolderHeart } from 'lucide-react';
import React from 'react';
import { ClearWishlist } from './clear-wishlist';
import { wishListProductsResponse } from '../../types/wishlist-products';

interface WishlistHeaderType {
  data: wishListProductsResponse;
}

export default function WishlistHeader({ data }: WishlistHeaderType) {
  if (!data.status) {
    return 'Somthing went wrong';
  }

  return (
    <div className="flex justify-between items-center">
      {/*Title*/}

      <div className="flex items-center gap-2.5">
        <FolderHeart size={60} strokeWidth={1.2} />
        <p className="font-bold text-5xl text-text-plain mt-4">
          Wishlist
        </p>
        <p className="font-normal text-[16px] text-text-muted mt-12">
          {data.payload.wishlistItems.length} items
        </p>
      </div>

      {/*clear-wishlist*/}

      {data.payload.wishlistItems.length ? (
        <div>
          <ClearWishlist />
        </div>
      ) : (
        <p className="font-bold text-2xl">Your wishlist is empty</p>
      )}
    </div>
  );
}
