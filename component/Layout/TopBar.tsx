/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React from 'react';
import { Button as PrimerButton, Header } from '@primer/react';
import Image from 'next/image';
import logo from '@/component/Icon/asset/app_icon.svg';
import { Headline_00 } from '@/component/Typography';
import { pallete } from '@/styles/Color';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { APP_STORE_URL, BASE_URL, GOOGLE_PLAY_URL } from '@/util/string';
import { Button } from '../Button';

// const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
// const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_KEY;

export const TopBar = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // const [isKakaoLogin, setIsKakaoLogin] = useState<boolean>(false);
  // const login = () => {
  //   if (isKakaoLogin) {
  //     localStorage.removeItem('accessToken');
  //     setIsKakaoLogin(false);
  //   } else {
  //     window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  //   }
  // };

  const passwordLogin = () => {
    if (localStorage.getItem('accessToken')) {
      localStorage.removeItem('accessToken');
      setIsLogin(false);
      router.push('/admin');
    } else {
      axios
        .post(`${BASE_URL}/api/v1/admin/login`, {
          password: prompt('비밀 번호를 입력하세요.'),
        })
        .then((res) => {
          alert('로그인에 성공하였습니다!');
          localStorage.setItem('accessToken', res.data.data.accessToken);
          setIsLogin(true);
        })
        .catch((reason) => alert(reason.response.data.message));
    }
  };

  // https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
  useEffect(() => {
    if (localStorage.getItem('accessToken') !== undefined) {
      setIsLogin(true);
    }
  }, []);

  // useEffect(() => {
  //   const { code } = router.query;
  //   if (localStorage.getItem('accessToken')) {
  //     // setIsKakaoLogin(true);
  //     setIsLogin(true);
  //   }

  //   if (code) {
  //     const postLogin = async (accessToken: string) => {
  //       axios
  //         .post(`${SERVER_URI}/api/v1/auth/oauth`, {
  //           social: 'KAKAO',
  //           accessToken: accessToken,
  //         })
  //         .then((res) => res.data)
  //         .then((data) => {
  //           alert('로그인에 성공하였습니다!');
  //           localStorage.setItem('accessToken', data.accessToken);
  //           setIsKakaoLogin(true);
  //         })
  //         .catch((reason) => alert(reason.response.data.message));
  //     };
  //     const postAuthCode = async () => {
  //       axios
  //         .post(
  //           'https://kauth.kakao.com/oauth/token',
  //           {
  //             grant_type: 'authorization_code',
  //             client_id: KAKAO_KEY,
  //             redirect_uri: REDIRECT_URI,
  //             code: code,
  //           },
  //           {
  //             headers: {
  //               'Content-Type':
  //                 'application/x-www-form-urlencoded;charset=utf-8',
  //             },
  //           },
  //         )
  //         .then((res) => res.data)
  //         .then((data) => data.access_token)
  //         .then((kakaoAccessToken) => postLogin(kakaoAccessToken))
  //         .catch((reason) => alert(reason.response.data.message));
  //     };

  //     postAuthCode();
  //   }
  // }, [router]);

  return (
    <>
      <Header sx={{ backgroundColor: pallete['yello-sub-400'] }}>
        <Header.Item>
          <Button
            size='None'
            backgroundColor=''
            onClick={() => router.push('/admin')}
          >
            <Image alt='logo' src={logo} width={48} height={48} />
            <Headline_00>{'Yello 어드민'}</Headline_00>
          </Button>
        </Header.Item>

        <Header.Item>
          <Button
            size='None'
            backgroundColor=''
            onClick={() => router.push(GOOGLE_PLAY_URL)}
          >
            {'Play Store'}
          </Button>
        </Header.Item>
        <Header.Item>
          <Button
            size='None'
            backgroundColor=''
            onClick={() => router.push(APP_STORE_URL)}
          >
            {'App Store'}
          </Button>
        </Header.Item>
        <Header.Item>
          {/* <Button variant="outline" onClick={() => login()}>
            {isKakaoLogin ? "카카오 로그아웃" : "카카오 로그인"}
          </Button> */}
          <PrimerButton
            variant='default'
            onClick={() => passwordLogin()}
            suppressHydrationWarning
          >
            {isLogin ? '비밀번호 로그아웃' : '비밀번호 로그인'}
          </PrimerButton>
        </Header.Item>
      </Header>
    </>
  );
};
