import { ArrowLeft, LoaderCircle, MoveRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/shared/components/ui/radio-group';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils/utils';
import { Label } from '@/shared/components/ui/label';

export type PaymentMethodType = 'CASH' | 'CARD';
interface PaymentMethodProps {
  paymentMethod: PaymentMethodType | null;
  onPaymentChange: (value: PaymentMethodType) => void;
  onBack: () => void;
  onCheckout: () => void;
  isLoading: boolean;
}
export default function PaymentMethod({
  paymentMethod,
  onPaymentChange,
  onBack,
  onCheckout,
  isLoading,
}: PaymentMethodProps) {
  const t = useTranslations('checkout');

  const paymentMethods = [
    {
      value: 'CASH' as PaymentMethodType,
      id: 'cash',
      title: t('cashOnDeleviry'),
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
          onClick={onBack}
          className="font-semibold bg-bg-muted flex items-center gap-1 p-2 rounded-md text-sm"
        >
          <ArrowLeft size={20} className="rtl:rotate-180" />
          {t('back')}
        </button>

        <h1 className="text-3xl font-semibold">{t('step2Title')}</h1>
      </div>

      <RadioGroup
        value={paymentMethod}
        onValueChange={(value) =>
          onPaymentChange(value as PaymentMethodType)
        }
        disabled={isLoading}
        className="flex gap-4"
      >
        {paymentMethods.map((method) => (
          <Label
            key={method.value}
            htmlFor={method.id}
            className={cn(
              'border border-border-soft rounded-md cursor-pointer hover:bg-bg-subtle p-4 flex flex-col items-center gap-3 w-1/2 transition-all ',
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
            />
            <h2
              className={cn(
                'font-semibold text-2xl',
                paymentMethod === method.value && 'text-text-primary'
              )}
            >
              {method.title}
            </h2>

            <p className="text-sm text-text-default text-center">
              {method.description}
            </p>
          </Label>
        ))}
      </RadioGroup>

      {/* Checkout Button */}
      <div className="mt-3 border-t flex justify-end ">
        <Button
          className="bg-bg-primary-saturated mt-3 px-4 py-2.5 gap-2.5 rounded-xl text-text-inverse  flex flex-row"
          onClick={onCheckout}
          disabled={!paymentMethod || isLoading}
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              {t('checkout')}
              <MoveRight className="ml-2 rtl:rotate-180" size={18} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
