import { getLocale, getTranslations } from 'next-intl/server';
import { StatisticsCategory } from '../types/statistics.types';
import { formatNumber } from '@/shared/lib/utils/formatter';

interface AllCategoriesProps {
  categories: StatisticsCategory[];
}

export default async function AllCategories({
  categories,
}: AllCategoriesProps) {
  const locale = await getLocale();
  const t = await getTranslations('dashboard.overviewPage');

  return (
    <div className="bg-bg-plain rounded-xl border border-border-subtle shadow-subtle flex flex-col h-full overflow-hidden">
      <div className="px-5 py-3.5 border-b border-border-subtle">
        <h2 className="text-text-plain text-lg font-semibold">
          {t('allCategories')}
        </h2>
      </div>

      {/* Scrollable list fitting exactly 5 items on large screens */}
      <div className="flex-1 min-h-0 max-h-[240px] overflow-y-auto divide-y divide-border-subtle scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {categories.length === 0 ? (
          <div className="flex items-center justify-center py-10 px-5">
            <p className="text-text-soft text-sm">
              {t('noCategories')}
            </p>
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between px-5 h-[48px] hover:bg-bg-subtle transition-colors"
            >
              <span className="text-text-plain text-sm font-medium truncate max-w-[60%]">
                {category.title}
              </span>
              <span className="text-text-soft text-xs font-medium bg-bg-muted rounded-full px-3 py-1 shrink-0">
                {category.productCount === 1
                  ? t('productSingular', {
                      count: formatNumber(
                        category.productCount,
                        locale
                      ),
                    })
                  : t('productPlural', {
                      count: formatNumber(
                        category.productCount,
                        locale
                      ),
                    })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
