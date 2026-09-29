'use client';
import { useTranslations } from 'next-intl';
import { StarIcon } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import { Link } from '@/i18n/navigation';
import AddToCart from '@/features/cart-wishlist/components/add-to-cart';
import { IProduct } from '@/shared/lib/types/product-types';
import WishlistButton from '@/features/cart-wishlist/components/wishlist-button';
export default function ProductCard({
  product,
}: {
  product: IProduct;
}) {
  const t = useTranslations('');
  const discountPrice: number =
    Number(product.price) * (1 - Number(product.discountValue) / 100);
  const nowDate = new Date().getTime();
  const updatedAt = new Date(product.updatedAt).getTime();
  const isNew = nowDate - updatedAt < 1000 * 60 * 60 * 24 * 7;

  return (
    <div className="w-full sm:max-w-[302px]">
      <Link
        href={`/products/${product.id}`}
        aria-label={product.title}
        style={{ backgroundImage: `url(${product.cover})` }}
        className="block aspect-[302/272] w-full bg-cover bg-center rounded-2xl mb-4 relative"
      >
        <div className="absolute w-fit top-2 right-2 rtl:left-2 rtl:right-auto flex gap-x-1.5 focus-visible:outline-none">
          {product.stock === 0 && (
            <Badge variant="destructive" className="">
              {t('productBadges.outOfStock')}
            </Badge>
          )}
          {isNew && (
            <Badge className="bg-white text-zinc-700 hover:bg-white hover:text-zinc-700">
              {t('productBadges.new')}
            </Badge>
          )}
          {Number(product.discountValue) >= 20 && (
            <Badge
              variant="secondary"
              className="dark:bg-maroon-50 dark:text-maroon-600"
            >
              {t('productBadges.hot')}
            </Badge>
          )}
        </div>
        <div className="absolute top-2 left-2 rtl:right-2 flex gap-x-1.5 focus-visible:outline-none">
          <WishlistButton productId={product.id} />
        </div>
      </Link>

      <h2
        className="
            text-lg font-semibold
             text-text-primary 
             leading-none mb-3
              truncate w-full"
      >
        <Link href={`/products/${product.id}`}>{product.title}</Link>
      </h2>
      <div className="flex  justify-between ">
        {/* Rating stars and Price */}
        <div className="flex  flex-col gap-y-3">
          {/* Rating stars */}
          <div className="flex items-center ">
            {Array.from({ length: 5 }).map((_, index) => {
              const fillValue = Math.max(
                0,
                Math.min(1, product.rating - index)
              );
              return (
                <div
                  key={index}
                  className="relative w-4 h-4 inline-block"
                >
                  <StarIcon className="absolute top-0 left-0 w-4 h-4 text-yellow-500" />
                  <div
                    className="absolute top-0 left-0 h-4 overflow-hidden"
                    style={{ width: `${fillValue * 100}%` }}
                  >
                    <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500 max-w-none" />
                  </div>
                </div>
              );
            })}
          </div>
          {/* Price */}
          <p className="text-base font-medium  leading-none">
            {product.discountValue ? (
              <>
                <span className="text-text-primary me-1">
                  {product.discountType === 'PERCENT'
                    ? `${discountPrice} ${t('currency')}`
                    : `${product.discountValue}% off`}
                </span>
                <span className="text-text-muted line-through">
                  {`${product.price} ${t('currency')}`}
                </span>
              </>
            ) : (
              <span className="text-text-primary">
                {`${product.price} ${t('currency')}`}
              </span>
            )}
          </p>
        </div>
        {/*add to cart button*/}
        <AddToCart
          aria-label={`${t('ProductDetails.addToCart')} - ${product.title}`}
          className="w-[42px] 
            h-[42px] rounded-full
             p-0 dark:bg-maroon-500 overflow-hidden"
          productId={product.id}
          product={product}
          stock={product.stock}
        />
      </div>
    </div>
  );
}
