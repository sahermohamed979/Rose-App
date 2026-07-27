'use client';

import { useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  fetchSuggestedProducts,
  searchProducts,
} from '../apis/search-api';
import { useDebounce } from '@/shared/lib/hooks/use-debounce';

const MIN_SEARCH_LENGTH = 2;
const SEARCH_DEBOUNCE_MS = 300;

export function useHeaderSearch() {
  // State
  const [query, setQuery] = useState('');

  // Custom hooks
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS);

  // Variables (derived)
  const isSearching = debouncedQuery.length >= MIN_SEARCH_LENGTH;

  // Query
  const { data: suggestedData, isLoading: isLoadingSuggestions } =
    useQuery({
      queryKey: ['suggested-products'],
      queryFn: fetchSuggestedProducts,
      enabled: !isSearching,
    });

  // Search results use infinite scroll since results can span multiple pages
  const {
    data: searchPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingSearch,
    isError,
  } = useInfiniteQuery({
    queryKey: ['search-products', debouncedQuery],
    queryFn: ({ pageParam = 1 }) =>
      searchProducts(debouncedQuery, pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    enabled: isSearching,
  });

  const searchResults =
    searchPages?.pages.flatMap((page) => page.data) || [];
  const suggestedResults = suggestedData?.data || [];
  const results = isSearching ? searchResults : suggestedResults;

  return {
    query,
    setQuery,
    results,
    isSearching,
    isLoading: isSearching ? isLoadingSearch : isLoadingSuggestions,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    debouncedQuery,
  };
}
