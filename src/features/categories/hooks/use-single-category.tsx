'use client';

import { useQuery } from '@tanstack/react-query';
import { CategoryWithCount } from '../types/categories-type';
import { getCategory } from '../apis/get-single-category.api';

export const useCategory = (id: string) => {
  return useQuery<CategoryWithCount>({
    queryKey: ['categories', id],
    queryFn: async () => {
      const response = await getCategory(id);
      if (!response.status) {
        throw new Error(response.message);
      }
      return response.payload.category;
    },
    enabled: !!id,
  });
};
