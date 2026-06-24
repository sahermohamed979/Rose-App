'use client';

import * as React from 'react';
import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

export default function TestPage() {
  const t = useTranslations('input');

  const { theme, setTheme } = useTheme();

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const schema = React.useMemo(
    () =>
      z.object({
        name: z.string().min(1, t('required')),
      }),
    [t]
  );

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-bg-subtle p-8">
      <div className="mx-auto max-w-md space-y-6 rounded-xl border border-border-soft bg-bg-plain p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-text-plain">
            Input Test
          </h1>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }
              className="rounded-lg border border-border-soft px-3 py-2"
            >
              {theme === 'dark' ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                router.replace(pathname, {
                  locale: locale === 'en' ? 'ar' : 'en',
                })
              }
              className="rounded-lg border border-border-soft px-3 py-2"
            >
              {locale === 'en' ? 'AR' : 'EN'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" invalid={!!errors.name}>
              Name
            </Label>

            <Input
              id="name"
              placeholder="Enter your name"
              invalid={!!errors.name}
              {...register('name')}
            />

            {errors.name && (
              <p className="text-sm text-text-danger">
                {errors.name.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg border border-border-soft px-4 py-2 transition-colors hover:bg-bg-subtle"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
