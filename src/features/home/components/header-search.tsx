'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchSuggestedProducts,
  searchProducts,
} from '../apis/search-action';
import { useDebounce } from '../hooks/use-debounce';
import { Input } from '@/shared/components/ui/input';
import { SearchIcon, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SearchSkeleton } from '../skeletons/skeletons-search';
import Link from 'next/link';
import { Product } from '../types/search-types';
import Image from 'next/image';

export default function HeaderSearch() {
  //  search input state
  const [query, setQuery] = useState('');
  // Search dropdown visibility state
  const [isFocused, setIsFocused] = useState(false);
  // Debounced search query for API performance
  const debouncedQuery = useDebounce(query, 300);
  // Translations
  const t = useTranslations('header');

  // Fetch data using React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', debouncedQuery],
    queryFn: () =>
      debouncedQuery.length >= 2
        ? searchProducts(debouncedQuery)
        : fetchSuggestedProducts(),
    enabled: isFocused,
  });
  // search filter
  const results = (data?.data || []).filter((product) =>
    product.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  );
  return (
    <div className="relative w-full grow">
      {/* Search input area */}
      <div className="relative min-w-50 flex items-center">
        <div className="absolute ps-3 flex items-center pointer-events-none">
          <SearchIcon className="w-5 h-5 text-text-muted" />
        </div>

        <Input
          className="ps-10 pe-4 w-full h-10 border rounded-lg"
          type="search"
          placeholder={t('searchPlaceholder')}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
      </div>

      {/* Results dropdown */}
      {isFocused && (
        <div className="absolute top-full mt-2 w-full bg-bg-plain shadow-lg border rounded-lg z-50">
          {isError ? (
            <div className="p-4 text-center text-text-danger text-sm font-bold">
              {t('searchError')}
            </div>
          ) : isLoading ? (
            <SearchSkeleton />
          ) : (
            <>
              <div className="p-2 text-sm text-text-primary font-bold border-b">
                {debouncedQuery.length >= 2
                  ? t('searchResult')
                  : t('suggestedProduct')}
              </div>

              {results.length > 0 ? (
                results.map((product: Product) => (
                  <Link
                    href={`/products/${product.id}`}
                    key={product.id}
                    className="flex items-center gap-4 p-4 hover:bg-bg-subtle transition-colors border-b"
                    onClick={() => setIsFocused(false)}
                  >
                    <div className="w-16 h-16 shrink-0">
                      <Image
                        width={80}
                        height={80}
                        src={product.cover}
                        alt={product.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>

                    {/* Product details */}
                    <div className="grow flex flex-col justify-center">
                      <h3 className="font-semibold text-sm text-text-plain">
                        {product.title
                          .split(
                            new RegExp(`(${debouncedQuery})`, 'gi')
                          )
                          .map((part, i) =>
                            part.toLowerCase() ===
                            debouncedQuery.toLowerCase() ? (
                              <span
                                key={i}
                                className="text-text-secondary"
                              >
                                {part}
                              </span>
                            ) : (
                              part
                            )
                          )}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-text-plain text-lg">
                          {product.discountPrice || product.price} EGP
                        </span>
                        {product.discountPrice && (
                          <span className="line-through text-text-subtle text-xs">
                            {product.price} EGP
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Rating display */}
                    <div className="flex items-center gap-1 text-sm shrink-0">
                      <Star className="w-4 h-4 fill-text-warning text-text-warning" />
                      <span className="text-text-plain font-medium">
                        {t('searchRating')}{' '}
                        <span className="font-bold">
                          {product.rating.toFixed(1)}/5
                        </span>
                        <span className="text-text-info ml-1">
                          ({product.reviewsCount} {t('productRating')}
                          )
                        </span>
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-text-muted text-sm">
                  {t('noProducts')}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
