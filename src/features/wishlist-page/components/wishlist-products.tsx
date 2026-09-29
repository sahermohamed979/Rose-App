'use client';

import Image from 'next/image';
import { ShoppingCartIcon, Star } from 'lucide-react';
import AddToCart from '@/features/cart-wishlist/components/add-to-cart';
import Link from 'next/link';
import RemoveProduct from './remove-product';
import { useTranslations } from 'next-intl';
import { ApiResponse } from '@/shared/lib/types/api';
import { WishlistResponse } from '@/features/cart-wishlist/types/cart-wishlist.types';

export default function WishlistProducts({
  data,
}: {
  data: ApiResponse<WishlistResponse>;
}) {
  const t = useTranslations('wishlist');
  if (!data.status) {
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      {data.payload.wishlistItems.map((item, index) => (
        <div key={item.id}>
          <div className="mt-5 flex flex-col sm:flex-row sm:justify-between gap-4">
            {/* product details */}
            <div className="flex gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="relative w-20 h-24 sm:w-28 sm:h-32 md:w-[117px] md:h-[140px] shrink-0 rounded-md overflow-hidden">
                <Link href={`/products/${item.productId}`} className="block relative w-full h-full">
                  <Image
                    fill
                    className="rounded-md object-cover"
                    alt={item.product.title}
                    src={item.product.cover}
                    sizes="(max-width: 640px) 80px, 117px"
                  />
                </Link>

                {!item.product.stock && (
                  <div className="absolute inset-0 bg-bg-plain opacity-50">
                    {' '}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                {item.product.stock ? (
                  <p className="text-[13px] sm:text-[14px] text-text-success font-semibold">
                    {t('inStock')}
                  </p>
                ) : (
                  <p className="text-[13px] sm:text-[14px] text-text-danger font-semibold">
                    {t('outOfStock')}
                  </p>
                )}

                <p className="text-base sm:text-lg md:text-[20px] text-text-plain font-semibold line-clamp-2 mt-0.5">
                  {item.product.title}
                </p>

                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="bg-bg-warning flex rounded px-2 py-0.5 sm:w-16.75 sm:h-6 justify-center items-center gap-1.5">
                    <Star size={14} fill="black" />
                    <p className="text-xs sm:text-sm font-medium text-text-plain">
                      {Math.round(item.product.rating)}/5
                    </p>
                  </div>

                  <p className="text-text-info text-xs sm:text-sm">
                    ({t('ratings', { count: item.product.ratings })})
                  </p>
                </div>

                <div className="mt-3 sm:mt-4 flex items-center gap-2.5">
                  <p className="text-text-plain text-lg sm:text-2xl font-bold">
                    {item.product.discountValue
                      ? (
                          Number(item.product.price) *
                          (1 -
                            Number(item.product.discountValue) / 100)
                        ).toFixed(2)
                      : item.product.price}

                    <span className="text-xs sm:text-sm font-medium text-text-plain ms-1">
                      {t('currency')}
                    </span>
                  </p>

                  {item.product.discountValue && (
                    <p className="text-text-muted line-through text-xs sm:text-sm">
                      {item.product.price} EGP
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* add to cart and remove button */}
            <div className="flex sm:flex-col justify-between sm:justify-between items-center sm:items-end gap-3 shrink-0 w-full sm:w-auto">
              <div className="bg-bg-danger-fade rounded-md size-fit py-2.5 px-3 sm:py-3.5 sm:px-4 cursor-pointer order-2 sm:order-1 shrink-0">
                <RemoveProduct productId={item.id} />
              </div>

              <div className="order-1 sm:order-2 flex-1 sm:flex-initial w-full sm:w-auto">
                {item.product.stock ? (
                  <AddToCart
                    stock={item.product.stock}
                    className="bg-bg-primary text-text-inverse py-3 sm:py-4 md:py-5 px-4 sm:px-6 w-full sm:w-auto justify-center"
                    productId={item.productId}
                  >
                    <ShoppingCartIcon className="w-4 h-4 text-text-inverse rtl:order-2 dark:text-white" />
                    {t('addToCart')}
                  </AddToCart>
                ) : (
                  <Link
                    className="inline-block text-center bg-bg-primary-fade py-3 sm:py-3.5 px-4 sm:px-6 text-text-primary rounded-md font-medium text-xs sm:text-sm md:text-base w-full sm:w-auto"
                    href={`/products?categoryId=${item.product.categoryId}`}
                  >
                    {t('exploreSimilarProducts')}
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
