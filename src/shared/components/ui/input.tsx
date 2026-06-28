import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils/utils';

const inputVariants = cva(
  cn(
    // Layout & Sizing
    'h-11 w-full min-w-0 flex items-center rounded-lg px-3 py-1 text-sm transition-all duration-200',

    // Base State (Background, Border, Text)
    'bg-bg-plain text-text-plain border border-border-soft outline-none',

    // Placeholder
    'placeholder:text-text-muted',

    // Hover State
    'hover:border-border-default hover:shadow-subtle-sm hover:ring-ring-default',

    // Focus State
    'focus-visible:border-border-primary focus-visible:ring-[length:var(--ring-default-size)] focus-visible:ring-[color:var(--ring-default)]',

    // Disabled State
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-bg-subtle disabled:border-border-muted disabled:text-text-subtle disabled:opacity-60',

    // Read Only State
    'read-only:bg-bg-muted read-only:focus-visible:ring-0 read-only:focus-visible:border-border-soft',

    // Validation States (Invalid / Error)
    'aria-invalid:border-border-danger aria-invalid:text-text-danger aria-invalid:ring-[length:var(--ring-danger-size)] aria-invalid:ring-[color:var(--ring-danger)] dark:aria-invalid:border-border-danger-saturated'
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
