import ProductScreen from '@/features/products/screens/product-screen';
import SidebarFilters from '@/features/products/components/sidebar-filters';
import {
  getCategories,
  getOccasions,
} from '@/features/products/apis/filter-api';

export default function Page() {
  const categoriesPromise = getCategories();
  const occasionsPromise = getOccasions();

  return (
    <div className="flex gap-5 my-8 px-4 py-8">
      <aside className="w-1/4 border-r border-border-subtle ">
        <SidebarFilters
          categoriesPromise={categoriesPromise}
          occasionsPromise={occasionsPromise}
        />
      </aside>

      <main className="w-3/4">
        <ProductScreen />
      </main>
    </div>
  );
}
