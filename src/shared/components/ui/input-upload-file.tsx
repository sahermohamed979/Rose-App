'use client';

import * as React from 'react';
import { Upload } from 'lucide-react';

import { cn } from '@/shared/lib/utils/utils';

export interface FileInputProps extends React.ComponentProps<'input'> {
  containerClassName?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    { className, containerClassName, disabled, onChange, ...props },
    ref
  ) => {
    const [fileName, setFileName] = React.useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setFileName(file ? file.name : '');

      onChange?.(e);
    };

    return (
      <div
        data-slot="file-input"
        className={cn(
          'group relative flex w-full items-center',
          containerClassName
        )}
      >
        {/* Hidden input */}
        <input
          type="file"
          ref={ref}
          disabled={disabled}
          onChange={handleChange}
          className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          {...props}
        />

        {/* Visual UI */}
        <div
          className={cn(
            // Layout
            'flex h-11.25 w-full min-w-0 items-center justify-between gap-2 rounded-lg px-3 py-1 text-sm transition-all duration-200',

            // Base
            'bg-bg-plain text-text-plain border border-border-soft outline-none',

            // Hover
            'group-hover:border-border-default group-hover:shadow-subtle-sm group-hover:ring-ring-default',

            // Focus
            'peer-focus-visible:border-border-primary peer-focus-visible:ring-[length:var(--ring-default-size)] peer-focus-visible:ring-[color:var(--ring-default)]',

            // Disabled
            'peer-disabled:pointer-events-none peer-disabled:opacity-60 peer-disabled:bg-bg-subtle peer-disabled:border-border-muted peer-disabled:text-text-subtle',

            // Invalid
            'peer-aria-invalid:border-border-danger peer-aria-invalid:text-text-danger peer-aria-invalid:ring-[length:var(--ring-danger-size)] peer-aria-invalid:ring-[color:var(--ring-danger)] dark:peer-aria-invalid:border-border-danger-saturated',

            className
          )}
        >
          {/* File name */}
          <span
            className={cn(
              'truncate pe-2',
              fileName ? 'text-text-plain' : 'text-text-muted'
            )}
          >
            {fileName || 'Select a file...'}
          </span>

          {/* Action */}
          <div className="flex shrink-0 items-center gap-2 text-text-plain">
            <Upload className="size-4 text-text-primary" />
            <span className="font-medium text-text-primary">
              Upload file
            </span>
          </div>
        </div>
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';

export { FileInput };
