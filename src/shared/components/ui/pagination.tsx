/**
 * Pagination – Usage Guide
 * ─────────────────────────────────────────────────────────────
 * Import and use:
 *
 *   import { Pagination } from '@/shared/components/ui/pagination';
 *  import React, { useState } from 'react';
 *
 *  const [page, setPage] = useState(1);
 *   <Pagination
 *     currentPage={page}
 *     totalPages={10}
 *     onPageChange={(newPage) => setPage(newPage)}
 *   />
 */

'use client';

import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

import { cn } from '@/shared/lib/utils/utils';
import { useFormatter, useLocale, useTranslations } from 'next-intl';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Calculates which page numbers and ellipses to display.
 */
function getPaginationItems(
  currentPage: number,
  totalPages: number
): (number | 'ellipsis')[] {
  const items: (number | 'ellipsis')[] = [];

  // Show 2 pages before and 2 pages after the active page
  let rangeStart = Math.max(2, currentPage - 2);
  const rangeEnd = Math.min(totalPages - 1, currentPage + 2);

  // Always show the first page
  items.push(1);

  // If there's only a single page gap, fill it instead of using dots
  if (rangeStart === 3) {
    rangeStart = 2;
  }

  // Insert start ellipsis
  if (rangeStart > 2) {
    items.push('ellipsis');
  }

  // Insert the core range
  for (let i = rangeStart; i <= rangeEnd; i++) {
    items.push(i);
  }

  // If there's only a single page gap at the end, fill it
  if (rangeEnd === totalPages - 2) {
    items.push(totalPages - 1);
  } else if (rangeEnd < totalPages - 1) {
    items.push('ellipsis');
  }

  // Always show the last page
  if (totalPages > 1) {
    items.push(totalPages);
  }

  return items;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  // --- Logic ---
  const items = getPaginationItems(currentPage, totalPages);
  const locale = useLocale();
  const format = useFormatter();
  const t = useTranslations('pagination');

  const formatNumber = (num: number) => {
    return format.number(num, {
      numberingSystem: locale === 'ar' ? 'arab' : 'latn',
    });
  };

  // Base styling for all pagination buttons to make them square boxes
  const btnClass =
    'h-9 min-w-8 sm:min-w-10 sm:h-10 px-1 sm:px-0 text-xs sm:text-sm';

  // --- Render ---
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn(
        'flex flex-wrap items-center justify-center gap-1 sm:gap-2',
        className
      )}
    >
      {/* First Page Button */}
      <Button
        variant="outline"
        className={cn(btnClass, '!border-border-muted')}
        disabled={currentPage <= 1}
        onClick={() => onPageChange(1)}
        aria-label={t('first')}
      >
        <ChevronsLeft className="size-4 rtl:-scale-x-100" />
      </Button>

      {/* Previous Page Button */}
      <Button
        variant="outline"
        className={cn(btnClass, '!border-border-muted')}
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label={t('previous')}
      >
        <ChevronLeft className="size-4 rtl:-scale-x-100" />
      </Button>

      {/* Page Numbers & Ellipses */}
      {items.map((item, index) => {
        if (item === 'ellipsis') {
          return (
            <div
              key={`ellipsis-${index}`}
              className="flex h-10 w-10 items-center justify-center text-text-muted"
            >
              <MoreHorizontal className="size-4" />
            </div>
          );
        }

        const isActive = item === currentPage;
        return (
          <Button
            key={item}
            variant={isActive ? 'default' : 'outline'}
            className={cn(
              btnClass,
              !isActive && '!border-border-muted'
            )}
            onClick={() => onPageChange(item)}
            aria-label={t('goToPage', { page: item })}
            aria-current={isActive ? 'page' : undefined}
          >
            {formatNumber(item)}
          </Button>
        );
      })}

      {/* Next Page Button */}
      <Button
        variant="outline"
        className={cn(btnClass, '!border-border-muted')}
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label={t('next')}
      >
        <ChevronRight className="size-4 rtl:-scale-x-100" />
      </Button>

      {/* Last Page Button */}
      <Button
        variant="outline"
        className={cn(btnClass, '!border-border-muted')}
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(totalPages)}
        aria-label={t('last')}
      >
        <ChevronsRight className="size-4 rtl:-scale-x-100" />
      </Button>
    </nav>
  );
}
