import SidebarFilters from '@/features/products/components/sidebar-filters';
import {
  getCategories,
  getOccasions,
} from '@/features/products/apis/filter-api';
import { getProductAction } from '@/features/products/apis/products-api';
import ProductScreen from '@/features/products/screens/product-screem';

export default async function Page({
  searchParams,
}: {
  searchParams: PageProps<'/[locale]/products'>['searchParams'];
}) {
  const categoriesPromise = getCategories();
  const occasionsPromise = getOccasions();
  const searchParamsPromise = searchParams;
  const productsData = await getProductAction(searchParamsPromise);
  return (
    <div className="flex gap-5 my-8 px-4 py-8">
      <aside className="w-1/4 border-r border-border-subtle ">
        <SidebarFilters
          categoriesPromise={categoriesPromise}
          occasionsPromise={occasionsPromise}
        />
      </aside>

      <main className="w-3/4">
        <ProductScreen data={productsData} />
      </main>
    </div>
  );
}
