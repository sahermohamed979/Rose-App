'use client';

import * as React from 'react';
import {
  OTPInput,
  OTPInputContext,
  REGEXP_ONLY_DIGITS,
} from 'input-otp';
import { MinusIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils/utils';

// Main
function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      pattern={REGEXP_ONLY_DIGITS}
      containerClassName={cn(
        'cn-input-otp flex items-center gap-2 has-disabled:pointer-events-none has-disabled:opacity-60',
        containerClassName
      )}
      spellCheck={false}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  );
}

// Group
function InputOTPGroup({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  );
}

// Slot
function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);

  const slot = inputOTPContext?.slots?.[index];
  const char = slot?.char;
  const hasFakeCaret = slot?.hasFakeCaret;
  const isActive = slot?.isActive;

  // Type-safe check instead of using 'any'
  // 1. Convert to unknown first
  // 2. Safely check if it's an object and has the 'isInvalid' key
  const contextObj = inputOTPContext as unknown;
  const isInvalid =
    typeof contextObj === 'object' &&
    contextObj !== null &&
    'isInvalid' in contextObj
      ? Boolean((contextObj as Record<string, unknown>).isInvalid)
      : undefined;

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      aria-invalid={isInvalid}
      className={cn(
        // Base (same as Input)
        'relative flex h-11.25 w-11.25 items-center justify-center rounded-lg text-sm transition-all duration-200',

        // Base style
        'bg-bg-plain text-text-plain border border-border-soft outline-none',

        // Hover (same as Input)
        'hover:border-border-default hover:shadow-subtle-sm hover:ring-ring-default',

        // Focus / Active
        'data-[active=true]:z-10 data-[active=true]:border-border-primary data-[active=true]:ring-[length:var(--ring-default-size)] data-[active=true]:ring-[color:var(--ring-default)]',

        // Invalid (same as Input)
        'aria-invalid:border-border-danger aria-invalid:text-text-danger aria-invalid:ring-[length:var(--ring-danger-size)] aria-invalid:ring-[color:var(--ring-danger)] dark:aria-invalid:border-border-danger-saturated',

        // Disabled (same as Input)
        'disabled:pointer-events-none disabled:opacity-60 disabled:bg-bg-subtle disabled:border-border-muted disabled:text-text-subtle',

        className
      )}
      {...props}
    >
      {char}

      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-text-plain duration-1000" />
        </div>
      )}
    </div>
  );
}

// Separator
function InputOTPSeparator({
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-otp-separator"
      className="flex items-center text-text-muted"
      role="separator"
      {...props}
    >
      <MinusIcon />
    </div>
  );
}

// Exports
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
