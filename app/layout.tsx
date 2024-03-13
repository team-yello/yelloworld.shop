import React from 'react';
import { Metadata } from 'next';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '@/styles/globals.css';
import { StyledComponentsRegistry } from '@/component/Provider/StyledComponentsRegistry';
import { ReactQueryClientProvider } from '@/component/Provider/ReactQueryClientProvider';
import { PrimerStyleProvider } from '@/component/Provider/PrimerStyleProvider';
import { WEB_URL } from '@/util/string';

export const metadata: Metadata = {
  metadataBase: new URL(WEB_URL!),
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
      <body>
        <Analytics />
        <SpeedInsights />
        <ReactQueryClientProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <StyledComponentsRegistry>
            <PrimerStyleProvider>{children}</PrimerStyleProvider>
          </StyledComponentsRegistry>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
