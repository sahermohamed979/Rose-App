import OccasionsDashboardScreen from '@/features/occasions/screens/occasions-dashboard-screen';
import { getOccasions } from '@/features/occasions/apis/get-occasions.api';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { page, search } = await searchParams;
  const response = await getOccasions({
    page: Number(page) || 1,
    limit: 10,
    search: search || '',
  });
  const data = response.status ? response.payload : null;

  return (
    <OccasionsDashboardScreen
      data={data}
      currentPage={Number(page) || 1}
    />
  );
}
