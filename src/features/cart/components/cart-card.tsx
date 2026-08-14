'use client';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { ICart } from '../types/cart-types';
import ClearButtonId from './clear-button-id';
import QuantityButton from './quantity-button';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function CartCard({ cartItem }: { cartItem: ICart }) {
  const t = useTranslations();
  const totalPrice =
    Number(cartItem?.product?.price || 0) * (cartItem.quantity || 0);
  return (
    <div className=" relative  rounded-2xl   border-b border-muted  pb-4 mt-5">
      <div className="flex gap-4 ">
        <Link
          className="relative shrink-0 group"
          href={`/products/${cartItem?.product?.id}`}
        >
          <div className="w-32 h-35   rounded-xl   overflow-hidden">
            {cartItem?.product?.cover ? (
              <Image
                src={cartItem?.product?.cover}
                alt={'cart image'}
                fill
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-full h-full rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                {t('cart.noImage')}
              </div>
            )}
          </div>
        </Link>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex  justify-between w-full">
            <div>
              <Link
                className="group/title"
                href={`/products/${cartItem?.product?.id}`}
              >
                <h2 className="font-semibold text-text-primary  text-base ">
                  {cartItem?.product?.title}
                </h2>
              </Link>
              <span className="inline-flex items-center text-base  ">
                <Star
                  size={20}
                  className="text-yellow-500 fill-yellow-500  me-1"
                />{' '}
                {t('ProductDetails.ratingLabel')}
                {cartItem?.product?.rating}
                <span className="ms-1 text-base  text-text-info">
                  (
                  {t('ProductDetails.ratingsCount', {
                    count: cartItem?.product?.ratings || 0,
                  })}
                  )
                </span>
              </span>
            </div>
            <ClearButtonId id={cartItem?.productId || ''} />
          </div>

          <div className=" flex    items-center justify-between gap-4">
            <div>
              <span className="text-sm text-text-primary">
                (x{cartItem.quantity})
              </span>
              <span className=" ms-1 text-primary-600 font-bold text-lg me-2">
                {totalPrice} {t('cart.currency')}
              </span>
            </div>
            <QuantityButton cartItem={cartItem} />
          </div>
        </div>
      </div>
    </div>
  );
}
