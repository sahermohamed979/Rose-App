'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/navigation';
import GlobalSearch from '@/shared/components/dashboard-global-seach';
import DashboardPageHeader from '@/shared/components/dashboard-page-header';
import { useTranslations } from 'next-intl';
import { useOccasions } from '../hooks/use-occasions';
import { OccasionsTable } from '../components/occasions-table';
import { OccasionsDashboardSkeleton } from '../skeletons/occasions-dashboard-skeleton';
import PaginationOccasions from '../components/pagination/pagination-occasions';

export default function OccasionsDashboardScreen() {
  const t = useTranslations('occasionDashboard');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const router = useRouter();
  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';

  const { data, isLoading, isFetching } = useOccasions({
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
    return <OccasionsDashboardSkeleton />;
  }

  return (
    <div className="p-5 flex flex-col bg-bg-plain rounded-lg">
      <DashboardPageHeader
        title={t('occasions')}
        buttonText={t('addNew')}
        onButtonClick={() =>
          router.push('/dashboard/occasions/add-occasion')
        }
      />
      <GlobalSearch />

      <div
        className={isFetching ? 'opacity-60 transition-opacity' : ''}
      >
        <OccasionsTable occasions={data?.data || []} />
      </div>

      <PaginationOccasions
        currentPage={page}
        totalPages={data?.metadata?.totalPages ?? 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
