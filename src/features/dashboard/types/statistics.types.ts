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

export interface OrderStatusBreakdown {
  completed: number;
  inProgress: number;
  cancelled: number;
}

export interface RevenueDataPoint {
  label: string;
  value: number;
}

export interface StatisticsPayload {
  summary: StatisticsSummary;
  categories: StatisticsCategory[];
  orderStatus?: OrderStatusBreakdown;
  revenueChart?: RevenueDataPoint[];
}

export type RevenuePeriod = 'monthly' | 'week';

export interface StatisticsQueryParams {
  revenuePeriod?: RevenuePeriod;
  lowStockThreshold?: number;
  topProductsLimit?: number;
  lowStockLimit?: number;
}
