/* eslint-disable react/react-in-jsx-scope */
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
  // https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-image-generation
  // const pretendardExtraBold = fetch(
  //   new URL('../../public/Pretendard-ExtraBold.edited.woff', import.meta.url),
  // ).then((res) => res.arrayBuffer());
  const backgroundImage = await fetch(
    new URL('../../public/og_background_2.png', import.meta.url),
  ).then((res) => res.arrayBuffer());

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
      </div>
    ),
    {
      ...size,
      // fonts: [
      //   {
      //     name: 'Pretendard',
      //     data: await pretendardExtraBold,
      //     style: 'normal',
      //     weight: 800,
      //   },
      // ],
    },
  );
}
