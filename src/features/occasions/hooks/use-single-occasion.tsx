'use client';

import { useQuery } from '@tanstack/react-query';
import { getOccasion } from '../apis/get-single-occasion.api';
import { OccasionType } from '@/shared/lib/types/product-types';

export const useOccasion = (id: string) => {
  return useQuery<OccasionType>({
    queryKey: ['occasions', id],
    queryFn: async () => {
      const response = await getOccasion(id);
      if (!response.status) {
        throw new Error(response.message);
      }
      return response.payload.occasion;
    },
    enabled: !!id,
  });
};
