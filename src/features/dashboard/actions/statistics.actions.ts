'use server';

import { getStatistics } from '../api/statistics-service';
import {
  RevenueDataPoint,
  RevenuePeriod,
} from '../types/statistics.types';

export async function fetchRevenuePeriod(
  period: RevenuePeriod
): Promise<{
  status: boolean;
  revenueChart: RevenueDataPoint[];
  message?: string;
}> {
  try {
    const result = await getStatistics({ revenuePeriod: period });
    if (result.status) {
      return {
        status: true,
        revenueChart: Array.isArray(result.payload?.revenueChart)
          ? result.payload.revenueChart
          : [],
      };
    }
    return {
      status: false,
      revenueChart: [],
      message: result.message || 'Failed to fetch statistics',
    };
  } catch (error) {
    return {
      status: false,
      revenueChart: [],
      message:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred',
    };
  }
}
