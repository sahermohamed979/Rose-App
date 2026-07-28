import React from 'react';
import Image from 'next/image';
import { Gift } from 'lucide-react';
import { ICategory } from '@/shared/lib/types/product-details';

export default function CategoriesFilter({
  category,
}: {
  category: ICategory;
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 transition-all duration-200 ease-in-out  w-full bg-bg-soft  h-9  my-1 hover:bg-bg-default/50 rounded-md"
    >
      <span className="bg-bg-default flex justify-center items-center rounded-l-md  h-9 w-10  text-white">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.title}
            width={22}
            height={22}
            className=" object-contain "
          />
        ) : (
          <Gift />
        )}
      </span>

      <span className="text-text-plain text-sm font-medium">
        {category.title}
      </span>
    </button>
  );
}
