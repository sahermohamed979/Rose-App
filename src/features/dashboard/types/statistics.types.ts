export interface StatisticsSummary {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
  currency: string;
}

export interface StatisticsCategory {
  id: string;
  title: string;
  productCount: number;
}

export interface OrderStatusMetric {
  count: number;
  percent: number;
}

export interface OrderStatusBreakdown {
  completed: number | OrderStatusMetric;
  inProgress: number | OrderStatusMetric;
  cancelled?: number | OrderStatusMetric;
  canceled?: number | OrderStatusMetric;
  totalOrders?: number;
}

export interface RevenuePoint {
  period?: string;
  label: string;
  revenue?: number;
  value?: number;
}

export interface RevenuePayload {
  period?: string;
  points: RevenuePoint[];
}

export interface RevenueDataPoint {
  label: string;
  value: number;
  period?: string;
}

export interface StatisticsPayload {
  summary: StatisticsSummary;
  categories: StatisticsCategory[];
  orderStatus?: OrderStatusBreakdown;
  revenue?: RevenuePayload;
  revenueChart?: RevenueDataPoint[];
}

export type RevenuePeriod = 'monthly' | 'week';

export interface StatisticsQueryParams {
  revenuePeriod?: RevenuePeriod;
  lowStockThreshold?: number;
  topProductsLimit?: number;
  lowStockLimit?: number;
}
