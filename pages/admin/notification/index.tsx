/* eslint-disable react-hooks/rules-of-hooks */
import Card from '@/component/Card';
import Menu from '@/component/Menu';
import TopBar from '@/component/TopBar';
import { pallete } from '@/styles/Color';
import { Headline_00, Subtitle_01 } from '@/styles/Typography';
import { Button, Spinner, TextInput } from '@primer/react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface Response<T> {
  status: number;
  message: string;
  data: T;
}

interface User {
  id: number;
  name: string;
  yelloId: string;
  group: string;
  imageUrl: string;
  createdAt: string;
  deletedAt: string;
}

interface UserResponse {
  pageCount: number;
  totalCount: number;
  userList: User[];
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const index = () => {
  const [userPage, setUserPage] = useState(0);
  const [userList, setUserList] = useState<User[]>([]);
  const [selectedUserList, setSelectedUserList] = useState<User[]>([]);
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [lastUser, setLastUser] = useState<HTMLDivElement | null>(null);
  const router = useRouter();

  const userFetcher = async ({ queryKey }: { queryKey: any }) => {
    const [_key, { page, field, value }] = queryKey;

    let params: any = { page };

    if (field !== '' && value !== '') {
      params.field = field;
      params.value = value;
    }

    return axios
      .get(`${BASE_URL}/api/v1/admin/user`, {
        params: params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => res.data);
  };

  const onClickNotificationSend = () => {
    axios
      .post(
        `${BASE_URL}/api/v1/admin/notification`,
        {
          userIdList: selectedUserList.map((user) => user.id),
          title: title,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      )
      .then((res) => res.data)
      .then((data) => {
        setSelectedUserList([]);
        setTitle('');
        setMessage('');
        alert('전송 성공!');
      })
      .catch((reason) => alert(reason.response.data.message));
  };

  const { isLoading, isError, data, error, isSuccess } = useQuery<
    Response<UserResponse>,
    AxiosError<Response<UserResponse>>
  >({
    queryKey: ['user', { page: userPage, field: 'yelloId', value: '' }],
    queryFn: userFetcher,
    retry: false,
  });

  useEffect(() => {
    let observer: IntersectionObserver;
    if (lastUser) {
      observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setUserPage(userPage + 1);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 },
      );
      observer.observe(lastUser);
    }
    return () => observer && observer.disconnect();
  }, [lastUser]);

  useEffect(() => {
    if (isSuccess) {
      setUserList([...userList.concat(data?.data.userList)]);
    }
  }, [isSuccess, userPage]);

  if (isLoading && userPage === 0) {
    return (
      <Spinner size={'large'} sx={{ padding: '300px 400px 300px 400px' }} />
    );
  }

  if (isError) {
    return (
      <>
        <div
          style={{
            backgroundColor: pallete.semantic_red_100,
            padding: '100px 150px 100px 150px',
            borderRadius: '20px',
          }}
        >
          <Headline_00>에러</Headline_00>
          <Subtitle_01 style={{ color: pallete.semantic_red_500 }}>
            {error?.response?.data?.message}
          </Subtitle_01>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar router={router} />
      <div style={{ display: 'flex' }}>
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
          <Headline_00>{'푸쉬 알람'}</Headline_00>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: pallete.grayscales_500,
              padding: '50px 50px 50px',
              borderRadius: '20px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: pallete.semantic_gender_male_500,
                }}
              >
                <Headline_00>{'유저'}</Headline_00>
                <div style={{ height: '600px', overflowY: 'scroll' }}>
                  {userList.map((user, index) => {
                    return (
                      <Card
                        key={user.id + index}
                        user={user}
                        onClick={() => {
                          if (
                            selectedUserList.find(
                              (selectedUser) => selectedUser.id === user.id,
                            )
                          ) {
                            alert('이미 보낼유저에 담았음');
                          } else {
                            setSelectedUserList([...selectedUserList, user]);
                          }
                        }}
                        ref={
                          userList.length - 1 === index
                            ? setLastUser
                            : undefined
                        }
                      />
                    );
                  })}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: pallete.semantic_gender_female_500,
                  marginLeft: '50px',
                }}
              >
                <Headline_00>{'보낼 유저'}</Headline_00>
                <div
                  style={{
                    height: '600px',
                    overflowY: 'scroll',
                  }}
                >
                  {selectedUserList.map((user, index) => {
                    return (
                      <Card
                        key={user.id + index}
                        user={user}
                        onClick={() => {
                          console.log(user);
                          setSelectedUserList(
                            selectedUserList.filter(
                              (selectedUser) => selectedUser.id !== user.id,
                            ),
                          );
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              style={{
                borderTop: `3px solid ${pallete.grayscales_400}`,
                margin: '30px 0 30px 0',
              }}
            />

            <Headline_00>{'푸쉬 알람 내용'}</Headline_00>

            <div style={{ display: 'flex' }}>
              <Subtitle_01>{'제목'}</Subtitle_01>
              <TextInput
                aria-label='noti-title'
                name='noti-title'
                placeholder='푸쉬 알람 제목'
                autoComplete='noti-title'
                sx={{
                  width: '500px',
                  height: '50px',
                  marginLeft: '50px',
                }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <Subtitle_01>{'내용'}</Subtitle_01>
              <TextInput
                aria-label='noti-content'
                name='noti-content'
                placeholder='푸쉬 알람 내용'
                autoComplete='noti-content'
                sx={{
                  width: '500px',
                  height: '50px',
                  marginLeft: '50px',
                }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button
              sx={{ backgroundColor: pallete.semantic_green_500 }}
              onClick={() => {
                onClickNotificationSend();
              }}
            >
              {'전송'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
