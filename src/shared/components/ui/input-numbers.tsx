'use client';

import * as React from 'react';

import { cn } from '@/shared/lib/utils/utils';
import { Input } from './input';

const NumberInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input> & {
    containerClassName?: string;
  }
>(
  (
    { className, containerClassName, disabled, ...props },
    forwardedRef
  ) => {
    const internalRef = React.useRef<HTMLInputElement>(null);

    const handleRef = (element: HTMLInputElement) => {
      internalRef.current = element;

      if (typeof forwardedRef === 'function') {
        forwardedRef(element);
      } else if (forwardedRef) {
        forwardedRef.current = element;
      }
    };

    const updateInputValue = (value: string) => {
      const input = internalRef.current;
      if (!input) {
        return;
      }

      const nativeValueSetter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value'
      )?.set;

      nativeValueSetter?.call(input, value);

      input.dispatchEvent(
        new Event('input', {
          bubbles: true,
        })
      );
    };

    const handleStep = (direction: 1 | -1) => {
      const input = internalRef.current;
      if (!input) {
        return;
      }

      direction > 0 ? input.stepUp() : input.stepDown();

      updateInputValue(input.value);
    };

    return (
      <div
        data-slot="number-input"
        className={cn(
          // Layout
          'relative flex w-full items-center',

          containerClassName
        )}
      >
        <Input
          ref={handleRef}
          type="number"
          disabled={disabled}
          className={cn(
            // Layout
            'flex-1 pe-8 text-start',

            className
          )}
          {...props}
        />

        <div
          data-slot="number-input-controls"
          className="absolute inset-y-0 inset-e-0 flex flex-col justify-center gap-0.5 pe-3"
        >
          <button
            type="button"
            data-slot="increment-button"
            onClick={() => handleStep(1)}
            disabled={disabled}
            tabIndex={-1}
            aria-label="Increment"
            className={cn(
              // Layout
              'flex items-center justify-center outline-none transition-colors',

              // Base
              'text-text-muted',

              // Hover
              'hover:text-text-plain',

              // Disabled
              'disabled:pointer-events-none disabled:opacity-60'
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
                points="2,6 8,6 5,2"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            data-slot="decrement-button"
            onClick={() => handleStep(-1)}
            disabled={disabled}
            tabIndex={-1}
            aria-label="Decrement"
            className={cn(
              // Layout
              'flex items-center justify-center outline-none transition-colors',

              // Base
              'text-text-muted',

              // Hover
              'hover:text-text-plain',

              // Disabled
              'disabled:pointer-events-none disabled:opacity-60'
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
