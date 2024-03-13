'use client';

import React from 'react';
import { BaseStyles, ThemeProvider } from '@primer/react';

export function PrimerStyleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider colorMode='auto' preventSSRMismatch>
      <BaseStyles>{children}</BaseStyles>
    </ThemeProvider>
  );
}
