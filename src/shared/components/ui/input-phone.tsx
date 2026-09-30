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
        className={cn(
          // Layout
          'relative flex w-full items-center',
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

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      className={cn(
        // Leave space for the country selector
        'flex-1 ps-32',
        className
      )}
      {...props}
    />
  );
});

InputComponent.displayName = 'InputComponent';

type CountrySelectProps = {
  disabled?: boolean;
  value: Country;
  onChange: (value: Country) => void;
  options: { label: string; value: Country | undefined }[];
};

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

  const currentCountry = (value || 'EG') as Country;
  let callingCode = '20';
  try {
    callingCode = getCountryCallingCode(currentCountry);
  } catch {
    callingCode = '20';
  }

  return (
    <div
      data-slot="country-select"
      className={cn(
        // Layout
        'absolute inset-y-0 inset-s-0 z-10 flex items-center',

        // Disabled
        disabled && 'pointer-events-none opacity-60'
      )}
    >
      <div
        className={cn(
          // Layout
          'relative flex h-full items-center gap-1.5 rounded-s-lg ps-3 pe-2 transition-colors',

          // Base
          'text-text-plain',

          // Hover
          'hover:bg-bg-subtle',

          // Focus
          'focus-within:bg-bg-subtle'
        )}
      >
        <select
          disabled={disabled}
          value={currentCountry}
          onChange={handleSelect}
          aria-label="Select country"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        >
          <option value="" disabled>
            Select
          </option>

          {options
            .filter((option) => option.value)
            .map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>

        <FlagComponent
          country={currentCountry}
          countryName={currentCountry}
        />

        <span className="mt-px w-14 text-sm font-medium text-text-plain">
          {`${currentCountry}(+${callingCode})`}
        </span>

        <ChevronsUpDown className="size-4 shrink-0 text-text-muted" />
      </div>
    </div>
  );
};

const FlagComponent = ({
  country = 'EG',
  countryName = 'EG',
}: {
  country?: Country;
  countryName?: string;
}) => {
  const activeCountry = country || 'EG';
  const Flag = flags[activeCountry];

  return (
    <span className="flex h-3.5 w-5 shrink-0 overflow-hidden rounded-sm shadow-sm [&_svg]:h-full [&_svg]:w-full">
      {Flag ? (
        <Flag title={countryName || activeCountry} />
      ) : (
        <span className="text-sm leading-none">🇪🇬</span>
      )}
    </span>
  );
};

FlagComponent.displayName = 'FlagComponent';

export { PhoneInput };
