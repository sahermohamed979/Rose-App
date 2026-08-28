import CategoriesDashboardScreen from '@/features/categories/screens/categories-dashboard-screen';
import { getCategories } from '@/features/categories/apis/get-categories.api';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { page, search } = await searchParams;
  const response = await getCategories({
    page: Number(page) || 1,
    limit: 10,
    search: search || '',
  });
  const data = response.status ? response.payload : null;

  return (
    <CategoriesDashboardScreen
      data={data}
      currentPage={Number(page) || 1}
    />
  );
}
