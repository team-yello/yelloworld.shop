import React from 'react';
import { Metadata } from 'next';
import { BaseStyles, ThemeProvider } from '@primer/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '@/styles/globals.css';
import { StyledComponentsRegistry } from '@/component/Provider/StyledComponentsRegistry';
import { ReactQueryClientProvider } from '@/component/Provider/ReactQueryClientProvider';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'YELL:O - 너의 [ ??? ]에 설렜어',
  description:
    'YELLO (옐로)는 특정 그룹 및 대학교에 소속된 친구들과 함께 즐길 수 있는 익명기반 투표 서비스 입니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <head>
        <Script
          async
          strategy='beforeInteractive'
          crossOrigin='anonymous'
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8374722078438476'
        ></Script>
      </head>
      <body>
        <Analytics />
        <SpeedInsights />
        <ReactQueryClientProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <StyledComponentsRegistry>
            <ThemeProvider>
              <BaseStyles>{children}</BaseStyles>
            </ThemeProvider>
          </StyledComponentsRegistry>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
