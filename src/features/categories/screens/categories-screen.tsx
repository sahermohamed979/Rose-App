import { useTranslations } from 'next-intl';
import { SearchX } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { ProductCategory } from '@/shared/lib/types/product-types';
import { CategoriesHero } from '../components/categories-hero';
import { CategoryCard } from '../components/category-card';
import { CategoriesPerks } from '../components/categories-perks';

interface CategoriesScreenProps {
  categories: ProductCategory[];
  totalCount?: number;
  searchQuery?: string;
}

export function CategoriesScreen({
  categories,
  totalCount,
  searchQuery,
}: CategoriesScreenProps) {
  // Translation
  const t = useTranslations('categoriesPage');

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Hero Header */}
      <CategoriesHero totalCount={totalCount ?? categories.length} />

      {/* Categories Grid or Empty State */}
      <div className="mt-10">
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="my-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border-subtle p-12 text-center bg-bg-subtle/30">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-soft-pink-100 text-maroon-600 dark:bg-maroon-900/40 dark:text-soft-pink-300">
              <SearchX className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-text-primary">
              {t('emptyTitle')}
            </h3>
            <p className="mt-1.5 max-w-sm text-sm text-text-soft">
              {t('emptyDescription')}
            </p>
            {searchQuery && (
              <Link
                href="/categories"
                className="mt-5 inline-block rounded-full bg-bg-primary px-5 py-2 text-sm font-semibold text-text-inverse hover:opacity-95 transition-opacity"
              >
                {t('clearSearch')}
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Perks / Guarantees Section */}
      <CategoriesPerks />
    </div>
  );
}
