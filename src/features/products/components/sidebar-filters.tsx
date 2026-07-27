import { X } from 'lucide-react';
import CategoriesFilter from './categories-filter';
import { getCategories } from '../apis/filter-api';
import { use } from 'react';
import { Category } from '@/shared/lib/types/product-details';

export default function SidebarFilters({
  categoriesPromise,
}: {
  categoriesPromise: ReturnType<typeof getCategories>;
}) {
  const data: Category[] = use(categoriesPromise);

  console.log('categories', data);
  return (
    <div className="py-7 px-7 flex-col flex gap-5 justify-center">
      {/* categories */}
      <div className=" rounded-lg p-2">
        <div>
          {/* headdign and clear btn */}
          <div className="flex items-center justify-between  mb-2">
            <h3 className="text-lg font-semibold text-text-plain">
              Categories
            </h3>
            <span className="text-sm font-semibold flex items-center gap-1 text-red-600">
              <X size={20} /> Reset
            </span>
          </div>
          {/* categories list */}
          <div className="max-h-50 overflow-y-auto scrollbar-none   [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {data.map((category) => (
              <CategoriesFilter
                key={category.id}
                category={category}
              />
            ))}
          </div>
        </div>
      </div>
      {/*occasion*/}
      <div className="  rounded-lg p-4">
        <div className="flex items-center justify-between  mb-2">
          <h3 className="text-lg font-semibold text-text-plain">
            Occasions
          </h3>
          <span className="text-sm font-semibold flex items-center gap-1 text-red-600">
            <X size={20} /> Reset
          </span>
        </div>
        <div className="grid grid-cols-2  justify-center items-center gap-2">
          <div className="bg-red-500">saher</div>
          <div className="bg-red-500">saher</div>
          <div className="bg-red-500">saher</div>
          <div className="bg-red-500">saher</div>
          <div className="bg-red-500">saher</div>
          <div className="bg-red-500">saher</div>
        </div>
      </div>
      {/* rating */}
      <div className="bg-white shadow-sm rounded-lg p-4"></div>
      {/* prices */}
      <div className="bg-white shadow-sm rounded-lg p-4"></div>
      {/* rest all filters */}
      <div className="bg-white shadow-sm rounded-lg p-4"></div>
    </div>
  );
}
