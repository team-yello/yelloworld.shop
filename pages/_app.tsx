import React, { useState } from 'react';
import { ThemeProvider } from '@primer/react';
import type { AppProps } from 'next/app';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <>
      <Head>
        <meta name='google-adsense-account' content='ca-pub-8374722078438476' />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <HydrationBoundary state={pageProps.dehydratedState}>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}
