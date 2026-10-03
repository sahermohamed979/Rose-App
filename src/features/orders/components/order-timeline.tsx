'use client';

import { useTranslations } from 'next-intl';
import {
  Check,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  XCircle,
} from 'lucide-react';

interface OrderTimelineProps {
  status:
    | 'PENDING'
    | 'PROCESSING'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'CANCELLED'
    | string;
}

export function OrderTimeline({ status }: OrderTimelineProps) {
  // Translations
  const t = useTranslations('orders');

  // Cancelled State
  if (status === 'CANCELLED') {
    return (
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400">
        <XCircle className="size-6 shrink-0" />
        <div>
          <h4 className="font-semibold text-sm">
            {t('timeline.cancelled')}
          </h4>
          <p className="text-xs opacity-90">
            {t('statuses.cancelled')}
          </p>
        </div>
      </div>
    );
  }

  // Steps definition
  const steps = [
    {
      key: 'placed',
      label: t('timeline.placed'),
      icon: Clock,
      stepNumber: 1,
    },
    {
      key: 'processing',
      label: t('timeline.processing'),
      icon: Package,
      stepNumber: 2,
    },
    {
      key: 'shipped',
      label: t('timeline.shipped'),
      icon: Truck,
      stepNumber: 3,
    },
    {
      key: 'delivered',
      label: t('timeline.delivered'),
      icon: CheckCircle2,
      stepNumber: 4,
    },
  ];

  // Resolve current step
  const getActiveStepNumber = () => {
    switch (status) {
      case 'PENDING':
        return 1;
      case 'PROCESSING':
        return 2;
      case 'SHIPPED':
        return 3;
      case 'DELIVERED':
        return 4;
      default:
        return 1;
    }
  };

  const activeStep = getActiveStepNumber();

  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-border-muted/80 bg-card shadow-xs">
      <h3 className="text-xs sm:text-sm font-semibold text-text-muted uppercase tracking-wider mb-6">
        {t('orderTimeline')}
      </h3>

      <div className="relative flex items-center justify-between">
        {/* Progress connecting line */}
        <div
          aria-hidden="true"
          className="absolute top-5 inset-x-8 sm:inset-x-12 h-1 bg-bg-muted -z-0"
        >
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{
              width: `${((activeStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Step Items */}
        {steps.map((step) => {
          const isDone = activeStep > step.stepNumber;
          const isCurrent = activeStep === step.stepNumber;
          const StepIcon = step.icon;

          return (
            <div
              key={step.key}
              className="relative z-10 flex flex-col items-center text-center flex-1"
            >
              <div
                className={`size-10 sm:size-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDone
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : isCurrent
                      ? 'bg-card text-primary border-2 border-primary ring-4 ring-primary/10 shadow-xs'
                      : 'bg-card text-text-muted border-2 border-border-muted'
                }`}
              >
                {isDone ? (
                  <Check className="size-5" />
                ) : (
                  <StepIcon className="size-5" />
                )}
              </div>

              <span
                className={`mt-2.5 text-xs sm:text-sm font-medium line-clamp-1 max-w-[80px] sm:max-w-[120px] ${
                  isCurrent
                    ? 'text-primary font-bold'
                    : isDone
                      ? 'text-text-primary'
                      : 'text-text-muted'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
