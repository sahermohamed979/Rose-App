'use server';

import { getStatistics } from '../api/statistics-service';
import {
  RevenueDataPoint,
  RevenuePeriod,
} from '../types/statistics.types';

export async function fetchRevenuePeriod(
  period: RevenuePeriod
): Promise<RevenueDataPoint[]> {
  const result = await getStatistics({ revenuePeriod: period });
  // console.log(result);
  if (!result.status) {
    return [];
  }

  return result.payload.revenueChart ?? [];
}
