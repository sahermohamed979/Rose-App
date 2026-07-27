import React from 'react';
import { Category } from '@/shared/lib/types/product-details';
import Image from 'next/image';

export default function CategoriesFilter({
  category,
}: {
  category: Category;
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 transition-all duration-200 ease-in-out  w-full bg-bg-soft  my-1 hover:bg-bg-default/50 rounded-md"
    >
      <span className="bg-bg-default flex py-1.5 px-3 rounded-l-md  text-white">
        <Image
          src={category.image}
          alt={category.title}
          width={20}
          height={20}
          className=" object-cover"
        />
      </span>

      <span className="text-text-plain text-sm font-medium">
        {category.title}
      </span>
    </button>
  );
}
