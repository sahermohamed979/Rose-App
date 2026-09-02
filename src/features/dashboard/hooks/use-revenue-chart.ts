'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRevenuePeriod } from '../actions/statistics.actions';
import { RevenueDataPoint, RevenuePeriod } from '../types/statistics.types';

export const REVENUE_QUERY_KEY = (period: RevenuePeriod) =>
  ['dashboard', 'statistics', 'revenue', period] as const;

export function useRevenueChart(
  initialPeriod: RevenuePeriod = 'monthly',
  initialData?: RevenueDataPoint[]
) {
  const [period, setPeriod] = useState<RevenuePeriod>(initialPeriod);

  const query = useQuery({
    queryKey: REVENUE_QUERY_KEY(period),
    queryFn: async () => {
      const res = await fetchRevenuePeriod(period);
      if (res && typeof res === 'object' && 'revenueChart' in res) {
        return res.revenueChart;
      }
      if (Array.isArray(res)) {
        return res;
      }
      return [];
    },
    initialData:
      period === initialPeriod && initialData && initialData.length > 0
        ? initialData
        : undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  return {
    period,
    setPeriod,
    data: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
