'use client';

import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { SearchInput } from './ui/input-search';

interface GlobalSearchProps {
  queryName?: string;
}

export default function GlobalSearch({
  queryName = 'search',
}: GlobalSearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');

    if (term) {
      params.set(queryName, term);
    } else {
      params.delete(queryName);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <SearchInput
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleSearch(e.target.value)
      }
      defaultValue={searchParams.get(queryName)?.toString()}
    />
  );
}
