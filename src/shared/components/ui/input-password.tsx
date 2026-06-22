'use  client';

import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { cn } from '@/shared/lib/utils/utils';
import { Input } from './input';

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div data-slot="password-input" className="relative w-full ">
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder="*******"
        className={cn('pe-10', className)}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        data-slot="password-toggle"
        disabled={props.disabled}
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        className={cn(
          // Layout & Sizing
          'absolute inset-y-0 inset-e-0 flex items-center justify-center rounded-e-lg px-6 transition-colors',

          // Colors
          'text-muted-foreground ',

          // Hover State
          'hover:text-foreground',

          // Focus & Rings (Matches Base Input)
          'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',

          // Disabled State
          'disabled:pointer-events-none disabled:opacity-50'
        )}
      >
        {showPassword ? (
          <EyeOff className="size-5" />
        ) : (
          <Eye className="size-5" />
        )}
      </button>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
