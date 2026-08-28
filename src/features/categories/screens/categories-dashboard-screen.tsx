import GlobalSearch from '@/shared/components/dashboard-global-search';
import DashboardPageHeader from '@/shared/components/dashboard-page-header';
import { CategoriesTable } from '../components/categories-table';
import ResourcePagination from '../components/pagination/resource-pagination';
import { getTranslations } from 'next-intl/server';
import { IPaginationResponse } from '@/shared/lib/types/api';
import { CategoryWithCount } from '../types/categories-type';

export default async function CategoriesDashboardScreen({
  data,
  currentPage,
}: {
  data: IPaginationResponse<CategoryWithCount> | null;
  currentPage: number;
}) {
  const t = await getTranslations('categoryDashboard');

  return (
    <div className="p-5 flex flex-col bg-bg-plain rounded-lg">
      <DashboardPageHeader
        title={t('categories')}
        Text={t('addNew')}
        Href="/dashboard/categories/add-category"
      />
      <GlobalSearch />

      <CategoriesTable categories={data?.data || []} />

      <ResourcePagination
        currentPage={currentPage}
        totalPages={data?.metadata?.totalPages ?? 1}
      />
    </div>
  );
}
