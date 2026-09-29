'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from '@/shared/components/ui/input-group';
import { Loader, Star } from 'lucide-react';
import SubmissionFormSchema from '../schemas/submission-form-schema';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import Link from 'next/link';
import useCreateProductReviewHook from '../hooks/use-create-product-review';

export function ReviewSubmissionForm() {
  const formSchema = SubmissionFormSchema();
  const { productId } = useParams();
  const { status } = useSession();
  const isLoading = status === 'loading';
  const isLoggedIn = status === 'authenticated';
  const t = useTranslations('reviewForm');

  const { mutate, isError, isPending, errorMsg, IsSuccess } =
    useCreateProductReviewHook();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headline: '',
      content: '',
      rating: 0,
    },
  });

  function onSubmit(data: ReviewData) {
    const formData = {
      ...data,
      productId,
    };
    mutate(formData);
  }

  React.useEffect(() => {
    if (IsSuccess) {
      form.reset();
      toast.success('Review submitted successfully! 🎉');
    }
  }, [IsSuccess, form]);

  return (
    <Card className="w-full sm:max-w-md ring-0 relative">
      <CardContent>
        <form
          className="mt-6"
          id="form-rhf-demo"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <div className="flex">
              <p className="text-[16px] me-2.5 font-medium">
                {' '}
                {t('yourRating')}:
              </p>
              <Controller
                name="rating"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          onClick={() => field.onChange(star)}
                          fill={
                            star <= field.value ? '#F2A93D' : 'none'
                          }
                          color="#F2A93D"
                          size={25}
                          className="cursor-pointer"
                        />
                      ))}
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                )}
              />
            </div>
            <Controller
              name="headline"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    {t('title')}
                  </FieldLabel>
                  <Input
                    disabled={!isLoggedIn || isPending}
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder={t('titlePlaceholder')}
                    autoComplete="off"
                    className="h-12.25"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    {t('review')}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      disabled={!isLoggedIn || isPending}
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder={t('reviewPlaceholder')}
                      rows={6}
                      className="min-h-37.5 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end"></InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      {isError && (
        <p className="text-center text-text-danger">{errorMsg}</p>
      )}
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            disabled={!isLoggedIn || isPending}
            type="submit"
            form="form-rhf-demo"
            className={
              'bg-maroon-600 w-full py-3.5 px-4 h-11 text-text-inverse'
            }
          >
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              `${t('submit')}`
            )}
          </Button>
        </Field>
      </CardFooter>
      {!isLoading && !isLoggedIn && (
        <Link href={'/login'}>
          <div className=" absolute top-0 bottom-0 right-0 left-0 bg-transparent backdrop-blur-[1px] flex justify-center items-center ">
            <p className="text-text-plain font-semibold">
              {t('loginRequired')}{' '}
            </p>
          </div>
        </Link>
      )}
    </Card>
  );
}
