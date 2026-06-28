'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const t = useTranslations('theme');

  return (
    <>
      <div>
        <p className="mb-2 text-xl font-bold ">{t('toggle')}</p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              {t('light')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              {t('dark')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              {t('system')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
