import React from 'react';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'YELL:O 학교 대항전';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: { groupId: string | undefined };
}) {
  const pretendardExtraBold = fetch(
    new URL('../../public/Pretendard-ExtraBold.otf', import.meta.url),
  ).then((res) => res.arrayBuffer());
  const backgroundImage = await fetch(
    new URL('../../public/og_background.png', import.meta.url),
  ).then((res) => res.arrayBuffer());
  console.log(params);
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: params.groupId === undefined ? 96 : 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
        }}
      >
        <img
          width={'100%'}
          height={'100%'}
          src={backgroundImage as unknown as string}
          style={{ position: 'absolute' }}
        />
        <div
          style={{ marginTop: '240px', color: 'white', textAlign: 'center' }}
        >
          {params.groupId === undefined
            ? '학교대항전에 참여해보세요!'
            : decodeURIComponent(params.groupId)}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Pretendard',
          data: await pretendardExtraBold,
          style: 'normal',
          weight: 800,
        },
      ],
    },
  );
}
