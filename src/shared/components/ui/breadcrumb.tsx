/**
 * Breadcrumb – Usage Guide
 * ─────────────────────────────────────────────────────────────
 * Import and use:
 *
 *   import { Breadcrumb } from '@/shared/components/ui/breadcrumb';
 *
 *   <Breadcrumb
 *     items={[
 *       { label: 'Home',  href: '/' },
 *       { label: 'Tasks', href: '/tasks' },
 *       { label: 'Task 2' },  // ← last item: no href → maroon-500, non-interactive
 *     ]}
 *     maxVisible={4}  // optional – collapse middle items when length > 4 (default: 4)
 *   />
 */

'use client';

import * as React from 'react';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';

// ─── Primitive sub-components ─────────────────────────────────────────────────

/** <nav> landmark wrapper. */
function BreadcrumbRoot({
  className,
  ...props
}: React.ComponentProps<'nav'>) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={`w-full ${className ?? ''}`}
      {...props}
    />
  );
}

/** <ol> flex row; wraps on narrow screens. */
function BreadcrumbList({
  className,
  ...props
}: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={`flex flex-wrap items-center gap-1 text-sm min-w-0 ${className ?? ''}`}
      {...props}
    />
  );
}

/** <li> wrapper for one crumb. */
function BreadcrumbItem({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={`inline-flex items-center gap-1 min-w-0 ${className ?? ''}`}
      {...props}
    />
  );
}

/**
 * Clickable ancestor crumb. Color: --zinc-500.
 * Pass a `render` prop to swap the tag (e.g. Next.js <Link>).
 */
function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<'a'>) {
  return useRender({
    defaultTagName: 'a',
    props: mergeProps<'a'>(
      {
        className: `
          font-medium leading-none whitespace-nowrap
          [color:var(--text-soft)]
          hover:[color:var(--text-default)]
          transition-colors duration-150
          truncate max-w-[8rem] sm:max-w-none
          rounded-sm
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--maroon-500)]/40
          ${className ?? ''}
        `,
      },
      props
    ),
    render,
    state: { slot: 'breadcrumb-link' },
  });
}

/** Non-interactive current-page crumb. Color: --maroon-500. */
function BreadcrumbPage({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={`
        font-semibold leading-none whitespace-nowrap
        [color:var(--maroon-500)]
        truncate max-w-[12rem] sm:max-w-none
        ${className ?? ''}
      `}
      {...props}
    />
  );
}

/** ">" icon divider. Decorative – hidden from assistive tech. Accepts custom children. */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={`[&>svg]:size-3.5 [&>svg]:shrink-0 [color:var(--text-soft)] ${className ?? ''}`}
      {...props}
    >
      {/* rtl:rotate-180 flips the chevron for right-to-left layouts */}
      {children ?? <ChevronRightIcon className="rtl:rotate-180" />}
    </li>
  );
}

/** Static "…" indicator (visual only). The main Breadcrumb uses a <button> when it's interactive. */
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={`inline-flex size-5 items-center justify-center [&>svg]:size-4 [color:var(--text-soft)] ${className ?? ''}`}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  );
}

// ─── Breadcrumb (main export – data-driven) ───────────────────────────────────

export interface BreadcrumbItem {
  /** Text shown for the crumb. */
  label: string;
  /** Link target. Omit on the last item – it renders as a non-interactive maroon-500 page crumb. */
  href?: string;
}

export interface BreadcrumbProps {
  /** Ordered trail from root to current page. */
  items: BreadcrumbItem[];
  /** Collapse middle items when length exceeds this. First + last two always shown. @default 4 */
  maxVisible?: number;
  /** Extra classes on the <nav> wrapper. */
  className?: string;
}

export function Breadcrumb({
  items,
  maxVisible = 4,
  className,
}: BreadcrumbProps) {
  // Tracks whether the user clicked "…" to reveal all crumbs
  const [expanded, setExpanded] = React.useState(false);

  if (!items || items.length === 0) {
    return null;
  }

  const lastIndex = items.length - 1;

  // Collapse when there are more items than allowed and the user hasn't expanded yet.
  // Collapsed layout: [first] [null → "…" button] [second-to-last] [last]
  // null is a sentinel that tells the renderer to draw the ellipsis button.
  const shouldCollapse = !expanded && items.length > maxVisible;

  const visibleItems: Array<BreadcrumbItem | null> = shouldCollapse
    ? [items[0], null, ...items.slice(lastIndex - 1)]
    : items;

  return (
    <BreadcrumbRoot className={className}>
      <BreadcrumbList>
        {visibleItems.map((item, idx) => {
          // Map render-list index → original items index to detect the last crumb.
          // Collapsed: idx 0 → 0 (root), idx 1 → -1 (ellipsis), idx 2+ → lastIndex-n
          let originalIndex: number;
          if (!shouldCollapse) {
            originalIndex = idx;
          } else {
            if (idx === 0) {
              originalIndex = 0;
            } else if (item === null) {
              originalIndex = -1;
            } else {
              originalIndex =
                lastIndex - (visibleItems.length - 1 - idx);
            }
          }

          const isLast = originalIndex === lastIndex;
          const isEllipsis = item === null;

          return (
            <React.Fragment
              key={isEllipsis ? 'ellipsis' : `crumb-${originalIndex}`}
            >
              {/* Separator before every crumb except the first */}
              {idx > 0 && <BreadcrumbSeparator />}

              <BreadcrumbItem>
                {isEllipsis ? (
                  // Rendered as a <button> (not a static span) so it's keyboard-accessible
                  <button
                    type="button"
                    aria-label="Show hidden breadcrumb items"
                    onClick={() => setExpanded(true)}
                    className={`
                      inline-flex size-5 items-center justify-center
                      [color:var(--text-soft)]
                      hover:[color:var(--text-default)]
                      transition-colors duration-150
                      rounded-md
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[var(--primary-500)]/40
                    `}
                  >
                    <MoreHorizontalIcon className="size-4" />
                    <span className="sr-only">Show more</span>
                  </button>
                ) : isLast ? (
                  <BreadcrumbPage>{item!.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item!.href ?? '#'}>
                    {item!.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export {
  BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
