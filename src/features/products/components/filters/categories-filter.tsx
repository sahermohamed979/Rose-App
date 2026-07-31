import Link from 'next/link';
import { buildFilterUrl } from '@/features/products/lib/build-filter-url';
import {
  ProductCategory,
  ProductsSearchParams,
} from '@/shared/lib/types/product-types';
import Image from 'next/image';

interface CategoriesFilterProps {
  category: ProductCategory;
  searchParams: ProductsSearchParams;
}

export default function CategoriesFilter({
  category,
  searchParams,
}: CategoriesFilterProps) {
  const isSelected = searchParams.categoryId === category.id;

  return (
    <Link
      href={buildFilterUrl(searchParams, {
        categoryId: isSelected ? null : category.id,
      })}
      className={`flex items-center gap-2 transition-all duration-200 ease-in-out  text-text-plain w-full   h-9  my-1 hover:bg-bg-default/50 rounded-md ${isSelected ? 'bg-red-50  ' : 'bg-bg-soft '}`}
    >
      <span
        className={` flex justify-center transition-all duration-200 ease-in-out  items-center rounded-l-md  h-9 w-10  text-white ${isSelected ? 'bg-bg-primary' : 'bg-bg-default'}`}
      >
        {category.image && (
          <Image
            src={category.image}
            alt={category.title}
            width={22}
            height={22}
            className=" object-contain "
          />
        )}
      </span>
      <span className="text-text-plain text-sm font-medium">
        {category.title}
      </span>
    </Link>
  );
}
