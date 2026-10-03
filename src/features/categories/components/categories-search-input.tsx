'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useDebouncedCallback } from 'use-debounce';
import { Search, X } from 'lucide-react';

import { useRouter, usePathname } from '@/i18n/navigation';

export function CategoriesSearchInput() {
  // Translation
  const t = useTranslations('categoriesPage');

  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Variables
  const currentSearch = searchParams.get('search') ?? '';

  // Functions
  const handleSearch = useDebouncedCallback((val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val.trim()) {
      params.set('search', val.trim());
      params.delete('page');
    } else {
      params.delete('search');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 400);

  function handleClear() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    params.delete('page');
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
      <input
        type="text"
        defaultValue={currentSearch}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={t('searchPlaceholder')}
        className="h-12 w-full rounded-full border border-border-subtle bg-bg-elevated ps-11 pe-11 text-sm text-text-default shadow-xs transition-all placeholder:text-text-muted focus:border-border-primary focus:outline-none focus:ring-2 focus:ring-maroon-500/20"
      />
      {currentSearch && (
        <button
          type="button"
          onClick={handleClear}
          aria-label={t('clearSearch')}
          className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-text-muted hover:bg-bg-subtle hover:text-text-default cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
