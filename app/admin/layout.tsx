'use client';

import React from 'react';
import { Menu, TopBar } from '@/component';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <div className='bg-white' style={{ display: 'flex' }}>
        <Menu />
        <div
          style={{
            width: '100%',
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
