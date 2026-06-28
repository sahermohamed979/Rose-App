'use client';

import * as React from 'react';

import { cn } from '@/shared/lib/utils/utils';

const Label = React.forwardRef<
  HTMLLabelElement,
  React.ComponentProps<'label'>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      data-slot="label"
      data-inv
      className={cn(
        // Base Typography & Layout
        'flex items-center gap-2 text-sm font-medium leading-none select-none',

        // Base Color (
        'text-text-plain',

        // Disabled States (Group & Peer)
        'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-60 group-data-[disabled=true]:text-text-subtle',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-60 peer-disabled:text-text-subtle',

        className
      )}
      {...props}
    />
  );
});

Label.displayName = 'Label';

export { Label };
