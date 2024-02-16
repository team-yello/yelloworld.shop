import { pallete } from '@/styles/Color';
import { BodyLarge } from '@/styles/Typography';
import { ActionList } from '@primer/react';
import Link from 'next/link';
import React from 'react';

const Menu = () => {
  return (
    <>
      <div
        style={{
          width: '250px',
          borderRight: `1px solid ${pallete.grayscales_400}`,
          borderBottom: `1px solid ${pallete.grayscales_400}`,
        }}
      >
        <ActionList>
          <ActionList.Item>
            <Link href='/admin/user'>
              <BodyLarge>{'유저'}</BodyLarge>
            </Link>
          </ActionList.Item>
          <ActionList.Item>
            <Link href='/admin/cooldown'>
              <BodyLarge>{'쿨다운'}</BodyLarge>
            </Link>
          </ActionList.Item>
          <ActionList.Item>
            <Link href='/admin/question'>
              <BodyLarge>{'질문'}</BodyLarge>
            </Link>
          </ActionList.Item>
          <ActionList.Item>
            <Link href='/admin/notification'>
              <BodyLarge>{'푸쉬 알람'}</BodyLarge>
            </Link>
          </ActionList.Item>
        </ActionList>
      </div>
    </>
  );
};

export default Menu;
