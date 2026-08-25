'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/shared/lib/utils/utils';
import {
  RevenueDataPoint,
  RevenuePeriod,
} from '../types/statistics.types';
import { formatNumber, formatCurrency } from '@/shared/lib/utils/formatter';
import { useRevenueChart } from '../hooks/use-revenue-chart';

interface RevenueChartProps {
  revenueChart?: RevenueDataPoint[];
  currency?: string;
  initialPeriod?: RevenuePeriod;
  onPeriodChange?: (
    period: RevenuePeriod
  ) => Promise<{ status: boolean; revenueChart: RevenueDataPoint[]; message?: string } | RevenueDataPoint[]>;
}

const PERIODS: {
  value: RevenuePeriod;
  labelKey: 'monthly' | 'lastWeek';
}[] = [
  { value: 'monthly', labelKey: 'monthly' },
  { value: 'week', labelKey: 'lastWeek' },
];

export default function RevenueChart({
  revenueChart = [],
  currency = 'EGP',
  initialPeriod = 'monthly',
}: RevenueChartProps) {
  const locale = useLocale();
  const t = useTranslations('dashboard.overviewPage');
  const { period, setPeriod, data, isFetching } = useRevenueChart(
    initialPeriod,
    revenueChart
  );

  function handlePeriodChange(newPeriod: RevenuePeriod) {
    if (newPeriod === period) return;
    setPeriod(newPeriod);
  }

  const translatedData = (data && data.length > 0 ? data : []).map((item) => {
    let label = item.label;
    const cleanLabel = String(item.label || '').trim();
    const shortLabel = cleanLabel.slice(0, 3);
    const capitalizedShort =
      shortLabel.charAt(0).toUpperCase() + shortLabel.slice(1).toLowerCase();

    if (t.has(`months.${cleanLabel}`)) {
      label = t(`months.${cleanLabel}`);
    } else if (t.has(`months.${capitalizedShort}`)) {
      label = t(`months.${capitalizedShort}`);
    } else if (t.has(`days.${cleanLabel}`)) {
      label = t(`days.${cleanLabel}`);
    } else if (t.has(`days.${capitalizedShort}`)) {
      label = t(`days.${capitalizedShort}`);
    }

    const value =
      typeof item.value === 'number'
        ? item.value
        : typeof (item as { revenue?: number }).revenue === 'number'
          ? (item as { revenue?: number }).revenue!
          : 0;

    return {
      ...item,
      label,
      value,
    };
  });

  return (
    <div className="bg-bg-plain rounded-2xl border border-border-subtle shadow-subtle p-6 flex flex-col justify-between h-full gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-text-plain text-xl font-bold">
          {t('revenue')}
        </h2>

        {/* Period Toggle */}
        <div className="flex items-center gap-1">
          {PERIODS.map(({ value, labelKey }) => (
            <button
              key={value}
              id={`revenue-period-${value}`}
              onClick={() => handlePeriodChange(value)}
              disabled={isFetching}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-semibold transition-colors cursor-pointer',
                period === value
                  ? 'text-text-primary bg-bg-primary-fade font-bold'
                  : 'text-text-soft hover:text-text-plain'
              )}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Chart or Empty state */}
      {translatedData.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[220px] text-text-soft text-sm">
          <p>{t('noRevenueData')}</p>
        </div>
      ) : (
        <div
          className={cn(
            'flex-1 min-h-[220px] w-full transition-opacity duration-200',
            isFetching && 'opacity-50'
          )}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={translatedData}
              margin={{ top: 16, right: 8, left: -16, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--maroon-400)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--maroon-400)"
                    stopOpacity={0.03}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border-subtle)"
              />

              <XAxis
                dataKey="label"
                tick={{ fill: 'var(--text-soft)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                dy={4}
              />

              <YAxis
                tick={{ fill: 'var(--text-soft)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => formatNumber(v, locale)}
              />

              <Tooltip
                contentStyle={{
                  background: 'var(--bg-plain)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  color: 'var(--text-plain)',
                  fontSize: '12px',
                  boxShadow: 'var(--shadow-soft)',
                }}
                formatter={(
                  value: number | string | readonly (number | string)[] | undefined
                ) => [
                  formatCurrency(Number(value || 0), locale),
                  t('revenue'),
                ]}
                cursor={{
                  stroke: 'var(--text-primary)',
                  strokeWidth: 1,
                }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--maroon-400)"
                strokeWidth={2}
                fill="url(#revenueGradient)"
                dot={(props: { cx?: number; cy?: number; value?: number }) => {
                  const { cx = 0, cy = 0, value = 0 } = props;
                  const validValues = data.map((d) => d.value || 0);
                  const maxValue =
                    validValues.length > 0 ? Math.max(...validValues) : 0;
                  if (value === maxValue && maxValue > 0) {
                    return (
                      <g key={`peak-dot-${cx}-${cy}`}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={5}
                          fill="#a6252a"
                          stroke="#ffffff"
                          strokeWidth={2}
                        />
                        <text
                          x={cx}
                          y={cy - 10}
                          fill="#a6252a"
                          textAnchor="middle"
                          fontSize={11}
                          fontWeight="bold"
                        >
                          {formatCurrency(value, locale)}
                        </text>
                      </g>
                    );
                  }
                  return <g key={`dot-${cx}-${cy}`} />;
                }}
                activeDot={{
                  r: 5,
                  fill: 'var(--maroon-500)',
                  stroke: 'var(--bg-plain)',
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
