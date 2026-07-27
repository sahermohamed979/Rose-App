'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useTranslations } from 'next-intl';
import {
  subscribeSchema,
  SubscribeFormValues,
} from '../schemas/subscribe.schema';
import useSubscribe from '../hooks/use-subscribe';
import { cn } from '@/shared/lib/utils/utils';

export default function FooterNewsletter() {
  const t = useTranslations('footer.newsletter');

  // --- Hooks & Form Setup ---
  const { subscribe, isPending, subscribeSuccess, subscribeError } =
    useSubscribe();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { email: '' },
    mode: 'onBlur',
  });

  const { onBlur: onEmailBlur, ...emailRegister } = register('email');

  // ---Submit Handlers ---
  const onSubmit = (values: SubscribeFormValues) => {
    subscribe(values, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Headings */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-text-secondary">
          {t('title1')}{' '}
          <span className="text-text-inverse">
            {t('titleHighlight')}
          </span>{' '}
          {t('title2')}
        </h3>
        <p className="text-sm text-text-soft">{t('subtitle')}</p>
      </div>

      {/* Subscription Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full max-w-md"
      >
        <div
          className={cn(
            'relative w-full md:w-96 flex items-center bg-zinc-500 dark:bg-maroon-800 rounded-full border border-transparent',
            'transition-colors focus-within:border-border-primary overflow-hidden'
          )}
        >
          <Input
            {...emailRegister}
            onBlur={onEmailBlur}
            type="email"
            placeholder={t('emailPlaceholder')}
            className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:border-transparent hover:border-transparent hover:shadow-none hover:ring-0 px-4 text-sm text-white placeholder:text-text-muted"
            disabled={isPending}
          />
          <Button
            type="submit"
            loading={isPending}
            className="h-11 rounded-full bg-bg-primary-fade text-text-primary hover:text-text-primary-faint hover:bg-bg-primary-faint dark:hover:text-white dark:hover:bg-maroon-700 px-6 font-medium gap-2"
          >
            {t('subscribe')}{' '}
            <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
          </Button>
        </div>

        {/* Error / Success Messages */}
        {errors.email && (
          <span className="text-xs text-text-danger px-4">
            {errors.email.message}
          </span>
        )}
        {subscribeError && (
          <span className="text-xs text-text-danger px-4">
            {subscribeError}
          </span>
        )}
        {subscribeSuccess && (
          <span className="text-xs text-text-success px-4">
            {t('successMessage')}
          </span>
        )}
      </form>
    </div>
  );
}
