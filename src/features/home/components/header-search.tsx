'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { fetchSuggestedProducts } from '../apis/search-action';
import { useDebounce } from '../hooks/use-debounce';
import { Input } from '@/shared/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SearchSkeleton } from '../skeletons/skeletons-search';
import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  price: number;
  discountPrice?: number;
  rating: number;
}

export default function HeaderSearch() {
  // States
  const [query, setQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 300);
  // translations
  const t = useTranslations('header');

  // Fetch initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchSuggestedProducts();
        if (response?.success) {
          setAllProducts(response.data);
        } else {
          setError(t('searchError'));
        }
      } catch (err) {
        setError(t('searchError'));
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, [t]);

  // Handle product filtering
  const results = useMemo(() => {
    if (debouncedQuery.trim().length < 2) {
      return allProducts;
    }

    return allProducts.filter((product) =>
      product.title
        .toLowerCase()
        .includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery, allProducts]);

  return (
    <div className="relative w-full grow">
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

      {/* Search results dropdown */}
      {isFocused && (
        <div className="absolute top-full mt-2 w-full bg-bg-plain shadow-lg border rounded-lg z-50">
          {error ? (
            <div className="p-4 text-center text-text-danger text-sm font-bold">
              {error}
            </div>
          ) : isLoading ? (
            <SearchSkeleton />
          ) : (
            <>
              <div className="p-2 text-sm text-text-soft font-bold border-b">
                {query.length > 0
                  ? t('searchResult')
                  : t('suggestedProduct')}
              </div>

              {results.length > 0 ? (
                results.map((product: Product) => (
                  <Link
                    href={`/products/${product.id}`}
                    key={product.id}
                    className="block hover:bg-bg-subtle transition-colors border-b"
                    onClick={() => setIsFocused(false)}
                  >
                    <div className="p-4 flex items-center justify-between">
                      <span className="font-semibold text-text-plain truncate w-2/3">
                        {product.title}
                      </span>

                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span
                            className={
                              product.discountPrice
                                ? 'line-through text-text-subtle text-xs'
                                : 'font-bold text-text-plain'
                            }
                          >
                            {product.price} EGP
                          </span>
                          {product.discountPrice && (
                            <span className="text-text-danger font-bold">
                              {product.discountPrice} EGP
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-yellow-500">
                          ★{' '}
                          <span className="ms-1 text-text-default">
                            {product.rating}
                          </span>
                        </div>
                      </div>
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
