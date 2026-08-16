'use client';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

export default function SubmissionFormSchema() {
  const t = useTranslations('reviewForm.validation');

  return z.object({
    headline: z.string().min(5, t('titleMin')).max(32, t('titleMax')),
    content: z
      .string()
      .min(20, t('contentMin'))
      .max(100, t('contentMax')),
    rating: z
      .number()
      .min(1, t('ratingRequired')) // ← add this
      .max(5),
  });
}
