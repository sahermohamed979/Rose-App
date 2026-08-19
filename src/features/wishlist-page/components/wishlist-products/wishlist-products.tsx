'use client';

import Image from 'next/image';
import { wishListProductsResponse } from '../../types/wishlist-products';
import { ShoppingCartIcon, Star, Trash2 } from 'lucide-react';
import AddToCart from '@/features/cart-wishlist/components/add-to-cart';
import Link from 'next/link';
import RemoveProduct from './remove-product';

interface WishlistProductsType {
  data: wishListProductsResponse;
}

export default function WishlistProducts({
  data,
}: WishlistProductsType) {
  if (!data.status) {
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      {data.payload.wishlistItems.map((item, index) => (
        <div key={item.id}>
          <div className="mt-5 flex justify-between">
            {/* product details */}
            <div className="flex gap-4">
              <div className="relative">
                <Link href={`/products/${item.productId}`}>
                  <Image
                    height={140}
                    width={117}
                    className="rounded-md"
                    alt={item.product.title}
                    src={item.product.cover}
                  />
                </Link>

                {!item.product.stock && (
                  <div className="absolute  inset-0 bg-bg-plain opacity-50">
                    {' '}
                  </div>
                )}
              </div>

              <div>
                {item.product.stock ? (
                  <p className="text-[14px] text-text-success font-semibold">
                    In Stock
                  </p>
                ) : (
                  <p className="text-[14px] text-text-danger font-semibold">
                    Out of Stock
                  </p>
                )}

                <p className="text-[20px] text-text-plain font-semibold">
                  {item.product.title}
                </p>

                <div className="flex gap-1.5 mt-1.5">
                  <div className="bg-bg-warning flex rounded w-16.75 h-6 justify-center items-center gap-1.5">
                    <Star size={16} fill="black" />
                    <p className="text-sm font-medium text-text-plain">
                      {Math.round(item.product.rating)}/5
                    </p>
                  </div>

                  <p className="text-text-info">
                    ({item.product.ratings} rating)
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2.5">
                  <p className="text-text-plain text-2xl font-bold">
                    {item.product.discountValue
                      ? (
                          Number(item.product.price) *
                          (1 -
                            Number(item.product.discountValue) / 100)
                        ).toFixed(2)
                      : item.product.price}

                    <span className="text-sm font-medium text-text-plain ms-1">
                      EGP
                    </span>
                  </p>

                  {item.product.discountValue && (
                    <p className="text-text-muted line-through text-sm mt-2">
                      {item.product.price} EGP
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* add to cart and remove button */}
            <div className="flex flex-col justify-between items-end ">
              <div className="bg-bg-danger-fade rounded-md size-fit py-3.5 px-4 cursor-pointer">
                <RemoveProduct productId={item.id} />
              </div>

              <div>
                {item.product.stock ? (
                  <AddToCart
                    stock={item.product.stock}
                    className="bg-bg-primary text-text-inverse py-5 px-6"
                    productId={item.productId}
                  >
                    <ShoppingCartIcon className="w-4 h-4 text-text-inverse dark:text-white" />
                    Add to Cart
                  </AddToCart>
                ) : (
                  <Link
                    className="bg-bg-primary-fade py-3.5 px-6 text-text-primary rounded-md font-medium"
                    href={`/products?categoryId=${item.product.categoryId}`}
                  >
                    Explore Similar Products
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* separator */}
          {index < data.payload.wishlistItems.length - 1 && (
            <hr className="my-6" />
          )}
        </div>
      ))}
    </div>
  );
}
