/* eslint-disable react-hooks/rules-of-hooks */
import Menu from '@/component/Menu';
import TopBar from '@/component/TopBar';
import { pallete } from '@/styles/Color';
import {
  BodyMedium,
  Headline_00,
  Headline_01,
  Headline_02,
  Subtitle_01,
  Subtitle_02,
} from '@/component/Typography';
import { SearchIcon, TrashIcon } from '@primer/octicons-react';
import {
  ActionList,
  Avatar,
  Button,
  Pagination,
  Spinner,
  StateLabel,
  TextInput,
} from '@primer/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useRouter } from 'next/router';
dayjs.extend(duration);

interface Cooldown {
  id: number;
  name: string;
  yelloId: string;
  createdAt: string;
}

interface CooldownResponse {
  pageCount: number;
  totalCount: number;
  userList: Cooldown[];
}

interface Response {
  status: number;
  message: string;
  data: CooldownResponse;
}

interface Error {
  message: string;
  response: Response;
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const CooldownPagination = ({
  searchYelloId,
}: {
  searchYelloId: string | undefined;
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(0);

  // eslint-disable-next-line
  const cooldownFetcher = async ({ queryKey }: { queryKey: any }) => {
    const [_key, { page, yelloId }] = queryKey;
    return axios
      .get(`${BASE_URL}/api/v1/admin/cooldown`, {
        params: {
          page: page,
          yelloId: yelloId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => res.data)
      .catch((reason) => reason);
  };
  const { isLoading, isError, data, error } = useQuery<Response, Error>({
    queryKey: ['cooldown', { page: currentPage, yelloId: searchYelloId }],
    queryFn: cooldownFetcher,
  });

  if (isLoading) {
    return (
      <>
        <Spinner size={'large'} sx={{ padding: '300px 400px 300px 400px' }} />
      </>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const onClickDelete = (cooldownId: number) => {
    if (confirm(cooldownId + '를 삭제하시겠습니까?')) {
      axios
        .delete(`${BASE_URL}/api/v1/admin/cooldown`, {
          params: {
            cooldownId: cooldownId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        .then((res) => alert(res.data.message))
        .catch((reason) => {
          alert(reason.response.data.message);
        });
    }
  };

  if (data!.status >= 400) {
    return <span>{'어드민 권한이 없습니다.'}</span>;
  }

  return (
    <>
      {data?.status !== 200 ? (
        <></>
      ) : (
        <>
          <ActionList className='bg-white'>
            <ActionList.Item
              sx={{
                width: '850px',
                height: '50px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                border: `1px solid ${pallete['grayscales-300']}`,
                backgroundColor: pallete['grayscales-300'],
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Headline_02>{'id'}</Headline_02>
                <Subtitle_01 style={{ marginLeft: '20px', width: '150px' }}>
                  {'옐로 아이디'}
                </Subtitle_01>
                <BodyMedium style={{ marginLeft: '30px' }}>{'이름'}</BodyMedium>
                <BodyMedium style={{ marginLeft: '60px' }}>
                  {'남은 시간'}
                </BodyMedium>
              </div>
            </ActionList.Item>
            {data?.data === undefined || data?.data.userList.length === 0 ? (
              <ActionList.Item>
                <ActionList.LeadingVisual>
                  <TrashIcon size={24} />
                </ActionList.LeadingVisual>
                <ActionList.Description>
                  {'검색 결과가 없습니다.'}
                </ActionList.Description>
              </ActionList.Item>
            ) : (
              data &&
              data.data.userList.map((user, index) => {
                return (
                  <ActionList.Item
                    key={user.id + index}
                    sx={{
                      width: '850px',
                      height: '50px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <ActionList.LeadingVisual>
                      <Headline_02>{user.id}</Headline_02>
                    </ActionList.LeadingVisual>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <Subtitle_01
                        style={{ marginLeft: '12px', width: '150px' }}
                      >
                        {'@' + user.yelloId}
                      </Subtitle_01>
                      <BodyMedium style={{ marginLeft: '30px' }}>
                        {user.name}
                      </BodyMedium>
                      <BodyMedium style={{ marginLeft: '30px' }}>
                        {dayjs
                          .duration(dayjs().diff(dayjs(user.createdAt)))
                          .asMinutes() <= 40 ? (
                          <StateLabel status='pullOpened'>
                            {40 -
                              dayjs
                                .duration(dayjs().diff(dayjs(user.createdAt)))
                                .minutes() +
                              '분 남음'}
                          </StateLabel>
                        ) : (
                          <StateLabel status='pullClosed'>{'만료'}</StateLabel>
                        )}
                      </BodyMedium>
                    </div>
                    <ActionList.TrailingVisual>
                      <Button onClick={() => onClickDelete(user.id)}>
                        {'삭제'}
                      </Button>
                    </ActionList.TrailingVisual>
                  </ActionList.Item>
                );
              })
            )}
          </ActionList>
          <Pagination
            pageCount={
              data?.data.pageCount === 0 ? 1 : (data?.data.pageCount as number)
            }
            currentPage={currentPage + 1}
            onPageChange={(e, page) => {
              setCurrentPage(page - 1);
            }}
          />
        </>
      )}
    </>
  );
};

const index = () => {
  const [searchYelloId, setSearchYelloId] = useState<string>('');
  const router = useRouter();
  const inputField = useRef<string>('');

  return (
    <>
      <TopBar router={router} />
      <div className='bg-white' style={{ display: 'flex' }}>
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
          <Headline_00>{'쿨다운'}</Headline_00>
          <CooldownPagination
            searchYelloId={searchYelloId === '' ? undefined : searchYelloId}
          />
          <TextInput
            aria-label='yelloId'
            name='yelloId'
            placeholder='옐로 아이디로 검색하기'
            autoComplete='yelloId'
            size='large'
            onChange={(e) => {
              inputField.current = e.target.value;
            }}
            trailingAction={
              <TextInput.Action
                onClick={(e) => setSearchYelloId(inputField.current)}
                icon={SearchIcon}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default index;
