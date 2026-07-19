import { ProductType } from '../types/product';
import { ShoppingCartIcon, Star, StarIcon } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';

export default function ProductCard({
  product,
}: {
  product: ProductType;
}) {
  // console.log(product, 'product');
  const discountPrice: number =
    Number(product.price) * (1 - Number(product.discountValue) / 100);
  const nowDate = new Date().getTime();
  const updatedAt = new Date(product.updatedAt).getTime();
  const isNew = nowDate - updatedAt < 1000 * 60 * 60 * 24 * 7;
  // console.log(product, isNew, discountPrice);

  return (
    <div className="w-full max-w-[302px] ">
      <div
        style={{ backgroundImage: `url(${product.cover})` }}
        className={
          'aspect-302/272 w-full bg-cover bg-center rounded-2xl mb-4 relative'
        }
      >
        <div className="absolute top-2 right-2 rtl:left-2 flex gap-x-1.5 focus-visible:outline-none">
          {product.stock === 0 && (
            <Badge variant="destructive" className="">
              Out of stock
            </Badge>
          )}
          {isNew && (
            <Badge className="bg-white text-zinc-700">New</Badge>
          )}
          {Number(product.discountValue) >= 20 && (
            <Badge variant="secondary" className="">
              Hot
            </Badge>
          )}
        </div>
      </div>
      {/* <Image src={product.cover} alt={product.title} width={302} height={272}
                className=' object-cover h-[272px] w-[302px] rounded-2xl mb-4' quality={100} /> */}
      <h2
        className="
            text-lg font-semibold
             text-text-primary 
             leading-none mb-3
              truncate w-full"
      >
        {product.title}
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
            <span className="text-text-primary me-1">
              {product.price}
            </span>
            <span className="text-text-muted line-through">
              {product.discountType === 'PERCENT'
                ? discountPrice
                : `$${product.discountValue}% off`}
            </span>
          </p>
        </div>
        {/*add to cart button*/}
        <Button
          className="w-[42px] 
                h-[42px] rounded-full
                 p-0 dark:bg-maroon-500"
        >
          <ShoppingCartIcon className="w-4 h-4 text-text-inverse dark:text-white" />
        </Button>
      </div>
    </div>
  );
}
