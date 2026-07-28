import { RotateCcw, Star, X } from 'lucide-react';
import CategoriesFilter from './categories-filter';
import { getCategories, getOccasions } from '../apis/filter-api';
import { use } from 'react';
import {
  ICategory,
  IOccasion,
} from '@/shared/lib/types/product-details';
import Image from 'next/image';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';

export default function SidebarFilters({
  categoriesPromise,
  occasionsPromise,
}: {
  categoriesPromise: ReturnType<typeof getCategories>;
  occasionsPromise: ReturnType<typeof getOccasions>;
}) {
  const data: ICategory[] | null = use(categoriesPromise);
  const occasions: IOccasion[] | null = use(occasionsPromise);
  if (!data) {
    return <div>Error</div>;
  }

  return (
    <div className=" px-7 flex-col flex gap-3 justify-center">
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
          <div className="max-h-60 overflow-y-auto scrollbar-none   [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
      <div className="  border-t border-border-subtle">
        <div className="flex items-center justify-between  mb-2 mt-3">
          <h3 className="text-lg font-semibold text-text-plain">
            Occasions
          </h3>
          <span className="text-sm font-semibold flex items-center gap-1 me-4 text-red-600">
            <X size={20} /> Reset
          </span>
        </div>
        <div className="grid grid-cols-2  max-h-62 overflow-y-auto scrollbar-none   [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden justify-center items-center gap-2 ">
          {occasions?.map((occasion) => (
            <div
              key={occasion.id}
              className="  group relative h-19 w-48 overflow-hidden rounded-lg"
            >
              <Image
                src={occasion.image ?? ''}
                alt={occasion.title}
                objectFit="cover"
                fill
                className=""
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 transition-all duration-300 group-hover:from-black/25 group-hover:to-black/50" />{' '}
              <h2 className="absolute inset-0 flex items-center justify-center text-base font-medium text-white">
                {occasion.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
      {/* rating */}
      <div className="border-t border-border-subtle">
        <div className="flex items-center justify-between  mb-2 mt-3">
          <h3 className="text-lg font-semibold text-text-plain">
            Rating
          </h3>
          <span className="text-sm font-semibold flex items-center gap-1 me-4 text-red-600">
            <X size={20} /> Reset
          </span>
        </div>
        <div className="flex items-center gap-1 text-yellow-500">
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
      </div>
      {/* prices */}
      <div className="border-t border-border-subtle">
        <div className="flex items-center justify-between  mb-2 mt-3">
          <h3 className="text-lg font-semibold text-text-plain">
            Price
          </h3>
          <span className="text-sm font-semibold flex items-center gap-1 me-4 text-red-600">
            <X size={20} /> Reset
          </span>
        </div>
        <div className="flex items-center gap-4 ">
          <div className="space-y-2">
            <Label htmlFor="from">from</Label>

            <Input type="number" id="from" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>

            <Input type="number" id="to" />
          </div>
        </div>
      </div>
      {/* rest all filters */}
      <div className="border-t border-border-subtle mt-2 ">
        <Button className={`mt-3 w-full h-12`}>
          <RotateCcw size={18} />
          <span>Rest All</span>
        </Button>
      </div>
    </div>
  );
}
