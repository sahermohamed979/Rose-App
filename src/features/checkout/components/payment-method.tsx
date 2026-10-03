'use client';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/shared/components/ui/radio-group';
import { cn } from '@/shared/lib/utils/utils';
import { Label } from '@/shared/components/ui/label';
import {
  PaymentMethodProps,
  PaymentMethodType,
} from '../types/payment-types';

export default function PaymentMethod({
  paymentMethod,
  onPaymentChange,
  onBack,
  isLoading,
}: PaymentMethodProps) {
  // Translations
  const t = useTranslations('checkout');

  const paymentMethods = [
    {
      value: 'CASH' as PaymentMethodType,
      id: 'cash',
      title: t('cashOnDelivery'),
      description: t('cashP'),
      image: '/cash.svg',
    },
    {
      value: 'CARD' as PaymentMethodType,
      id: 'card',
      title: t('creditCard'),
      description: t('creditP'),
      image: '/credit.svg',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="font-semibold bg-bg-muted flex items-center gap-1 p-2 rounded-md text-sm hover:bg-bg-subtle transition-colors"
        >
          <ArrowLeft size={20} className="rtl:rotate-180" />
          {t('back')}
        </button>

        <h1 className="text-3xl font-semibold">{t('step2Title')}</h1>
      </div>

      {/* Payment Options */}
      <RadioGroup
        value={paymentMethod ?? ''}
        onValueChange={(value) =>
          onPaymentChange(value as PaymentMethodType)
        }
        disabled={isLoading}
        className="flex flex-col sm:flex-row gap-4"
      >
        {paymentMethods.map((method) => {
          const isSelected = paymentMethod === method.value;

          return (
            <Label
              key={method.value}
              htmlFor={method.id}
              className={cn(
                'border rounded-2xl cursor-pointer p-6 flex flex-col items-center gap-3 flex-1 transition-all relative',
                isSelected
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5 dark:bg-primary/10 shadow-sm'
                  : 'border-border-soft bg-card hover:bg-bg-subtle hover:border-border-strong',
                isLoading && 'pointer-events-none opacity-60'
              )}
            >
              <RadioGroupItem
                value={method.value}
                id={method.id}
                className="peer sr-only"
              />

              <Image
                src={method.image}
                alt={method.title}
                width={195}
                height={195}
                className="dark:brightness-0 dark:invert transition-transform group-hover:scale-105"
              />

              <h2
                className={cn(
                  'font-semibold text-2xl transition-colors',
                  isSelected ? 'text-primary' : 'text-text-primary'
                )}
              >
                {method.title}
              </h2>

              <p className="text-sm text-text-muted text-center leading-relaxed">
                {method.description}
              </p>
            </Label>
          );
        })}
      </RadioGroup>
    </div>
  );
}
