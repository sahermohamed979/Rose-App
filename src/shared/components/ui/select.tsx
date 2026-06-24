'use client';

import * as React from 'react';
import { Select as SelectPrimitive } from '@base-ui/react/select';
import {
  ChevronDownIcon,
  CheckIcon,
  ChevronUpIcon,
} from 'lucide-react';

import { cn } from '@/shared/lib/utils/utils';

const Select = SelectPrimitive.Root;

function SelectGroup({
  className,
  ...props
}: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn('scroll-my-1 p-1', className)}
      {...props}
    />
  );
}

function SelectValue({
  className,
  ...props
}: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn('flex flex-1 text-start', className)}
      {...props}
    />
  );
}

function SelectTrigger({
  className,
  children,
  ...props
}: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        // Layout
        'flex h-11.25 w-full min-w-0 items-center justify-between gap-2 rounded-lg px-3 py-1 text-sm transition-all duration-200 select-none outline-none',

        // Base
        'bg-bg-plain text-text-plain border border-border-soft',

        // Hover
        'hover:border-border-default hover:shadow-subtle-sm hover:ring-ring-default',

        // Focus
        'focus-visible:border-border-primary focus-visible:ring-[length:var(--ring-default-size)] focus-visible:ring-[color:var(--ring-default)]',

        // Disabled
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-bg-subtle disabled:border-border-muted disabled:text-text-subtle disabled:opacity-60',

        // Invalid
        'aria-invalid:border-border-danger aria-invalid:text-text-danger aria-invalid:ring-[length:var(--ring-danger-size)] aria-invalid:ring-[color:var(--ring-danger)] dark:aria-invalid:border-border-danger-saturated',

        // Value + icons
        '[&>span]:flex-1 [&>span]:truncate',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4',

        className
      )}
      {...props}
    >
      {children}

      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="size-4 text-text-muted" />
        }
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    | 'align'
    | 'alignOffset'
    | 'side'
    | 'sideOffset'
    | 'alignItemWithTrigger'
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            // Layout
            'isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 overflow-x-hidden overflow-y-auto rounded-lg origin-(--transform-origin)',

            // Base
            'bg-bg-plain text-text-plain border border-border-soft shadow-subtle-md',

            // Motion
            'duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',

            // Blur
            'before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150',

            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        'px-2 py-1 text-xs font-medium text-text-muted',
        className
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // Layout
        'relative flex w-full cursor-default items-center gap-2 rounded-md px-2 py-2 text-sm outline-none select-none transition-colors',

        // Base
        'text-text-plain',

        // Hover / Highlight
        'hover:bg-bg-subtle data-highlighted:bg-bg-subtle',

        // Focus
        'focus-visible:bg-bg-subtle',

        // Selected
        'data-selected:bg-bg-muted',

        // Disabled
        'data-disabled:pointer-events-none data-disabled:opacity-60 data-disabled:text-text-subtle',

        '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4',

        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute inset-e-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        'pointer-events-none -mx-1 my-1 h-px bg-border-soft',
        className
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
