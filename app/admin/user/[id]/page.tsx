/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { pallete } from '@/styles/Color';
import {
  BodyLarge,
  Headline_00,
  LabelLarge,
  Subtitle_01,
  Subtitle_02,
} from '@/component';
import { Button, Spinner } from '@primer/react';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { deleteUser, userDetailFetcher } from '@/repository/user';

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['userDetail', { userId: id }],
    queryFn: userDetailFetcher,
  });

  if (isLoading) {
    return (
      <Spinner size={'large'} sx={{ padding: '300px 400px 300px 400px' }} />
    );
  }
  const onClickDelete = async (userId: number) => {
    if (confirm(userId + '를 삭제하시겠습니까?')) {
      await deleteUser(userId)
        .then((res) => {
          alert(res.data.message);
          router.back();
        })
        .catch((reason) => {
          alert(reason.response.data.message);
        });
    }
  };

  if (isError) {
    return (
      <>
        <div
          style={{
            backgroundColor: pallete['semantic-red-100'],
            padding: '100px 150px 100px 150px',
            borderRadius: '20px',
          }}
        >
          <Headline_00>에러</Headline_00>
          <Subtitle_01 style={{ color: pallete['semantic-red-500'] }}>
            {error.message}
          </Subtitle_01>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        style={{
          padding: '20px 100px 20px 100px',
          marginTop: '20px',
          backgroundColor: pallete['grayscales-100'],
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button
          sx={{ backgroundColor: pallete['semantic-green-500'] }}
          onClick={() => {
            router.push('/admin/user');
          }}
        >
          {'이전'}
        </Button>
        <Headline_00 style={{ marginTop: '40px' }}>{'기본 정보'}</Headline_00>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'id'}</Subtitle_01>
          <BodyLarge>{data?.data.id}</BodyLarge>
        </div>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'옐로 아이디'}</Subtitle_01>
          <BodyLarge>{data?.data.yelloId}</BodyLarge>
        </div>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'이름'}</Subtitle_01>
          <BodyLarge>{data?.data.name}</BodyLarge>
        </div>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'탈퇴 날짜'}</Subtitle_01>
          <BodyLarge>{data?.data.deletedAt}</BodyLarge>
        </div>

        <Headline_00 style={{ marginTop: '40px' }}>{'개인 정보'}</Headline_00>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'성별'}</Subtitle_01>
          <BodyLarge>{data?.data.gender}</BodyLarge>
        </div>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'이메일'}</Subtitle_01>
          <BodyLarge>{data?.data.email}</BodyLarge>
        </div>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'프로필 사진'}</Subtitle_01>
          <BodyLarge>
            {data?.data.profileImage}
            <Image
              alt={'profileImage'}
              width={128}
              height={128}
              // eslint-disable-next-line
              src={data?.data.profileImage!}
            />
          </BodyLarge>
        </div>

        <Headline_00 style={{ marginTop: '40px' }}>
          {'소셜 로그인 정보'}
        </Headline_00>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>
            {'소셜 로그인 종류'}
          </Subtitle_01>
          <BodyLarge>{data?.data.social}</BodyLarge>
        </div>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>
            {'소셜로그인 ID'}
          </Subtitle_01>
          <BodyLarge>{data?.data.uuid}</BodyLarge>
        </div>

        <Headline_00 style={{ marginTop: '40px' }}>{'학교 정보'}</Headline_00>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'학교 정보'}</Subtitle_01>
          <BodyLarge>{data?.data.group}</BodyLarge>
        </div>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'학교 학번'}</Subtitle_01>
          <BodyLarge>{data?.data.groupAdmissionYear}</BodyLarge>
        </div>

        <Headline_00 style={{ marginTop: '40px' }}>{'결제 정보'}</Headline_00>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'포인트'}</Subtitle_01>
          <BodyLarge>{data?.data.point}</BodyLarge>
        </div>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'열람권 개수'}</Subtitle_01>
          <BodyLarge>{data?.data.ticketCount}</BodyLarge>
        </div>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'구독 현황'}</Subtitle_01>
          <BodyLarge>{data?.data.subscribe}</BodyLarge>
        </div>

        <Headline_00 style={{ marginTop: '40px' }}>
          {'옐로 관련 정보'}
        </Headline_00>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'추천 받은 수'}</Subtitle_01>
          <BodyLarge>{data?.data.recommendCount}</BodyLarge>
        </div>

        <Headline_00 style={{ marginTop: '40px' }}>
          {'푸쉬 알람 정보'}
        </Headline_00>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>
            {'푸쉬 알람 deviceToken'}
          </Subtitle_01>
          <BodyLarge>{data?.data.deviceToken}</BodyLarge>
        </div>

        <Button
          sx={{ backgroundColor: pallete['yello-main-500'] }}
          onClick={() => router.push(`/admin/user/${data?.data.id}/edit`)}
        >
          {'수정'}
        </Button>
        <Button
          sx={{ backgroundColor: pallete['semantic-red-500'] }}
          onClick={() => onClickDelete(data?.data.id as number)}
        >
          {'삭제'}
        </Button>
      </div>
    </>
  );
}
