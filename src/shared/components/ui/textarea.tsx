'use client';

import * as React from 'react';
import { cn } from '@/shared/lib/utils/utils';
import { useTranslations, useLocale } from 'next-intl';

// 1. Textarea Base Component
function Textarea({
  className,
  ...props
}: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-16 w-full rounded-(--radius-lg) border border-border-soft bg-bg-plain px-2.5 py-2 text-text-plain transition-colors outline-none placeholder:text-text-muted text-start md:text-sm',
        // hover
        'hover:border-border-default',
        // focus
        'focus-visible:border-border-primary focus-visible:ring-2 focus-visible:ring-ring-default',
        // disabled
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-bg-muted disabled:text-text-muted',
        //error
        'aria-invalid:border-border-danger aria-invalid:ring-2 aria-invalid:ring-ring-danger',
        className
      )}
      {...props}
    />
  );
}

// 2. Custom Textarea Interface
interface CustomTextareaProps extends React.ComponentProps<'textarea'> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  placeholderKey?: string;
  showCharCount?: boolean;
  maxLength?: number;
}

// 3. Custom Textarea Component
export function CustomTextarea({
  label,
  error = false,
  errorMessage,
  placeholderKey,
  showCharCount = false,
  maxLength,
  onChange,
  className,
  ...props
}: CustomTextareaProps) {
  const [charCount, setCharCount] = React.useState(0);
  const t = useTranslations('Forms');
  const locale = useLocale();

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCharCount(e.target.value.length);
    onChange?.(e);
  };

  const localizedNumber = (num: number) =>
    new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
      useGrouping: false,
    }).format(num);

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-1.5 text-start',
        className
      )}
    >
      {label && (
        <label
          className={cn(
            'text-xs font-medium transition-colors',
            error ? 'text-text-danger' : 'text-text-plain',
            props.disabled && 'text-text-muted'
          )}
        >
          {label}
        </label>
      )}

      <Textarea
        maxLength={maxLength}
        onChange={handleTextChange}
        aria-invalid={error}
        placeholder={
          placeholderKey
            ? t(placeholderKey)
            : t('textareaPlaceholder')
        }
        {...props}
      />

      <div className="flex items-start justify-between gap-2 mt-0.5 text-xs min-h-[1.25rem] w-full">
        {error ? (
          <p className="text-text-danger animate-in fade-in-50 duration-200">
            {errorMessage || t('required')}
          </p>
        ) : (
          <div />
        )}

        {showCharCount && maxLength && (
          <span
            className={cn(
              'font-mono transition-colors ms-auto',
              charCount >= maxLength
                ? 'text-text-plain font-bold'
                : 'text-text-muted',
              props.disabled && 'opacity-50'
            )}
          >
            {localizedNumber(charCount)} /{' '}
            {localizedNumber(maxLength)}
          </span>
        )}
      </div>
    </div>
  );
}

export { Textarea };
