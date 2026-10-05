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
      <NextIntlClientProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>{' '}
        </ThemeProvider>
      </NextIntlClientProvider>
    </ReactQueryProvider>
  );
}
