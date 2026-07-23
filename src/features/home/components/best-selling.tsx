import { Button } from '@/shared/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { ProductType } from '../types/product';
import BestSellingCarousel from './best-selling-carousel';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function Bestselling({
  bestSellingProducts,
}: {
  bestSellingProducts: ProductType[];
}) {
  const t = await getTranslations('home');
  const locale = await getLocale();
  return (
    <div className="grid grid-cols-1 gap-9 px-5 md:px-0 lg:grid-cols-[minmax(260px,22.7%)_minmax(0,1fr)] mb-[138px]">
      <div className=" flex flex-col justify-between mb-5 md:mb-0">
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
            className="text-3xl
      font-bold
      text-text-primary
      leading-none 
      mb-[10px]"
          >
            {t.rich('bestSellingSubtitle', {
              secondary: (chunks) => (
                <span className="text-text-secondary">{chunks}</span>
              ),
              br: () => <br />,
            })}
          </p>
          <p
            className="text-base
        text-text-soft
        leading-none 
        mb-[10px]
        whitespace-pre-line"
          >
            {t('bestSellingDescription')}
          </p>
        </div>
        <Button className="w-[53%]">
          {t('exploreGifts')}

          {locale === 'ar' ? (
            <ArrowRightIcon className="w-4 h-4 rotate-180" />
          ) : (
            <ArrowRightIcon className="w-4 h-4" />
          )}
        </Button>
      </div>
      <div className="min-w-0 w-full">
        {bestSellingProducts.length > 0 ? (
          <BestSellingCarousel
            bestSellingProducts={bestSellingProducts}
          />
        ) : (
          <div className="flex min-h-68 items-center justify-center rounded-2xl bg-bg-muted px-6 text-center text-text-soft">
            We could not load best selling products right now.
          </div>
        )}
      </div>
    </div>
  );
}
