'use client';

import * as React from 'react';

import { cn } from '@/shared/lib/utils/utils';
import { Input } from './input';

const NumberInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input> & { containerClassName?: string }
>(
  (
    { className, containerClassName, disabled, ...props },
    forwardedRef
  ) => {
    const internalRef = React.useRef<HTMLInputElement>(null);

    // Merge refs to allow both internal use and parent access
    const handleRef = (element: HTMLInputElement) => {
      internalRef.current = element;
      if (typeof forwardedRef === 'function') {
        forwardedRef(element);
      } else if (forwardedRef) {
        forwardedRef.current = element;
      }
    };

    const handleIncrement = () => {
      internalRef.current?.stepUp();
      internalRef.current?.dispatchEvent(
        new Event('change', { bubbles: true })
      );
    };

    const handleDecrement = () => {
      internalRef.current?.stepDown();
      internalRef.current?.dispatchEvent(
        new Event('change', { bubbles: true })
      );
    };

    return (
      <div
        data-slot="number-input"
        className={cn(
          'relative flex items-center w-full',
          containerClassName
        )}
      >
        <Input
          type="number"
          // Native arrows are hidden automatically by the Base Input styles
          className={cn('flex-1 pe-8 text-start', className)}
          ref={handleRef}
          disabled={disabled}
          {...props}
        />

        <div className="absolute inset-y-0 inset-e-0 flex flex-col justify-center gap-0.5 pe-3">
          {/* Up Button */}
          <button
            type="button"
            data-slot="increment-button"
            onClick={handleIncrement}
            disabled={disabled}
            tabIndex={-1} // Prevent focus when tabbing
            className={cn(
              'flex items-center justify-center transition-colors outline-none',
              'text-muted-foreground hover:text-foreground',
              'disabled:pointer-events-none disabled:opacity-50'
            )}
          >
            <svg
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="currentColor"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Using stroke to create a slight border radius effect */}
              <polygon
                points="2,6 8,6 5,2"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Down Button */}
          <button
            type="button"
            data-slot="decrement-button"
            onClick={handleDecrement}
            disabled={disabled}
            tabIndex={-1} // Prevent focus when tabbing
            className={cn(
              'flex items-center justify-center transition-colors outline-none',
              'text-muted-foreground hover:text-foreground',
              'disabled:pointer-events-none disabled:opacity-50'
            )}
          >
            <svg
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="currentColor"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="2,2 8,2 5,6"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';

export { NumberInput };
