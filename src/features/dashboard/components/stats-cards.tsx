import { getLocale, getTranslations } from 'next-intl/server';
import {
  Package,
  ClipboardList,
  LayoutGrid,
  CircleDollarSign,
} from 'lucide-react';
import { StatisticsSummary } from '../types/statistics.types';
import {
  formatNumber,
  formatCurrency,
} from '@/shared/lib/utils/formatter';

interface StatsCardsProps {
  summary: StatisticsSummary;
}

export default async function StatsCards({
  summary,
}: StatsCardsProps) {
  const locale = await getLocale();
  const t = await getTranslations('dashboard.overviewPage');

  const cards = [
    {
      id: 'total-products',
      value: formatNumber(summary.totalProducts, locale),
      label: t('totalProducts'),
      icon: Package,
      iconBg: 'bg-bg-primary-fade',
      iconColor: 'text-text-primary',
      valueColor: 'text-text-plain',
    },
    {
      id: 'total-orders',
      value: formatNumber(summary.totalOrders, locale),
      label: t('totalOrders'),
      icon: ClipboardList,
      iconBg: 'bg-bg-info-fade',
      iconColor: 'text-text-info',
      valueColor: 'text-text-info',
    },
    {
      id: 'total-categories',
      value: formatNumber(summary.totalCategories, locale),
      label: t('totalCategories'),
      icon: LayoutGrid,
      iconBg: 'bg-bg-secondary-fade',
      iconColor: 'text-text-secondary',
      valueColor: 'text-text-plain',
    },
    {
      id: 'total-revenue',
      value: formatCurrency(summary.totalRevenue, locale),
      label: t('totalRevenue'),
      icon: CircleDollarSign,
      iconBg: 'bg-bg-success-fade',
      iconColor: 'text-text-success',
      valueColor: 'text-text-success',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:gap-4 h-full">
      {cards.map(
        ({
          id,
          value,
          label,
          icon: Icon,
          iconBg,
          iconColor,
          valueColor,
        }) => (
          <div
            key={id}
            className="bg-bg-plain rounded-xl border border-border-subtle p-4 shadow-subtle flex flex-col justify-between gap-3"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}
            >
              <Icon size={20} className={iconColor} />
            </div>
            <div>
              <p
                className={`text-xl font-bold leading-tight md:text-2xl ${valueColor}`}
              >
                {value}
              </p>
              <p className="text-text-soft text-sm mt-0.5">{label}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
