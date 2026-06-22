'use client';

import * as React from 'react';
import { Upload } from 'lucide-react';

import { cn } from '@/shared/lib/utils/utils';

// Extend input props and add containerClassName for layout control
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
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div
        data-slot="file-input"
        className={cn(
          'group relative flex w-full items-center',
          containerClassName
        )}
      >
        {/* Hidden native file input acting as the interactive layer */}
        <input
          type="file"
          ref={ref}
          disabled={disabled}
          onChange={handleChange}
          className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          {...props}
        />

        {/* Visual representation of the input */}
        <div
          className={cn(
            // Layout & Sizing (Matches Base Input)
            'flex h-10 w-full min-w-0 items-center justify-between gap-1.5 rounded-lg px-3 py-1 text-sm transition-colors',

            // Border & Backgrounds
            'border border-input bg-transparent dark:bg-input/30',

            // Hover State
            'group-hover:ring-2 group-hover:ring-ring/30',

            // Focus & Rings (Triggered by the hidden peer input)
            'peer-focus-visible:border-ring peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50',

            // Disabled State
            'peer-disabled:bg-input/50 peer-disabled:opacity-50 dark:peer-disabled:bg-input/80',

            // Validation States
            'peer-aria-invalid:border-destructive peer-aria-invalid:ring-3 peer-aria-invalid:ring-destructive/20 dark:peer-aria-invalid:border-destructive/50 dark:peer-aria-invalid:ring-destructive/40',

            className
          )}
        >
          <span
            className={cn(
              'truncate pe-2 text-sm',
              fileName ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            {fileName || 'Select a file...'}
          </span>

          <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-foreground">
            <Upload className="size-4" />
            <span>Upload file</span>
          </div>
        </div>
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';

export { FileInput };
