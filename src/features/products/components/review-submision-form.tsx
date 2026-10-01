'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Loader, Lock, Star } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import SubmissionFormSchema from '../schemas/submission-form-schema';
import useCreateProductReviewHook from '../hooks/use-create-product-review';

interface ReviewData {
  headline: string;
  content: string;
  rating: number;
}

export function ReviewSubmissionForm() {
  // Translation
  const t = useTranslations('reviewForm');
  const tLogin = useTranslations('login');

  // Navigation
  const { productId } = useParams();

  // Context
  const { status } = useSession();
  const isLoading = status === 'loading';
  const isLoggedIn = status === 'authenticated';

  // Hooks
  const formSchema = SubmissionFormSchema();
  const { mutate, isError, isPending, errorMsg, IsSuccess } =
    useCreateProductReviewHook();

  // Form & validation
  const form = useForm<ReviewData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headline: '',
      content: '',
      rating: 0,
    },
  });

  // Functions
  function onSubmit(data: ReviewData) {
    const formData = {
      ...data,
      productId: String(productId),
    };
    mutate(formData);
  }

  // Effects
  React.useEffect(() => {
    if (IsSuccess) {
      form.reset();
      toast.success('Review submitted successfully! 🎉');
    }
  }, [IsSuccess, form]);

  return (
    <Card className="w-full min-w-0 relative overflow-hidden rounded-2xl border border-border-subtle bg-card/60 p-4 sm:p-6 shadow-xs ring-0">
      <CardContent className="p-0">
        <form
          id="form-rhf-demo"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-5"
        >
          {/* Header */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-text-primary">
              {t('submit')}
            </h3>
          </div>

          <FieldGroup className="gap-4 sm:gap-5 w-full min-w-0">
            {/* Rating */}
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 w-full">
              <span className="text-sm sm:text-base font-medium text-text-primary">
                {t('yourRating')}:
              </span>
              <Controller
                name="rating"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <div
                      className="flex items-center gap-1 sm:gap-1.5"
                      role="group"
                      aria-label={t('yourRating')}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          disabled={!isLoggedIn || isPending}
                          onClick={() => field.onChange(star)}
                          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                          className="p-1 -m-0.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500 transition-transform hover:scale-110 active:scale-95 disabled:cursor-not-allowed"
                        >
                          <Star
                            fill={
                              star <= field.value ? '#F2A93D' : 'none'
                            }
                            color="#F2A93D"
                            className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
                          />
                        </button>
                      ))}
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                )}
              />
            </div>

            {/* Headline */}
            <Controller
              name="headline"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-1.5 sm:gap-2 w-full min-w-0"
                >
                  <FieldLabel
                    htmlFor="form-rhf-demo-title"
                    className="text-sm sm:text-base font-medium text-text-primary"
                  >
                    {t('title')}
                  </FieldLabel>
                  <Input
                    disabled={!isLoggedIn || isPending}
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder={t('titlePlaceholder')}
                    autoComplete="off"
                    className="h-10 sm:h-11 w-full text-sm sm:text-base rounded-xl border-border-subtle focus-visible:ring-maroon-500"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Content */}
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-1.5 sm:gap-2 w-full min-w-0"
                >
                  <FieldLabel
                    htmlFor="form-rhf-demo-description"
                    className="text-sm sm:text-base font-medium text-text-primary"
                  >
                    {t('review')}
                  </FieldLabel>
                  <Textarea
                    disabled={!isLoggedIn || isPending}
                    {...field}
                    id="form-rhf-demo-description"
                    placeholder={t('reviewPlaceholder')}
                    rows={4}
                    className="min-h-24 sm:min-h-28 w-full resize-none text-sm sm:text-base rounded-xl border-border-subtle focus-visible:ring-maroon-500"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      {/* Error Message */}
      {isError && (
        <p className="mt-3 text-center text-xs sm:text-sm text-text-danger">
          {errorMsg}
        </p>
      )}

      {/* Submit Button */}
      <CardFooter className="p-0 border-t-0 bg-transparent mt-4 sm:mt-5">
        <Button
          disabled={!isLoggedIn || isPending}
          type="submit"
          form="form-rhf-demo"
          className="w-full h-11 sm:h-12 text-sm sm:text-base font-semibold rounded-xl bg-maroon-600 hover:bg-maroon-700 text-white shadow-sm transition-all duration-200 active:scale-[0.99] disabled:opacity-50"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              <span>{t('submitting')}</span>
            </span>
          ) : (
            t('submit')
          )}
        </Button>
      </CardFooter>

      {/* Login Required Overlay */}
      {!isLoading && !isLoggedIn && (
        <Link
          href="/login"
          className="absolute inset-0 z-20 rounded-2xl bg-bg-surface/85 dark:bg-bg-default/85 backdrop-blur-[2px] flex items-center justify-center p-4 sm:p-6 text-center group cursor-pointer transition-all duration-200"
        >
          <div className="w-full max-w-[280px] sm:max-w-xs space-y-3 p-4 sm:p-5 rounded-xl bg-bg-elevated border border-border-subtle shadow-md transition-transform duration-200 group-hover:scale-105">
            <div className="mx-auto w-10 h-10 rounded-full bg-maroon-100 dark:bg-maroon-950/60 flex items-center justify-center text-maroon-600 dark:text-maroon-400">
              <Lock className="w-5 h-5" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-text-primary leading-snug">
              {t('loginRequired')}
            </p>
            <span className="inline-flex items-center justify-center w-full px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-maroon-600 group-hover:bg-maroon-700 text-white transition-colors shadow-xs">
              {tLogin('button')}
            </span>
          </div>
        </Link>
      )}
    </Card>
  );
}
