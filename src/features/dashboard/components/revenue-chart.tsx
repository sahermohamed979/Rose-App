'use client';

import { useState, useTransition } from 'react';
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

interface RevenueChartProps {
  revenueChart: RevenueDataPoint[];
  currency: string;
  initialPeriod?: RevenuePeriod;
  onPeriodChange?: (
    period: RevenuePeriod
  ) => Promise<RevenueDataPoint[]>;
}

const PERIODS: {
  value: RevenuePeriod;
  labelKey: 'monthly' | 'lastWeek';
}[] = [
  { value: 'monthly', labelKey: 'monthly' },
  { value: 'week', labelKey: 'lastWeek' },
];

export default function RevenueChart({
  revenueChart,
  currency,
  initialPeriod = 'monthly',
  onPeriodChange,
}: RevenueChartProps) {
  const locale = useLocale();
  const t = useTranslations('dashboard.overviewPage');
  const [period, setPeriod] = useState<RevenuePeriod>(initialPeriod);
  const [data, setData] = useState<RevenueDataPoint[]>(revenueChart);
  const [isPending, startTransition] = useTransition();

  function handlePeriodChange(newPeriod: RevenuePeriod) {
    if (newPeriod === period) return;

    startTransition(async () => {
      setPeriod(newPeriod);
      if (onPeriodChange) {
        const newData = await onPeriodChange(newPeriod);
        setData(newData);
      }
    });
  }

  const translatedData = data.map((item) => {
    let label = item.label;
    if (t.has(`months.${item.label}`)) {
      label = t(`months.${item.label}`);
    } else if (t.has(`days.${item.label}`)) {
      label = t(`days.${item.label}`);
    }
    return {
      ...item,
      label,
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
              disabled={isPending}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-semibold transition-colors',
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

      {/* Chart */}
      <div
        className={cn(
          'flex-1 min-h-[220px] w-full transition-opacity duration-200',
          isPending && 'opacity-50'
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
                const maxValue = Math.max(...data.map((d) => d.value));
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
    </div>
  );
}
