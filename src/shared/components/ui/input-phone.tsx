'use client';

import * as React from 'react';
import RPNInput, {
  getCountryCallingCode,
  type Country,
} from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { ChevronsUpDown } from 'lucide-react';

import { cn } from '@/shared/lib/utils/utils';
import { Input } from './input';

type PhoneInputProps = React.ComponentProps<typeof RPNInput> & {
  containerClassName?: string;
};

const PhoneInput = React.forwardRef<
  React.ElementRef<typeof RPNInput>,
  PhoneInputProps
>(
  (
    {
      className,
      containerClassName,
      disabled,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <RPNInput
        ref={ref}
        data-slot="phone-input"
        // Use flex layout to ensure the input and container widths are always synced
        className={cn(
          'relative flex items-center w-full',
          containerClassName
        )}
        flagComponent={FlagComponent}
        countrySelectComponent={CountrySelect}
        inputComponent={InputComponent}
        disabled={disabled}
        defaultCountry="EG"
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  }
);
PhoneInput.displayName = 'PhoneInput';

// This is the actual text input field where the user types the numbers
const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    // Add padding start (ps-32) to leave empty space for the absolute country selector
    className={cn('flex-1 ps-32', className)}
    {...props}
  />
));
InputComponent.displayName = 'InputComponent';

type CountrySelectProps = {
  disabled?: boolean;
  value: Country;
  onChange: (value: Country) => void;
  options: { label: string; value: Country | undefined }[];
};

// This is the dropdown menu on the left side to select the country code
const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onChange(event.target.value as Country);
  };

  return (
    <div
      data-slot="country-select"
      className={cn(
        // Position it absolutely on the left side of the input container
        'absolute inset-y-0 inset-s-0 z-10 flex items-center',
        disabled && 'pointer-events-none opacity-50'
      )}
    >
      <div
        className={cn(
          'relative flex h-full cursor-pointer items-center gap-1.5 rounded-s-lg ps-3 pe-2 transition-colors',
          // Add hover effect that matches the design system
          'hover:bg-muted focus-within:bg-muted'
        )}
      >
        {/* Invisible native select element layered on top for functionality */}
        <select
          disabled={disabled}
          value={value || ''}
          onChange={handleSelect}
          aria-label="Select country"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        >
          <option value="" disabled>
            Select
          </option>
          {options
            .filter((x) => x.value)
            .map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>

        {/* Visual UI elements */}
        <FlagComponent country={value} countryName={value} />

        <span className="w-14 text-sm font-medium text-foreground mt-px">
          {value
            ? `${value}(+${getCountryCallingCode(value)})`
            : '🌐'}
        </span>

        <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
      </div>
    </div>
  );
};

// A small helper component to render the country flag
const FlagComponent = ({
  country,
  countryName,
}: {
  country: Country;
  countryName: string;
}) => {
  const Flag = flags[country];
  return (
    <span className="flex h-3.5 w-5 shrink-0 overflow-hidden rounded-sm shadow-sm [&_svg]:h-full [&_svg]:w-full">
      {Flag ? (
        <Flag title={countryName} />
      ) : (
        <span className="text-sm leading-none">🌍</span>
      )}
    </span>
  );
};

export { PhoneInput };
