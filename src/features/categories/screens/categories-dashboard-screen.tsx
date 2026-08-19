'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/navigation';
import GlobalSearch from '@/shared/components/dashboard-global-seach';
import DashboardPageHeader from '@/shared/components/dashboard-page-header';
import { CategoriesTable } from '../components/categories-table';
import PaginationCategories from '../components/pagination/pagination-categories';
import { useCategories } from '../hooks/use-categories';
import { CategoriesDashboardSkeleton } from '../skeletons/categories-dashboard-skeleton';
import { useTranslations } from 'next-intl';

export default function CategoriesDashboardScreen() {
  const t = useTranslations('categoryDashboard');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';

  const { data, isLoading, isFetching } = useCategories({
    page,
    limit: 10,
    search,
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    replace(`${pathname}?${params.toString()}`);
  };

  if (isLoading) {
    return <CategoriesDashboardSkeleton />;
  }

  return (
    <div className="p-6 m-4 flex flex-col">
      <DashboardPageHeader
        title={t('categories')}
        buttonText={t('addNew')}
      />
      <GlobalSearch />

      <div
        className={isFetching ? 'opacity-60 transition-opacity' : ''}
      >
        <CategoriesTable categories={data?.data || []} />
      </div>

      <PaginationCategories
        currentPage={page}
        totalPages={data?.metadata?.totalPages ?? 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
