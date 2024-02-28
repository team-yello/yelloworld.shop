import React from 'react';
import { useRouter } from 'next/router';

import { Headline_00 } from '@/component/Typography';
import TopBar from '@/component/TopBar';
import Menu from '@/component/Menu';

export default function Home() {
  const router = useRouter();

  return (
    <div className='bg-white'>
      <TopBar router={router} />
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
          <Headline_00>{'Yello 어드민에 오신걸 환영합니다.'}</Headline_00>
        </div>
      </div>
    </div>
  );
}
