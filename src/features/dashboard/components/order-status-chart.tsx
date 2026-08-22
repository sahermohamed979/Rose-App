'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { OrderStatusBreakdown } from '../types/statistics.types';
import { formatNumber } from '@/shared/lib/utils/formatter';

interface OrderStatusChartProps {
  orderStatus: OrderStatusBreakdown;
}

interface CustomizedLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
  locale?: string;
}

const createCustomBadgeLabel = (locale: string) => {
  return function renderCustomBadgeLabel({
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius = 0,
    outerRadius = 0,
    percent = 0,
  }: CustomizedLabelProps) {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (!percent || percent < 0.04) return null;

    return (
      <g>
        <circle
          cx={x}
          cy={y}
          r={15}
          fill="var(--bg-plain)"
          stroke="var(--border-subtle)"
          strokeWidth={1}
          className="drop-shadow-sm"
        />
        <text
          x={x}
          y={y}
          fill="var(--text-plain)"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={10}
          fontWeight="700"
        >
          {`${formatNumber(Math.round(percent * 100), locale)}%`}
        </text>
      </g>
    );
  };
};

export default function OrderStatusChart({
  orderStatus,
}: OrderStatusChartProps) {
  const locale = useLocale();
  const t = useTranslations('dashboard.overviewPage');

  const total =
    orderStatus.completed +
    orderStatus.inProgress +
    orderStatus.cancelled;

  const pct = (n: number) =>
    total > 0 ? Math.round((n / total) * 100) : 0;

  const data = [
    {
      key: 'completed',
      label: t('completed'),
      value: orderStatus.completed,
      percentage: pct(orderStatus.completed),
      color: '#00bc7d',
    },
    {
      key: 'inProgress',
      label: t('inProgress'),
      value: orderStatus.inProgress,
      percentage: pct(orderStatus.inProgress),
      color: '#2b7fff',
    },
    {
      key: 'cancelled',
      label: t('cancelled'),
      value: orderStatus.cancelled,
      percentage: pct(orderStatus.cancelled),
      color: '#ef4444',
    },
  ];

  return (
    <div className="bg-bg-plain rounded-2xl border border-border-subtle shadow-subtle p-6 flex flex-col justify-between items-center h-full gap-6">
      {/* Title */}
      <h2 className="text-text-plain text-xl font-bold text-center w-full">
        {t('orderStatus')}
      </h2>

      {/* Donut Chart with badges */}
      <div className="relative h-48 w-48 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={46}
              outerRadius={78}
              paddingAngle={0}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              strokeWidth={0}
              label={createCustomBadgeLabel(locale)}
              labelLine={false}
            >
              {data.map((entry) => (
                <Cell key={entry.key} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(
                value: number | string | readonly (number | string)[] | undefined,
                name: string | number | undefined
              ) => [
                `${formatNumber(Number(value) || 0, locale)} (${formatNumber(pct(Number(value) || 0), locale)}%)`,
                String(name ?? ''),
              ]}
              contentStyle={{
                background: 'var(--bg-plain)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                color: 'var(--text-plain)',
                fontSize: '12px',
                boxShadow: 'var(--shadow-soft)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Column */}
      <div className="flex flex-col gap-3 w-full">
        {data.map((entry) => (
          <div
            key={entry.key}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{ background: entry.color }}
              />
              <span className="text-text-plain font-medium">
                {entry.label}
              </span>
            </div>
            <span className="text-text-plain font-bold">
              {formatNumber(entry.value, locale)}{' '}
              <span className="text-text-soft font-medium">
                ({formatNumber(entry.percentage, locale)}%)
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
