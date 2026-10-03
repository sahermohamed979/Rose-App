'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Suppress React 19 false-positive warning for next-themes FOUC script
if (
  typeof window !== 'undefined' &&
  process.env.NODE_ENV === 'development'
) {
  // eslint-disable-next-line no-console
  const originalError = console.error;
  // eslint-disable-next-line no-console
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes(
        'Encountered a script tag while rendering React component'
      )
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>{children}</NextThemesProvider>
  );
}
