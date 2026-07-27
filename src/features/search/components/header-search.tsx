'use client';

import { useRef } from 'react';
import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Input } from '@/shared/components/ui/input';
import { SearchResultItem } from '@/features/search/components/search-result-item';
import { SearchSkeleton } from '../skeletons/skeletons-search';
import { useHeaderSearch } from '../hooks/use-header-search';

const SCROLL_BOTTOM_THRESHOLD_PX = 50;
const MAX_SEARCH_LENGTH = 200;

export default function HeaderSearch() {
  // Translation
  const t = useTranslations('header');

  // Ref
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Custom hooks
  const {
    query,
    setQuery,
    results,
    isSearching,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    debouncedQuery,
  } = useHeaderSearch();

  // Functions
  function handleScroll() {
    if (!dropdownRef.current || !isSearching) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } =
      dropdownRef.current;
    const isNearBottom =
      scrollHeight - scrollTop - clientHeight <
      SCROLL_BOTTOM_THRESHOLD_PX;

    if (isNearBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  return (
    <div className="relative w-full grow">
      <div className="relative min-w-50 flex items-center">
        <div className="absolute ps-3 flex items-center pointer-events-none">
          <SearchIcon className="w-5 h-5 text-text-muted" />
        </div>

        <Input
          className="ps-10 pe-4 w-full h-10 border rounded-lg bg-bg-plain"
          type="search"
          maxLength={MAX_SEARCH_LENGTH}
          aria-label={t('searchPlaceholder')}
          placeholder={t('searchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {query.length > 0 && (
        <div
          ref={dropdownRef}
          onScroll={handleScroll}
          className={`absolute top-full mt-2 w-full bg-bg-plain shadow-lg border rounded-lg z-50 ${
            isSearching ? 'max-h-96 overflow-y-auto' : ''
          }`}
        >
          {isError ? (
            <div className="p-4 text-center text-text-danger text-sm font-bold">
              {t('searchError')}
            </div>
          ) : isLoading ? (
            <SearchSkeleton />
          ) : (
            <>
              <div className="p-2 text-sm text-text-primary font-bold">
                {isSearching
                  ? t('searchResult')
                  : t('suggestedProduct')}
              </div>

              {results.length > 0 ? (
                <>
                  {results.map((product) => (
                    <SearchResultItem
                      key={product.id}
                      product={product}
                      query={debouncedQuery}
                      onClick={() => setQuery('')}
                    />
                  ))}
                  {isFetchingNextPage && (
                    <div className="p-2 text-center text-text-muted text-xs">
                      {t('loadingMore')}
                    </div>
                  )}
                </>
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
