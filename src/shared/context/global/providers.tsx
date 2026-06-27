import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactQueryProvider from './providers/react-query-providers';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from './providers/ThemeProvider';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <NextIntlClientProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </NextIntlClientProvider>
    </ReactQueryProvider>
  );
}
