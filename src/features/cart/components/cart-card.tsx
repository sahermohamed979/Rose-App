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
    <div className="relative rounded-2xl border-b border-muted pb-4 mt-4 sm:mt-5">
      <div className="flex gap-3 sm:gap-4">
        <Link
          className="relative shrink-0 group"
          href={`/products/${cartItem?.product?.id}`}
        >
          <div className="w-20 h-24 sm:w-28 sm:h-32 md:w-32 md:h-35 rounded-xl overflow-hidden relative">
            {cartItem?.product?.cover ? (
              <Image
                src={cartItem?.product?.cover}
                alt={'cart image'}
                fill
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                sizes="(max-width: 640px) 80px, 128px"
              />
            ) : (
              <div className="w-full h-full rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                {t('cart.noImage')}
              </div>
            )}
          </div>
        </Link>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex justify-between items-start gap-2 w-full">
            <div className="flex-1 min-w-0">
              <Link
                className="group/title block"
                href={`/products/${cartItem?.product?.id}`}
              >
                <h2 className="font-semibold text-text-primary text-sm sm:text-base line-clamp-2">
                  {cartItem?.product?.title}
                </h2>
              </Link>
              <span className="inline-flex items-center text-xs sm:text-sm mt-1">
                <Star
                  size={16}
                  className="text-yellow-500 fill-yellow-500 me-1 shrink-0"
                />{' '}
                {t('ProductDetails.ratingLabel')}
                <span className="ms-1 font-medium">
                  {Number(cartItem?.product?.rating || 0).toFixed(1)}
                </span>
                <span className="ms-1 text-text-info">
                  (
                  {t('ProductDetails.ratingsCount', {
                    count: cartItem?.product?.ratings || 0,
                  })}
                  )
                </span>
              </span>
            </div>
            <div className="shrink-0">
              <ClearButtonId id={cartItem.id || ''} />
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-4 mt-3 sm:mt-0">
            <div>
              <span className="text-xs sm:text-sm text-text-primary">
                (x{cartItem.quantity})
              </span>
              <span className="ms-1 text-primary-600 font-bold text-base sm:text-lg me-2">
                {totalPrice} {t('cart.currency')}
              </span>
            </div>
            <div className="shrink-0">
              <QuantityButton cartItem={cartItem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
