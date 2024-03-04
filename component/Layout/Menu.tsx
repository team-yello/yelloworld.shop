'use client';

import { pallete } from '@/styles/Color';
import { BodyLarge } from '@/component/Typography';
import { ActionList } from '@primer/react';
import React from 'react';
import { useRouter } from 'next/navigation';

export const Menu = () => {
  const router = useRouter();
  return (
    <>
      <div
        className='bg-white'
        style={{
          width: '250px',
          borderRight: `1px solid ${pallete['grayscales-400']}`,
          borderBottom: `1px solid ${pallete['grayscales-400']}`,
        }}
      >
        <ActionList>
          <ActionList.Item onClick={() => router.push('/admin/user')}>
            <BodyLarge>{'유저'}</BodyLarge>
          </ActionList.Item>
          <ActionList.Item onClick={() => router.push('/admin/cooldown')}>
            <BodyLarge>{'쿨다운'}</BodyLarge>
          </ActionList.Item>
          <ActionList.Item onClick={() => router.push('/admin/question')}>
            <BodyLarge>{'질문'}</BodyLarge>
          </ActionList.Item>
          <ActionList.Item onClick={() => router.push('/admin/notification')}>
            <BodyLarge>{'푸쉬 알람'}</BodyLarge>
          </ActionList.Item>
        </ActionList>
      </div>
    </>
  );
};
