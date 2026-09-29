'use client';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { z } from 'zod';

export default function useSubmissionFormSchema() {
  const t = useTranslations('reviewForm.validation');

  return useMemo(
    () =>
      z.object({
        headline: z
          .string()
          .min(5, t('titleMin'))
          .max(32, t('titleMax')),
        content: z
          .string()
          .min(20, t('contentMin'))
          .max(100, t('contentMax')),
        rating: z.number().min(1, t('ratingRequired')).max(5),
      }),
    [t]
  );
}
