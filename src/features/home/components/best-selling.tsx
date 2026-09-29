import { Button } from '@/shared/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import BestSellingCarousel from './best-selling-carousel';
import { getLocale, getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { getProductsByFilters } from '../apis/home-products-actions';
import { IProduct } from '@/shared/lib/types/product-types';
import ProductCardSkeletonGrid from '../skeletons/product-card-skeleton';

async function BestSellingProducts({
  bestSellingProducts,
}: {
  bestSellingProducts: Promise<IProduct[]>;
}) {
  let products: IProduct[] = [];

  try {
    products = await bestSellingProducts;
  } catch {
    products = [];
  }

  if (products.length === 0) {
    return <BestSellingProductsFallback />;
  }

  return <BestSellingCarousel bestSellingProducts={products} />;
}

async function BestSellingProductsFallback() {
  const t = await getTranslations('home');
  return (
    <div className="flex min-h-68 items-center justify-center rounded-2xl bg-bg-muted px-6 text-center text-text-soft">
      {t('faliureToLoad')}
    </div>
  );
}

export default async function Bestselling() {
  const t = await getTranslations('home');
  const locale = await getLocale();
  const bestSellingProducts = getProductsByFilters({
    page: 1,
    limit: 6,
    sortBy: 'bestSelling',
    sortOrder: 'desc',
  });

  return (
    <div className="container mx-auto px-4 md:px-0 w-full mt-12 sm:mt-16 lg:mt-[107px]">
      <div className="grid grid-cols-1 gap-8 md:gap-10 px-2 sm:px-4 md:px-0 lg:grid-cols-[minmax(260px,280px)_minmax(0,1fr)] xl:grid-cols-[minmax(280px,22.7%)_minmax(0,1fr)] mb-16 sm:mb-24 lg:mb-[138px]">
        <div className="flex flex-col justify-between mb-5 md:mb-0 gap-6">
          <div>
            <p
              className="text-base
      font-bold
      text-text-secondary
      leading-none 
      letter-spacing-[25%] mb-[10px]"
            >
              {t('bestSelling')}
            </p>
            <p
              className="text-2xl sm:text-3xl
      font-bold
      text-text-primary
      leading-tight sm:leading-none 
      mb-[10px]"
            >
              {t.rich('bestSellingSubtitle', {
                secondary: (chunks) => (
                  <span className="text-text-secondary">
                    {chunks}
                  </span>
                ),
                br: () => <br className="hidden sm:inline" />,
              })}
            </p>
            <p
              className="text-sm sm:text-base
        text-text-soft
        leading-relaxed sm:leading-none 
        mb-[10px]
        whitespace-pre-line"
            >
              {t('bestSellingDescription')}
            </p>
          </div>
          <Button className="w-full sm:w-auto px-6">
            {t('exploreGifts')}

            {locale === 'ar' ? (
              <ArrowRightIcon className="w-4 h-4 rotate-180" />
            ) : (
              <ArrowRightIcon className="w-4 h-4" />
            )}
          </Button>
        </div>
        <div className="min-w-0 w-full">
          <Suspense
            fallback={
              <ProductCardSkeletonGrid
                count={3}
                className="lg:grid-cols-3"
              />
            }
          >
            <BestSellingProducts
              bestSellingProducts={bestSellingProducts}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
