'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { IPaginationResponse } from '@/shared/lib/types/api';
import { getCategories } from '../apis/get-categories.api';
import {
  CategoryWithCount,
  GetCategoriesParams,
} from '../types/categories-type';

export const CATEGORIES_QUERY_KEY = ['categories'] as const;

export const useCategories = (params: GetCategoriesParams = {}) => {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';

  return useQuery<IPaginationResponse<CategoryWithCount>>({
    queryKey: [...CATEGORIES_QUERY_KEY, params],
    queryFn: async (): Promise<
      IPaginationResponse<CategoryWithCount>
    > => {
      const response = await getCategories(params);

      if (!response.status) {
        throw new Error(response.message);
      }

      return response.payload;
    },
    enabled: status === 'authenticated' && isAdmin,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};
