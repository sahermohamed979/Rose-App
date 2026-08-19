import React from 'react';

import { getDirectToken } from '@/shared/lib/utils/get-direct-token';

import WishlistHeader from './wishlis-header/wishlist-header';
import WishlistProducts from './wishlist-products/wishlist-products';
import WishlistFooter from './wishlist-footer';
import {
  wishListProductsError,
  wishListProductsResponse,
} from '../types/wishlist-products';

export default async function WishlistPage() {
  const token = await getDirectToken();

  const response = await fetch(
    `${process.env.NEXT_API_URL}/wishlist`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: wishListProductsResponse = await response.json();

  if (!response.ok) {
    const dataError = data as wishListProductsError;
    return <div>{dataError.message}</div>;
  }

  console.log(data);

  return (
    <>
      <main className="px-20 mt-15.5">
        {/* Wishlist-header */}

        <div>
          <WishlistHeader data={data} />
        </div>
        <hr className="my-4"></hr>

        {/* Wishlist-products */}

        <div>
          <WishlistProducts data={data} />
        </div>

        <hr className="my-4"></hr>

        {/* Wishlist-footer */}

        <div>
          <WishlistFooter />
        </div>
      </main>
    </>
  );
}
