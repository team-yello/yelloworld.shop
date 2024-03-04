import React from 'react';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'YELL:O 학교 대항전';
export const size = {
  width: 1003,
  height: 526,
};
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: { groupId: string | undefined };
}) {
  // https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-image-generation
  const pretendardExtraBold = fetch(
    new URL('../../public/Pretendard-ExtraBold.subset.woff', import.meta.url),
  ).then((res) => res.arrayBuffer());
  const backgroundImage = await fetch(
    new URL('../../public/og_background.png', import.meta.url),
  ).then((res) => res.arrayBuffer());
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: params.groupId === undefined ? 80 : 96,
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
