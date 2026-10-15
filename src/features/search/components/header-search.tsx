'use client';

import { useRef } from 'react';
import { SearchIcon, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Input } from '@/shared/components/ui/input';
import { SearchResultItem } from '@/features/search/components/search-result-item';
import { SearchSkeleton } from '../skeletons/skeletons-search';
import { useHeaderSearch } from '../hooks/use-header-search';

const SCROLL_BOTTOM_THRESHOLD_PX = 50;
const MAX_SEARCH_LENGTH = 200;
const BLUR_CLOSE_DELAY_MS = 200;

export default function HeaderSearch() {
  const t = useTranslations('header');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    query,
    setQuery,
    results,
    isSearching,
    isDropdownOpen,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    debouncedQuery,
    handleFocus,
    handleBlur,
    closeDropdown,
  } = useHeaderSearch();

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
    <div className="relative w-full grow max-w-2xl mx-auto">
      <div className="relative flex items-center group">
        <div className="absolute ps-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-maroon-600 dark:group-focus-within:text-soft-pink-400">
          <SearchIcon className="w-4 h-4 text-muted-foreground group-focus-within:text-maroon-600 dark:group-focus-within:text-soft-pink-400 transition-colors" />
        </div>

        <Input
          className="ps-10 pe-9 w-full h-10 text-sm rounded-full border border-border/50 bg-muted/40 hover:bg-muted/70 focus:bg-background focus:border-maroon-500/60 focus:ring-2 focus:ring-maroon-500/15 dark:focus:ring-soft-pink-500/20 shadow-xs transition-all duration-200 placeholder:text-muted-foreground/70"
          type="search"
          maxLength={MAX_SEARCH_LENGTH}
          aria-label={t('searchPlaceholder')}
          placeholder={t('searchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={() => setTimeout(handleBlur, BLUR_CLOSE_DELAY_MS)}
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute end-3 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          onScroll={handleScroll}
          className={`absolute top-full mt-2 w-full bg-background/95 backdrop-blur-xl shadow-2xl border border-border/60 rounded-2xl z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150 ${
            isSearching ? 'max-h-96 overflow-y-auto' : ''
          }`}
        >
          {isError ? (
            <div className="p-4 text-center text-destructive text-sm font-medium">
              {t('searchError')}
            </div>
          ) : isLoading ? (
            <SearchSkeleton />
          ) : (
            <div className="p-2">
              <div className="px-3 py-1.5 text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                {isSearching
                  ? t('searchResult')
                  : t('suggestedProduct')}
              </div>

              {results.length > 0 ? (
                <div className="space-y-1">
                  {results.map((product) => (
                    <SearchResultItem
                      key={product.id}
                      product={product}
                      query={debouncedQuery}
                      onClick={closeDropdown}
                    />
                  ))}
                  {isFetchingNextPage && (
                    <div className="p-2.5 text-center text-muted-foreground text-xs animate-pulse">
                      {t('loadingMore')}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 text-center text-muted-foreground text-sm">
                  {t('noProducts')}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
