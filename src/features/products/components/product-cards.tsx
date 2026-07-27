import Image from 'next/image';
import {
  Star,
  ShoppingCart,
  HeartPlus,
  HeartMinus,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Product } from '../types/products-types';
import { useWishlist } from '../hooks/use-wishlist';
import { useCart } from '../hooks/use-cart';

const NEW_PRODUCT_WINDOW_DAYS = 30;
const TOP_RATED_THRESHOLD = 3.5;
const MAX_RATING_STARS = 4;

interface ProductCardProps {
  product: Product;
}

// Checks if a product was added within the "new" window
function isRecentProduct(createdAt?: string | number): boolean {
  if (!createdAt) {
    return false;
  }

  const daysSinceCreated =
    (Date.now() - new Date(createdAt).getTime()) /
    (1000 * 60 * 60 * 24);

  return daysSinceCreated <= NEW_PRODUCT_WINDOW_DAYS;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Translation
  const t = useTranslations('products');

  // Custom hooks
  const {
    isWishlist,
    isLoading: isWishlistLoading,
    toggleWishlist,
  } = useWishlist(
    product.id,
    product.wishlistItemId,
    product.isWishlisted || false
  );
  const {
    isInCart,
    isLoading: isCartLoading,
    toggleCart,
  } = useCart(
    product.id,
    product.cartItemId,
    product.isInCart || false
  );

  // Variables (derived)
  const isNew = isRecentProduct(product.createdAt);
  const isOutOfStock = product.stock === 0;
  const isTopRated = (product.rating ?? 0) >= TOP_RATED_THRESHOLD;
  const hasDiscount = Boolean(
    product.discountValue && product.discountValue > 0
  );
  const displayPrice = hasDiscount
    ? product.discountValue
    : product.price;

  // Functions (handlers)
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist();
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCart();
  };

  return (
    <div className="bg-bg-plain w-full rounded-xl flex flex-col justify-between relative group">
      {/* Wishlist Button & Badges */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
        <button
          type="button"
          onClick={handleWishlistClick}
          disabled={isWishlistLoading}
          aria-label={
            isWishlist ? t('removeFromWishList') : t('addToWishList')
          }
          className={`relative group/btn flex items-center gap-2 py-2 px-2.5 rounded-full transition-all duration-300 shadow-sm ${
            isWishlist
              ? 'bg-bg-inverse text-text-inverse'
              : 'bg-bg-plain text-text-primary'
          } ${isWishlistLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isWishlist ? (
            <HeartMinus className="w-4 h-4" />
          ) : (
            <HeartPlus className="w-4 h-4" />
          )}

          <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium transition-all duration-300 ease-in-out group-hover/btn:max-w-32.5 group-hover/btn:opacity-100 opacity-0 text-inherit">
            {isWishlist
              ? t('removeFromWishList')
              : t('addToWishList')}
          </span>
        </button>

        <div className="flex gap-1">
          {!isOutOfStock && isNew && (
            <span className="bg-bg-muted text-text-plain text-xs px-2 py-0.5 rounded-full font-medium">
              {t('new')}
            </span>
          )}
          {!isOutOfStock && isTopRated && (
            <span className="bg-bg-primary-fade text-text-primary text-xs px-2 py-0.5 rounded-full font-medium">
              {t('hot')}
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-bg-danger text-text-secondary-fade text-xs px-2 py-0.5 rounded-full font-medium">
              {t('outOfStock')}
            </span>
          )}
        </div>
      </div>

      {/* Product Image */}
      <Link
        href={`/products/${product.id}`}
        className="relative w-full aspect-square mb-4 block overflow-hidden rounded-xl"
      >
        <Image
          src={product.cover || ''}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Product Info */}
      <div className="flex flex-col gap-3 p-1">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-text-primary text-lg line-clamp-1">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              {Array.from({ length: MAX_RATING_STARS }).map(
                (_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating || 0)
                        ? 'fill-text-warning text-text-warning'
                        : 'text-text-warning'
                    }`}
                  />
                )
              )}
            </div>
            <div className="flex flex-row gap-1">
              <span className="font-medium text-text-primary text-base">
                {displayPrice} EGP
              </span>
              {hasDiscount && (
                <span className="line-through text-text-muted text-base font-medium">
                  {product.price} EGP
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCartClick}
            disabled={isCartLoading || isOutOfStock}
            aria-label={
              isInCart ? t('removeFromCart') : t('addToCart')
            }
            className={`p-2.5 rounded-full transition-colors ${
              isInCart
                ? 'bg-bg-inverse text-text-inverse'
                : 'bg-bg-primary-saturated text-text-primary-fade hover:bg-text-primary'
            } ${isCartLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
