'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

import {
  contactSchema,
  type ContactFormValues,
} from '../schemas/contact.schema';
import { submitContactAction } from '../apis/contact.action';
import { Button } from '@/shared/components/ui/button';

export function ContactForm() {
  // Translation
  const t = useTranslations('contactPage.form');

  // State
  const [isSuccess, setIsSuccess] = useState(false);

  // Form & validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  // Functions
  async function onSubmit(data: ContactFormValues) {
    try {
      const result = await submitContactAction(data);
      if (result.status) {
        setIsSuccess(true);
        reset();
        toast.success(t('successTitle'));
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error(t('errorMessage'));
    }
  }

  function handleSendAnother() {
    setIsSuccess(false);
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border-subtle bg-bg-elevated p-8 sm:p-12 text-center shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950/50 dark:text-green-400">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-text-primary">
          {t('successTitle')}
        </h3>
        <p className="mt-2 max-w-md text-sm text-text-soft leading-relaxed">
          {t('successDesc')}
        </p>
        <Button
          type="button"
          onClick={handleSendAnother}
          className="mt-6 rounded-full px-6 py-2.5 bg-bg-primary text-text-inverse hover:opacity-95"
        >
          {t('sendAnother')}
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-elevated p-6 sm:p-8 md:p-10 shadow-sm">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-text-primary">
          {t('title')}
        </h2>
        <p className="mt-1 text-sm text-text-soft">{t('subtitle')}</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5"
      >
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold text-text-primary mb-1.5"
            >
              {t('nameLabel')} <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder={t('namePlaceholder')}
              {...register('name')}
              className="h-11 w-full rounded-xl border border-border-subtle bg-bg-plain px-4 text-sm text-text-default placeholder:text-text-muted focus:border-border-primary focus:outline-none focus:ring-2 focus:ring-maroon-500/20"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-text-primary mb-1.5"
            >
              {t('emailLabel')}{' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder={t('emailPlaceholder')}
              {...register('email')}
              className="h-11 w-full rounded-xl border border-border-subtle bg-bg-plain px-4 text-sm text-text-default placeholder:text-text-muted focus:border-border-primary focus:outline-none focus:ring-2 focus:ring-maroon-500/20"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Phone & Subject Row */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-semibold text-text-primary mb-1.5"
            >
              {t('phoneLabel')}
            </label>
            <input
              id="phone"
              type="tel"
              placeholder={t('phonePlaceholder')}
              {...register('phone')}
              className="h-11 w-full rounded-xl border border-border-subtle bg-bg-plain px-4 text-sm text-text-default placeholder:text-text-muted focus:border-border-primary focus:outline-none focus:ring-2 focus:ring-maroon-500/20"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-xs font-semibold text-text-primary mb-1.5"
            >
              {t('subjectLabel')}{' '}
              <span className="text-red-500">*</span>
            </label>
            <select
              id="subject"
              {...register('subject')}
              className="h-11 w-full rounded-xl border border-border-subtle bg-bg-plain px-4 text-sm text-text-default focus:border-border-primary focus:outline-none focus:ring-2 focus:ring-maroon-500/20"
            >
              <option value="">{t('subjectPlaceholder')}</option>
              <option value="general">{t('subjects.general')}</option>
              <option value="order">{t('subjects.order')}</option>
              <option value="custom">{t('subjects.custom')}</option>
              <option value="events">{t('subjects.events')}</option>
              <option value="corporate">
                {t('subjects.corporate')}
              </option>
            </select>
            {errors.subject && (
              <p className="mt-1 text-xs text-red-500">
                {errors.subject.message}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-semibold text-text-primary mb-1.5"
          >
            {t('messageLabel')}{' '}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder={t('messagePlaceholder')}
            {...register('message')}
            className="w-full rounded-xl border border-border-subtle bg-bg-plain p-4 text-sm text-text-default placeholder:text-text-muted focus:border-border-primary focus:outline-none focus:ring-2 focus:ring-maroon-500/20"
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-bg-primary px-8 py-3 text-sm font-semibold text-text-inverse shadow-sm transition-all hover:opacity-95 active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{t('sendingBtn')}</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4 rtl:rotate-180" />
                <span>{t('submitBtn')}</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
