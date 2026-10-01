import React from 'react';
import { cn } from '@/shared/lib/utils/utils';

export default function RelatedProductsSkeleton() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-9 mt-8 sm:mt-12 md:mt-14 mb-8 sm:mb-12">
      {/* Title skeleton */}
      <div className="relative inline-block mb-4 sm:mb-6">
        <div className="h-7 sm:h-8 md:h-9 w-36 sm:w-48 md:w-56 animate-pulse rounded-md bg-gray-200" />
        <div className="absolute bottom-0 inset-s-0 h-4 sm:h-5 w-[55%] rounded-e-[18px] bg-gray-300/50" />
        <div className="absolute bottom-0 inset-s-0 z-20 h-0.5 w-12 sm:w-15 bg-gray-300" />
      </div>

      {/* Related products skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white p-2',
              index > 0 && 'hidden sm:block',
              index > 1 && 'sm:hidden md:block',
              index > 2 && 'md:hidden lg:block'
            )}
          >
            {/* Image */}
            <div className="aspect-[302/272] w-full rounded-2xl bg-gray-200" />

            {/* Content */}
            <div className="space-y-3 p-3">
              <div className="h-5 w-3/4 rounded bg-gray-200" />
              <div className="flex items-center justify-between">
                <div className="h-4 w-1/3 rounded bg-gray-200" />
                <div className="h-9 w-9 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
