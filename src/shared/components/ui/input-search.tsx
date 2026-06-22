'use client';

import * as React from 'react';
import { Search } from 'lucide-react';

import { cn } from '@/shared/lib/utils/utils';
import { Input } from './input';

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <div data-slot="search-input" className="relative w-full">
      <div
        data-slot="search-icon"
        className={cn(
          // Layout & Positioning
          'absolute inset-y-0 inset-s-0 flex pointer-events-none items-center justify-center ps-4',

          // Colors
          'text-muted-foreground',

          // Disabled State matching the input
          props.disabled && 'opacity-50'
        )}
      >
        <Search className="size-4" />
      </div>
      <Input
        type="search"
        placeholder="Search..."
        className={cn('ps-10', className)}
        ref={ref}
        {...props}
      />
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export { SearchInput };
