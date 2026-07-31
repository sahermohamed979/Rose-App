'use client';
import React from 'react';
import HeaderTitle from './headr-title';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import ProductCard from './product-card';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
  IProduct,
  OccasionType,
} from '@/shared/lib/types/product-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Link } from '@/i18n/navigation';
import { ArrowRightIcon } from 'lucide-react';
const tabTriggerClassName =
  'text-base font-medium bg-transparent border-none py-0 leading-none enabled:data-active:bg-transparent text-zinc-700 dark:text-text-muted enabled:data-active:text-text-primary enabled:hover:bg-transparent enabled:hover:text-text-primary enabled:data-active:shadow-none enabled:active:shadow-none';

export default function MostPopular({
  occasions,
  ProductsByOccasion,
  activeOccasionId,
}: {
  occasions: OccasionType[];
  ProductsByOccasion: IProduct[];
  activeOccasionId?: string;
}) {
  const t = useTranslations('home');
  const router = useRouter();
  const locale = useLocale();
  const hasNoOccasions = occasions.length === 0;
  const selectedOccasion =
    occasions.find((occasion) => occasion.id === activeOccasionId) ??
    occasions[0];

  return (
    <div className="mb-[138px]">
      {hasNoOccasions && (
        <>
          <HeaderTitle text={t('mostPopular')} />
          <div className="flex min-h-[180px] items-center justify-center rounded-2xl bg-bg-muted px-6 text-center text-text-soft">
            {t('noProductsAvailable')}
          </div>
        </>
      )}
      {!hasNoOccasions && (
        <Tabs value={activeOccasionId ?? occasions[0].id}>
          <div className=" flex justify-between">
            <HeaderTitle text={t('mostPopular')} />
            <TabsList className="hidden md:flex bg-transparent">
              {occasions.map((occasion) => (
                <TabsTrigger
                  key={occasion.id}
                  className={tabTriggerClassName}
                  value={occasion.id}
                  onClick={() =>
                    router.replace(
                      `?occasion=${encodeURIComponent(occasion.title.toLowerCase())}`
                    )
                  }
                >
                  {occasion.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="md:hidden">
              <Select
                value={activeOccasionId ?? occasions[0].id}
                onValueChange={(occasionId) => {
                  const occasion = occasions.find(
                    (item) => item.id === occasionId
                  );
                  if (occasion) {
                    router.replace(
                      `?occasion=${encodeURIComponent(occasion.title.toLowerCase())}`
                    );
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue>{selectedOccasion.title}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {occasions.map((occasion) => (
                    <SelectItem key={occasion.id} value={occasion.id}>
                      {occasion.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent
            className="mt-10"
            key={activeOccasionId}
            value={activeOccasionId}
          >
            {ProductsByOccasion.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 items-center justify-items-center">
                  {ProductsByOccasion.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="flex justify-end py-3 mt-10">
                  <Link
                    href={`/products?occasion=${encodeURIComponent(selectedOccasion.title.toLowerCase())}`}
                    className="flex items-center gap-2 text-base font-bold text-text-primary"
                  >
                    {t('viewAll')}
                    {locale === 'ar' ? (
                      <ArrowRightIcon className="w-4 h-4 text-text-primary rotate-180" />
                    ) : (
                      <ArrowRightIcon className="w-4 h-4 text-text-primary" />
                    )}
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex min-h-[180px] items-center justify-center rounded-2xl bg-bg-muted px-6 text-center text-text-soft">
                {t('noProductsAvailable')}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
