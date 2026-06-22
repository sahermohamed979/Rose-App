import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactQueryProvider from './providers/react-query-providers';
import { NextIntlClientProvider } from 'next-intl';

export default function provides({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <NextIntlClientProvider> {children}</NextIntlClientProvider>
    </ReactQueryProvider>
  );
}
