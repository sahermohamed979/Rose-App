import GlobalSearch from '@/shared/components/dashboard-global-search';
import DashboardPageHeader from '@/shared/components/dashboard-page-header';
import { OccasionsTable } from '../components/occasions-table';
import { getTranslations } from 'next-intl/server';
import { IPaginationResponse } from '@/shared/lib/types/api';
import { OccasionType } from '@/shared/lib/types/product-types';
import ResourcePagination from '@/features/categories/components/pagination/resource-pagination';

export default async function OccasionsDashboardScreen({
  data,
  currentPage,
}: {
  data: IPaginationResponse<OccasionType> | null;
  currentPage: number;
}) {
  const t = await getTranslations('occasionDashboard');

  return (
    <div className="p-5 flex flex-col bg-bg-plain rounded-lg">
      <DashboardPageHeader
        title={t('occasions')}
        Text={t('addNew')}
        Href="/dashboard/occasions/add-occasion"
      />
      <GlobalSearch />

      <OccasionsTable occasions={data?.data || []} />

      <ResourcePagination
        currentPage={currentPage}
        totalPages={data?.metadata?.totalPages ?? 1}
      />
    </div>
  );
}
