import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactQueryProvider from './providers/react-query-providers';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from './providers/ThemeProvider';
import AuthProvider from './providers/auth-provider';

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
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>{' '}
          {/* Session provider */}
        </ThemeProvider>
      </NextIntlClientProvider>
    </ReactQueryProvider>
  );
}
