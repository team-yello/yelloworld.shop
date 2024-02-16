import { pallete } from '@/styles/Color';
import { BodyMedium, Headline_02, Subtitle_02 } from '@/styles/Typography';
import Image from 'next/image';
import React, { forwardRef } from 'react';

interface User {
  id: number;
  name: string;
  yelloId: string;
  group: string;
  imageUrl: string;
  createdAt: string;
  deletedAt: string;
}

// eslint-disable-next-line react/display-name
const Card = forwardRef(
  (
    {
      user,
      onClick,
    }: {
      user: User;
      onClick?: () => void;
    },
    ref?,
  ) => {
    return (
      <div
        style={{
          width: '300px',
          height: '80px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: pallete.white,
        }}
        onClick={onClick}
        ref={ref as React.LegacyRef<HTMLDivElement>}
      >
        <Headline_02 style={{ width: '50px', marginLeft: '16px' }}>
          {user?.id}
        </Headline_02>

        <Image src={user.imageUrl} alt={'image'} width={48} height={48} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Subtitle_02 style={{ marginLeft: '12px', width: '150px' }}>
            {'@' + user?.yelloId}
          </Subtitle_02>
          <BodyMedium style={{ marginLeft: '30px' }}>{user?.name}</BodyMedium>
        </div>
      </div>
    );
  },
);

export default Card;
