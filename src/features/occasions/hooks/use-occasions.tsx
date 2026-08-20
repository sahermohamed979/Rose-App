'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { IPaginationResponse } from '@/shared/lib/types/api';
import { GetOccasionsParams } from '../types/occasions-type';
import { getOccasions } from '../apis/get-occasions.api';
import { OccasionType } from '@/shared/lib/types/product-types';

export const OCCASIONS_QUERY_KEY = ['occasions'] as const;

export const useOccasions = (params: GetOccasionsParams = {}) => {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';

  return useQuery<IPaginationResponse<OccasionType>>({
    queryKey: [...OCCASIONS_QUERY_KEY, params],
    queryFn: async (): Promise<IPaginationResponse<OccasionType>> => {
      const response = await getOccasions(params);

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
