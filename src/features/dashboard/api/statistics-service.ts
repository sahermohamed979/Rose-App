'use server';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import { HEADERS } from '@/shared/lib/constants/api.constants';
import { RESPONSES } from '@/shared/lib/constants/response.constant';
import { ApiResponse } from '@/shared/lib/types/api';
import {
  StatisticsPayload,
  StatisticsQueryParams,
  RevenueDataPoint,
} from '../types/statistics.types';

export async function getStatistics(
  params?: StatisticsQueryParams
): Promise<
  | { status: true; payload: StatisticsPayload }
  | { status: false; message: string; code?: number }
> {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }

  try {
    const searchParams = new URLSearchParams();

    if (params?.revenuePeriod) {
      searchParams.set('revenuePeriod', params.revenuePeriod);
    }
    if (params?.lowStockThreshold !== undefined) {
      searchParams.set(
        'lowStockThreshold',
        String(params.lowStockThreshold)
      );
    }
    if (params?.topProductsLimit !== undefined) {
      searchParams.set(
        'topProductsLimit',
        String(params.topProductsLimit)
      );
    }
    if (params?.lowStockLimit !== undefined) {
      searchParams.set('lowStockLimit', String(params.lowStockLimit));
    }

    const query = searchParams.toString();
    const url = `${process.env.NEXT_API_URL}/admin/statistics${query ? `?${query}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...HEADERS.authorization(token.accessToken),
      },
      next: { revalidate: 60 },
    });

    const data: ApiResponse<StatisticsPayload> =
      await response.json();

    if (!data.status) {
      return {
        status: false,
        message: data.message ?? 'Failed to fetch statistics',
        code: response.status,
      };
    }

    const rawPayload = data.payload;
    const rawPoints =
      rawPayload.revenue?.points ??
      (rawPayload as { revenueChart?: unknown[] }).revenueChart ??
      [];

    const normalizedRevenueChart: RevenueDataPoint[] = rawPoints.map(
      (pt: unknown) => {
        const point = pt as {
          label?: string;
          period?: string;
          revenue?: number;
          value?: number;
        };
        return {
          label: point.label ?? point.period ?? '',
          value:
            typeof point.revenue === 'number'
              ? point.revenue
              : typeof point.value === 'number'
                ? point.value
                : 0,
          period: point.period,
        };
      }
    );

    return {
      status: true,
      payload: {
        ...rawPayload,
        revenueChart: normalizedRevenueChart,
      },
    };
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred',
      code: 500,
    };
  }
}
