import React from 'react';

export default function RelatedProductsSkeleton() {
  return (
    <main>
      <div className="ms-10 mb-10 mt-12.5">
        {/* Title skeleton */}
        <div className="relative inline-block">
          <div className="h-9 w-56 animate-pulse rounded-md bg-gray-200" />
          <div className="absolute bottom-0 left-0 h-5 w-[55%] rounded-r-[18px] bg-gray-300/50" />
          <div className="absolute bottom-0 left-0 z-20 h-0.5 w-15 bg-gray-300" />
        </div>

        {/* Related products skeleton */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              {/* Image */}
              <div className="h-48 w-full bg-gray-200" />

              {/* Content */}
              <div className="space-y-3 p-4">
                <div className="h-5 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
                <div className="h-5 w-1/3 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
