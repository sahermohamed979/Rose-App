import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight, Flower2, Sparkles } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { ProductCategory } from '@/shared/lib/types/product-types';

interface CategoryCardProps {
  category: ProductCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  // Translation
  const t = useTranslations('categoriesPage');

  // Variables
  const hasSubCategories =
    category.subCategories && category.subCategories.length > 0;
  const imageUrl = category.image || null;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated transition-all duration-300 hover:-translate-y-1 hover:border-border-primary hover:shadow-lg hover:shadow-maroon-500/5">
      {/* Top Image Section */}
      <Link
        href={`/products?categoryId=${category.id}`}
        className="relative block h-56 w-full overflow-hidden bg-gradient-to-br from-soft-pink-100 via-rose-50 to-maroon-50 dark:from-maroon-950 dark:via-maroon-900 dark:to-neutral-900"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={category.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-soft-pink-200/60 dark:bg-maroon-800/40 text-maroon-700 dark:text-soft-pink-300">
              <Flower2 className="h-8 w-8" />
            </div>
            <span className="mt-3 text-xs font-medium uppercase tracking-wider text-text-muted">
              {t('exclusiveCollection')}
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Badge on Image */}
        <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-white">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-xs font-medium border border-white/10">
            <Sparkles className="h-3 w-3 text-soft-pink-300" />
            {category.title}
          </span>

          {category.immutable && (
            <span className="rounded-full bg-maroon-600/80 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white shadow-sm">
              {t('popular')}
            </span>
          )}
        </div>
      </Link>

      {/* Body Details */}
      <div className="flex flex-1 flex-col p-5">
        <Link
          href={`/products?categoryId=${category.id}`}
          className="group-hover:text-text-primary transition-colors"
        >
          <h3 className="text-lg font-bold text-text-primary line-clamp-1">
            {category.title}
          </h3>
        </Link>

        {category.description && (
          <p className="mt-1.5 text-sm text-text-soft line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        )}

        {/* Subcategories Pills */}
        {hasSubCategories ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {category.subCategories!.slice(0, 3).map((sub) => (
              <Link
                key={sub.id}
                href={`/products?subCategoryId=${sub.id}`}
                className="inline-block rounded-md bg-bg-subtle px-2.5 py-1 text-xs font-medium text-text-subtle transition-colors hover:bg-bg-primary hover:text-text-inverse"
              >
                {sub.title}
              </Link>
            ))}
            {category.subCategories!.length > 3 && (
              <span className="inline-flex items-center rounded-md bg-bg-subtle px-2 py-1 text-xs font-medium text-text-muted">
                +{category.subCategories!.length - 3}
              </span>
            )}
          </div>
        ) : (
          <div className="mt-4 flex items-center text-xs text-text-muted">
            <span>{t('exclusiveCollection')}</span>
          </div>
        )}

        {/* Action Link Footer */}
        <div className="mt-5 border-t border-border-subtle pt-3.5 flex items-center justify-between">
          <span className="text-xs font-medium text-text-muted">
            {t('productsCount', {
              count: category.subCategories?.length || 1,
            })}
          </span>

          <Link
            href={`/products?categoryId=${category.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-primary group-hover:text-maroon-600 transition-colors"
          >
            <span>{t('explore')}</span>
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
