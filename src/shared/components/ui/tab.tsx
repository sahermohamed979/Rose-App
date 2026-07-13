/**
 * Tab – Usage Guide
 * ─────────────────────────────────────────────────────────────
 * Import and use:
 *
 *   import { Tab } from '@/shared/components/ui/tab';
 *
 *   <Tab
 *     items={[
 *       { label: 'Home' },
 *       { label: 'Projects' },
 *     ]}
 *   />
 *
 * Props:
 *   items         TabItem[]         – list of tab triggers and optional panels
 *   defaultValue  string            – initially active tab value (optional, defaults to first item)
 *   value         string            – controlled active tab value (optional)
 *   onValueChange (val: string)=>void – callback when tab changes (optional)
 *   orientation   'horizontal' | 'vertical' (default: 'horizontal')
 *   className     string            – extra classes on the Tabs wrapper
 *
 * Primitive sub-components (for advanced custom layouts):
 *   Tabs, TabsList, TabsTrigger, TabsContent
 */

'use client';

import * as React from 'react';
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { cn } from '@/shared/lib/utils/utils';

// ─── Primitives ───────────────────────────────────────────────────────────────

/** Root container. */
function Tabs({
  className,
  orientation = 'horizontal',
  ...props
}: TabsPrimitive.Root.Props) {
  // --- Render ---
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        'group/tabs flex gap-2 data-horizontal:flex-col',
        className
      )}
      {...props}
    />
  );
}

/** Container for the tab triggers. Has a border and background-plain. */
function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  // --- Render ---
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        `group/tabs-list
        inline-flex w-fit items-center justify-center
        rounded-xl p-0
        [background-color:var(--bg-plain)]
        group-data-horizontal/tabs:h-11
        group-data-vertical/tabs:h-fit
        group-data-vertical/tabs:flex-col
        group-data-vertical/tabs:gap-2`,
        className
      )}
      {...props}
    />
  );
}

/**
 * Individual tab buttons.
 *
 * Colors and states (from globals.css variables):
 *   • Default  → [color:var(--text-soft)]
 *   • Hover    → hover:[background-color:var(--bg-primary-saturated)] hover:[color:var(--text-inverse)]
 *   • Active   → data-active:[background-color:var(--bg-primary)] data-active:[color:var(--text-inverse)]
 *   • Focused  → focus-visible:ring-4 focus-visible:ring-[var(--ring-default)]
 *   • Disabled → disabled:[background-color:var(--bg-muted)] disabled:[color:var(--text-muted)]
 */
function TabsTrigger({
  className,
  ...props
}: TabsPrimitive.Tab.Props) {
  // --- Render ---
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        `relative inline-flex h-full flex-1
        items-center justify-center gap-2
        border border-border
        group-data-horizontal/tabs:-ms-px group-data-horizontal/tabs:first:ms-0
        hover:z-10 data-active:z-20
        group-data-horizontal/tabs:first:rounded-s-xl group-data-horizontal/tabs:last:rounded-e-xl
        group-data-vertical/tabs:rounded-xl
        px-6 py-2
        text-sm font-medium whitespace-nowrap
        [color:var(--text-primary)]
        transition-all duration-150
        select-none
        cursor-pointer

        group-data-vertical/tabs:w-full
        group-data-vertical/tabs:justify-start

        [&_svg]:pointer-events-none
        [&_svg]:shrink-0
        [&_svg:not([class*='size-'])]:size-4

        enabled:hover:[background-color:var(--bg-primary-saturated)]
        enabled:hover:[color:var(--text-inverse)]

        focus-visible:outline-none
        focus-visible:ring-4
        focus-visible:ring-[var(--ring-default)]
        focus-visible:border-[var(--maroon-500)]

        enabled:data-active:[background-color:var(--bg-primary)]
        enabled:data-active:[color:var(--text-inverse)]
        enabled:data-active:border-transparent
        enabled:data-active:shadow-sm

        disabled:cursor-not-allowed
        disabled:![background-color:var(--bg-muted)]
        disabled:![color:var(--text-muted)]
        disabled:opacity-100
        disabled:!shadow-none

        data-disabled:cursor-not-allowed
        data-disabled:![background-color:var(--bg-muted)]
        data-disabled:![color:var(--text-muted)]
        data-disabled:opacity-100
        data-disabled:!shadow-none`,
        className
      )}
      {...props}
    />
  );
}

/** Content panel for a tab. */
function TabsContent({
  className,
  ...props
}: TabsPrimitive.Panel.Props) {
  // --- Render ---
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn('flex-1 text-sm outline-none', className)}
      {...props}
    />
  );
}

// ─── Tab (main export – data-driven utility) ──────────────────────────────────

export interface TabItem {
  /** Text label shown on the tab. */
  label: string;
  /** Uniquely identifies the tab. Optional, defaults to label or index. */
  value?: string;
  /** Optional icon shown before the label. */
  icon?: React.ReactNode;
  /** Optional panel content rendered when the tab is active. */
  content?: React.ReactNode;
  /** Whether this specific tab is disabled. */
  disabled?: boolean;
}

export interface TabProps {
  /** Ordered list of tab items. */
  items: TabItem[];
  /** Default active tab value. */
  defaultValue?: string;
  /** Controlled active tab value. */
  value?: string;
  /** Callback fired when active tab changes. */
  onValueChange?: (value: string) => void;
  /** Layout orientation. @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** Extra classes on the outer wrapper. */
  className?: string;
}

export function Tab({
  items,
  defaultValue,
  value,
  onValueChange,
  orientation = 'horizontal',
  className,
}: TabProps) {
  // --- Logic ---
  if (!items || items.length === 0) {
    return null;
  }

  // Use the first item's value or label (or index) as the fallback default active tab
  const fallbackDefaultValue =
    defaultValue ?? items[0].value ?? items[0].label ?? '0';

  // --- Render ---
  return (
    <Tabs
      defaultValue={fallbackDefaultValue}
      value={value}
      onValueChange={onValueChange}
      orientation={orientation}
      className={className}
    >
      <TabsList>
        {items.map((item, idx) => {
          const itemVal = item.value ?? item.label ?? idx.toString();
          return (
            <TabsTrigger
              key={itemVal}
              value={itemVal}
              disabled={item.disabled}
            >
              {item.icon}
              {item.label}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {items.map((item, idx) => {
        const itemVal = item.value ?? item.label ?? idx.toString();
        return (
          item.content && (
            <TabsContent key={itemVal} value={itemVal}>
              {item.content}
            </TabsContent>
          )
        );
      })}
    </Tabs>
  );
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export { Tabs, TabsList, TabsTrigger, TabsContent };
