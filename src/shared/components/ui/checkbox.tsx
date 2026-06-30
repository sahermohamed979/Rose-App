import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { cn } from '@/shared/lib/utils/utils';
import { CheckIcon } from 'lucide-react';

function Checkbox({
  className,
  ...props
}: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer font-normal relative flex size-5 shrink-0 items-center justify-center   rounded-[8px] border  border-border-primary transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring-default disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-border-danger   aria-checked:bg-bg-primary   data-checked:bg-bg-primary  ',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-text-inverse transition-none [&>svg]:size-4"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
