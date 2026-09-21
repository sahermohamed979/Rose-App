import { RotateCcw, Star, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import CategoriesFilter from './categories-filter';
import PriceFilter from './price-filter';
import { getCategories, getOccasions } from '../../apis/filter-api';
import {
  buildFilterUrl,
  hasAnyFilter,
} from '../../lib/build-filter-url';
import {
  ProductCategory,
  OccasionType,
  ProductsSearchParams,
} from '@/shared/lib/types/product-types';
import ErrorFilters from './error-filters';
import { getTranslations } from 'next-intl/server';

interface SidebarFiltersProps {
  categoriesPromise: ReturnType<typeof getCategories>;
  occasionsPromise: ReturnType<typeof getOccasions>;
  searchParams: ProductsSearchParams;
}

export default async function SidebarFilters({
  categoriesPromise,
  occasionsPromise,
  searchParams,
}: SidebarFiltersProps): Promise<React.JSX.Element> {
  // Translations
  const t = await getTranslations('ProductsFilters');

  // Data
  const categories: ProductCategory[] | null =
    await categoriesPromise;
  const occasions: OccasionType[] | null = await occasionsPromise;

  if (categories === null || occasions === null) {
    return <ErrorFilters />;
  }

  // Variables
  const selectedOccasionId: string | string[] | undefined =
    searchParams.occasionId;
  const selectedMinRating: number = Number(
    searchParams.minRating ?? 0
  );
  const isAnyFilterActive: boolean = hasAnyFilter(searchParams);
  return (
    <div className="px-2 sm:px-4 lg:px-7 flex-col flex gap-3 justify-center">
      {/* categories */}
      <div className="rounded-lg p-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-text-plain">
            {t('categories')}
          </h3>
          {searchParams.categoryId && (
            <Link
              href={buildFilterUrl(searchParams, {
                categoryId: null,
              })}
              className="text-sm font-semibold flex items-center gap-1 text-red-600"
            >
              <X size={20} /> {t('reset')}
            </Link>
          )}
        </div>
        <div className="max-h-60 overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
            <CategoriesFilter
              key={category.id}
              category={category}
              searchParams={searchParams}
            />
          ))}
        </div>
      </div>

      {/* occasion */}
      <div className="border-t border-border-subtle">
        <div className="flex items-center justify-between mb-2 mt-3">
          <h3 className="text-lg font-semibold text-text-plain">
            {t('occasions')}
          </h3>
          {selectedOccasionId && (
            <Link
              href={buildFilterUrl(searchParams, {
                occasionId: null,
              })}
              className="text-sm font-semibold flex items-center gap-1 me-4 text-red-600"
            >
              <X size={20} /> {t('reset')}
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 max-h-62 overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden justify-center items-center gap-2">
          {occasions?.map((occasion) => {
            const isSelected: boolean =
              selectedOccasionId === occasion.id;
            const hasValidImage =
              typeof occasion.image === 'string' &&
              occasion.image.trim().length > 0;
            return (
              <Link
                key={occasion.id}
                href={buildFilterUrl(searchParams, {
                  occasionId: isSelected ? null : occasion.id,
                })}
                className="group relative h-19 w-full overflow-hidden rounded-lg block bg-bg-muted"
              >
                {hasValidImage && (
                  <Image
                    src={occasion.image}
                    alt={occasion.title || 'occasion'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
                <div
                  className={`absolute inset-0 bg-linear-to-b transition-all duration-300 group-hover:from-black/25 group-hover:to-black/50 ${
                    isSelected
                      ? 'to-bg-primary/50 from-black/25'
                      : ' from-black/40 to-black/80'
                  }`}
                />
                <h2 className="absolute inset-0 flex items-center justify-center text-base font-medium text-white">
                  {occasion.title}
                </h2>
              </Link>
            );
          })}
        </div>
      </div>

      {/* rating */}
      <div className="border-t border-border-subtle">
        <div className="flex items-center justify-between mb-2 mt-3">
          <h3 className="text-lg font-semibold text-text-plain">
            {t('Rating')}
          </h3>
          {selectedMinRating > 0 && (
            <Link
              href={buildFilterUrl(searchParams, { minRating: null })}
              className="text-sm font-semibold flex items-center gap-1 me-4 text-red-600"
            >
              <X size={20} /> {t('reset')}
            </Link>
          )}
        </div>
        <div className="flex items-center gap-1 text-yellow-500">
          {([1, 2, 3, 4, 5] as const).map((n) => (
            <Link
              key={n}
              href={buildFilterUrl(searchParams, {
                minRating: n === selectedMinRating ? null : String(n),
              })}
            >
              <Star
                size={22}
                className={
                  n <= selectedMinRating
                    ? 'fill-yellow-500 text-yellow-500'
                    : 'text-gray-300'
                }
              />
            </Link>
          ))}
        </div>
      </div>

      <PriceFilter
        key={`${searchParams.minPrice ?? ''}-${searchParams.maxPrice ?? ''}`}
      />

      <div className="border-t border-border-subtle mt-2">
        {isAnyFilterActive ? (
          <Link
            href="/products"
            className={`${'mt-3 w-full h-12 flex items-center justify-center gap-2 rounded-lg font-medium bg-bg-primary  text-white '}`}
          >
            <RotateCcw size={18} />
            <span>{t('clearFilters')}</span>
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className={`mt-3 w-full h-12 flex items-center justify-center gap-2 rounded-lg font-medium bg-bg-plain text-text-primary-faint  cursor-not-allowed select-none`}
          >
            <RotateCcw size={18} />
            <span>{t('clearFilters')}</span>
          </span>
        )}
      </div>
    </div>
  );
}
