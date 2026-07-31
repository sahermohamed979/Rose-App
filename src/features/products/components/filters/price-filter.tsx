'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

const DEBOUNCE_MS = 400;

type PriceKey = 'minPrice' | 'maxPrice';

export default function PriceFilter(): React.JSX.Element {
  // Translation
  const t = useTranslations('ProductsFilters');

  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Variables
  const minPrice: string = searchParams.get('minPrice') ?? '';
  const maxPrice: string = searchParams.get('maxPrice') ?? '';
  const hasActiveFilter: boolean = !!(minPrice || maxPrice);

  // Refs
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const pendingRef = useRef<Record<PriceKey, string>>({
    minPrice,
    maxPrice,
  });

  // Keep pending values in sync with URL changes
  useEffect(() => {
    pendingRef.current = {
      minPrice,
      maxPrice,
    };
  }, [minPrice, maxPrice]);

  // Functions
  const pushParams = (params: URLSearchParams): void => {
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleChange = (key: PriceKey, value: string): void => {
    pendingRef.current[key] = value;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      const { minPrice, maxPrice } = pendingRef.current;

      if (minPrice) {
        params.set('minPrice', minPrice);
      } else {
        params.delete('minPrice');
      }

      if (maxPrice) {
        params.set('maxPrice', maxPrice);
      } else {
        params.delete('maxPrice');
      }

      pushParams(params);
    }, DEBOUNCE_MS);
  };

  const handleReset = (): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    pendingRef.current = {
      minPrice: '',
      maxPrice: '',
    };

    const params = new URLSearchParams(searchParams.toString());
    params.delete('minPrice');
    params.delete('maxPrice');

    pushParams(params);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="border-t border-border-subtle">
      <div className="flex items-center justify-between mb-2 mt-3">
        <h3 className="text-lg font-semibold text-text-plain">
          {t('price')}
        </h3>

        {hasActiveFilter && (
          <button
            type="button"
            onClick={handleReset}
            className="text-sm font-semibold flex items-center gap-1 me-4 text-red-600"
          >
            <X size={20} /> {t('reset')}
          </button>
        )}
      </div>

      <div className="flex justify-between gap-4">
        <div className="space-y-2 w-full">
          <Label htmlFor="minPrice">{t('priceFrom')}</Label>
          <Input
            type="number"
            id="minPrice"
            placeholder="0"
            defaultValue={minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
          />
        </div>

        <div className="space-y-2 w-full">
          <Label htmlFor="maxPrice">{t('priceTo')}</Label>
          <Input
            type="number"
            id="maxPrice"
            placeholder="1000000"
            defaultValue={maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
