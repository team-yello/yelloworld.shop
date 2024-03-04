// By default, not-found is a Server Component.
// https://nextjs.org/docs/app/api-reference/file-conventions/not-found

'use client';
import React from 'react';
import Image from 'next/image';

import { BodyMedium, Spacing } from '@/component';
import { Button } from '@/component/Button';

import yello_question_svg from '@/component/Icon/asset/yello-question.svg';
import { pallete } from '@/styles/Color';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className='w-screen h-screen flex flex-col justify-center items-center text-white'>
      <div className='unbounded-600 text-2xl'>{'404 ERROR'}</div>
      <Spacing size={20} />
      <Image
        src={yello_question_svg}
        alt='yello_question'
        width={128}
        height={128}
      />
      <Spacing size={32} />
      <BodyMedium className='text-center text-white'>
        {'다시 접속하거나,\n인터넷 연결을 다시 확인해주세요'}
      </BodyMedium>
      <Spacing size={64} />

      <Link href={'/school-attack'}>
        <Button
          className='text-black'
          size='L'
          backgroundColor={pallete['yello-main-500']}
          // onClick={() => router?.push('/school-attack')}
        >
          {'홈으로 돌아가기'}
        </Button>
      </Link>
    </section>
  );
}
