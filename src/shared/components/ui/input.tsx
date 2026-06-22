import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils/utils';

const inputVariants = cva(
  cn(
    // Layout & Sizing
    'h-11.25 w-82 min-w-0 rounded-lg px-3 py-1 text-sm transition-colors',

    // Border & Backgrounds
    'border border-input bg-transparent outline-none dark:bg-input/30',

    // Disabled state
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 dark:disabled:bg-input/80',

    // Read Only State
    'read-only:bg-input/50',

    // Placeholder
    'placeholder:text-muted-foreground',

    // Hover State
    'hover:ring-2 hover:ring-ring/30',

    // Focus & rings
    'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',

    // Validation States
    'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40'
  )
);

export interface InputProps
  extends
    React.ComponentProps<typeof InputPrimitive>,
    VariantProps<typeof inputVariants> {
  valid?: boolean;
  invalid?: boolean;

  /** When true, hides the native up/down spinner on number inputs. */
  hideNumberControls?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      valid,
      invalid,
      hideNumberControls = true,
      ...props
    },
    ref
  ) => {
    return (
      <InputPrimitive
        ref={ref}
        data-slot="input"
        data-valid={valid}
        data-invalid={invalid}
        aria-invalid={invalid || props['aria-invalid']}
        className={cn(
          inputVariants(),

          // Number controls hiding logic
          hideNumberControls &&
            '[appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
