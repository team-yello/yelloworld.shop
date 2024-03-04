/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import Card from '@/component/Card';
import { pallete } from '@/styles/Color';
import { Headline_00, Subtitle_01 } from '@/component';
import { Button, Spinner, TextInput } from '@primer/react';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userFetcher } from '@/repository/user';
import { sendNotification } from '@/repository/notification';
import { User } from '@/repository/schema';

export default function Page() {
  const [userPage, setUserPage] = useState(0);
  const [userList, setUserList] = useState<User[]>([]);
  const [selectedUserList, setSelectedUserList] = useState<User[]>([]);
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [lastUser, setLastUser] = useState<HTMLDivElement | null>(null);

  const onClickNotificationSend = async () => {
    await sendNotification(
      selectedUserList.map((user) => user.id),
      title,
      message,
    )
      .then((data) => {
        setSelectedUserList([]);
        setTitle('');
        setMessage('');
        alert('전송 성공!');
      })
      .catch((reason) => alert(reason.response.data.message));
  };

  const { isLoading, isError, data, error, isSuccess } = useQuery({
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
      <Headline_00>{'푸쉬 알람'}</Headline_00>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: pallete['grayscales-500'],
          padding: '50px 50px 50px',
          borderRadius: '20px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: pallete['semantic-gender-male-500'],
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
                      userList.length - 1 === index ? setLastUser : undefined
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
              backgroundColor: pallete['semantic-gender-female-500'],
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
            borderTop: `3px solid ${pallete['grayscales-400']}`,
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
          sx={{ backgroundColor: pallete['semantic-green-500'] }}
          onClick={() => {
            onClickNotificationSend();
          }}
        >
          {'전송'}
        </Button>
      </div>
    </>
  );
}
