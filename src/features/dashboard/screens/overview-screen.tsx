import { getTranslations } from 'next-intl/server';
import { getStatistics } from '../api/statistics-service';
import { fetchRevenuePeriod } from '../actions/statistics.actions';
import StatsCards from '../components/stats-cards';
import AllCategories from '../components/all-categories';
import OrderStatusChart from '../components/order-status-chart';
import RevenueChart from '../components/revenue-chart';

export default async function OverviewScreen() {
  const t = await getTranslations('dashboard.overviewPage');

  const result = await getStatistics({ revenuePeriod: 'monthly' });
  // console.log(result);
  if (!result.status) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-text-danger text-base font-medium">
          {t('loadError')}
        </p>
        <p className="text-text-soft text-sm">{result.message}</p>
      </div>
    );
  }

  const { summary, categories, orderStatus, revenueChart } =
    result.payload;

  const orderStatusData = orderStatus ?? {
    completed: 0,
    inProgress: 0,
    cancelled: 0,
  };

  const revenueData = revenueChart ?? [];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-stretch">
        <StatsCards summary={summary} />
        <AllCategories categories={categories} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-stretch">
        <div className="lg:col-span-4 flex flex-col">
          <OrderStatusChart orderStatus={orderStatusData} />
        </div>
        <div className="lg:col-span-8 flex flex-col">
          <RevenueChart
            revenueChart={revenueData}
            currency={summary.currency}
            initialPeriod="monthly"
            onPeriodChange={fetchRevenuePeriod}
          />
        </div>
      </div>
    </div>
  );
}
