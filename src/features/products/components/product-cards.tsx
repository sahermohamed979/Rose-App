import Image from 'next/image';
import {
  Star,
  ShoppingCart,
  HeartPlus,
  HeartMinus,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Product } from '../types/products-types';
import { useTranslations } from 'next-intl';
import { useWishlist } from '../hooks/use-wishlist';
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('products');
  const { isWishlist, isLoading, toggleWishlist } = useWishlist(
  product.id,
  product.wishlistItemId,
  product.isWishlisted || false
);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist();
  };
const checkIfNew = (createdAt?: string | number) => {
  if (!createdAt) {return false};
  
  const productDate = new Date(createdAt).getTime();
  const currentDate = new Date().getTime();
  
  // الفرق بالمللي ثانية: نحسبه للأيام (30 يوم مثلاً)
  const diffInDays = (currentDate - productDate) / (1000 * 60 * 60 * 24);
  
  return diffInDays <= 30; // لو المنتج اتضاف من 30 يوم أو أقل يبقى جديد
};

const isNew = checkIfNew(product.createdAt);
const isOutOfStock =  product.stock === 0;

const isTopRated = (product.rating ?? 0) >= 3.5;
  return (
    <div className="bg-bg-plain w-75  rounded-xl  flex flex-col justify-between relative group  ">
      {/* Wishlist Button & Badges */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
        <button
          type="button"
         onClick={handleWishlistClick}
          disabled={isLoading}
          className={`relative group/btn flex items-center gap-2 py-2 px-2.5 rounded-full transition-all duration-300 shadow-sm ${
            isWishlist
              ? 'bg-bg-inverse text-text-inverse'
              : 'bg-bg-plain text-text-primary '
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {/* Icon changes or stays based on your preference */}
          {isWishlist ? (
            <HeartMinus className="w-4 h-4" />
          ) : (
            <HeartPlus className="w-4 h-4" />
          )}

          {/* Text that expands on hover */}
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium transition-all duration-300 ease-in-out group-hover/btn:max-w-32.5 group-hover/btn:opacity-100 opacity-0 text-inherit">
            {isWishlist
              ? t('removeFromWishList')
              : t('addToWishList')}
          </span>
        </button>
       <div className='flex gap-1'>



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
        className="relative w-full h-68 mb-4 block overflow-hidden rounded-xl"
      >
        <Image
          src={product.cover || product.image || ''}
          alt={product.title}
          fill
          sizes=" 300px"
          className="object-cover  group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Product Info */}
      <div className="flex flex-col gap-3 ">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-text-primary  text-lg line-clamp-1 ">
            {product.title}
          </h3>
        </Link>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between ">
          <div className="flex flex-col gap-1.5">
            {/* Rating */}
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating || 0)
                      ? 'fill-text-warning text-text-warning'
                      : 'text-text-warning'
                  }`}
                />
              ))}
            </div>
            <div className="flex flex-row gap-1">
              <span className="font-medium text-text-primary text-base">
                {product.discountValue || product.price} EGP
              </span>
              {product.discountValue && (
                <span className="line-through text-text-muted text-base font-medium">
                  {product.price} EGP
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            // onClick={handleAddToCartClick}
            // disabled={product.outOfStock}
            aria-label="Add to Cart"
            className="p-2.5 rounded-full bg-bg-primary-saturated text-text-primary-fade hover:bg-text-primary transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
