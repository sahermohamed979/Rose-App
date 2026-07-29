'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

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
import { Star } from 'lucide-react';
import SubmissionFormSchema from '../schemas/submission-form-schema';
import CreateProductReviewHook from '../hooks/create-product-review-hook';
import { useParams } from 'next/navigation';

export function ReviewSubmissionForm() {
  const formSchema = SubmissionFormSchema();
  const params = useParams();
  const productId = 'ba64d196-4ac3-40bd-be26-b24fbceb6db0';

  const { mutate, isError, isPending } = CreateProductReviewHook();
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

  return (
    <Card className="w-full sm:max-w-md ring-0">
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
                Your rating :
              </p>
              <Controller
                name="rating"
                control={form.control}
                render={({ field }) => (
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        strokeWidth={1.5}
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
                )}
              />
            </div>
            <Controller
              name="headline"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter review title"
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
                    Review
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="What do you think of this product?"
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
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="form-rhf-demo"
            className={
              'bg-maroon-600 w-full py-3.5 px-4 h-11 text-text-inverse'
            }
          >
            Add Review
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
