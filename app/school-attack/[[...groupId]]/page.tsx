'use client';

import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { css } from 'styled-components';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  Pagination,
  Spinner,
  TextInput,
  Textarea,
  ThemeProvider,
} from '@primer/react';

import {
  BodyMedium,
  BodySmall,
  Headline_01,
  Headline_02_Light,
  LabelMedium,
  LabelSmall,
  Spacing,
  Subtitle_01,
  Subtitle_02,
} from '@/component';
import { Collapse } from '@/component/Collapse';
import { Button } from '@/component/Button';
import { pallete } from '@/styles/Color';

import {
  MainLayout,
  MoveUpDownWrapper,
  SystemLayout,
  moveUpDown,
} from '../../../styles/SchoolAttack.styled';

import background_main from '@/public/background_main.svg';
import main_logo from '@/public/main_logo.svg';
import message_square_svg from '@/component/Icon/asset/message-square.svg';
import add_and_share_svg from '@/component/Icon/asset/add-and-share.svg';
import search_white_svg from '@/component/Icon/asset/search-white.svg';
import ranking_1_svg from '@/component/Icon/asset/ranking-1.svg';
import ranking_2_svg from '@/component/Icon/asset/ranking-2.svg';
import ranking_3_svg from '@/component/Icon/asset/ranking-3.svg';
import ranking_up_svg from '@/component/Icon/asset/ranking-up.svg';
import ranking_down_svg from '@/component/Icon/asset/ranking-down.svg';
import share_svg from '@/component/Icon/asset/share.svg';

import {
  QueryClient,
  dehydrate,
  keepPreviousData,
  queryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { MUTATION_KEY, QUERY_KEY } from '@/util/string';
import {
  getSchoolAttackStatistics,
  getSchoolAttackStatisticsDetail,
  getSchoolAttackStatisticsLikeGroupName,
} from '@/repository/statistics';
import { redirect, useParams } from 'next/navigation';
import { UserPostCommentRequest } from '@/repository/schema';
import { getUserPostComment, postUserPostComment } from '@/repository/user';

const maxWidth = 425;

export default function Page() {
  const router = useRouter();
  const { groupId } = useParams();

  const queryClient = useQueryClient();
  const [searchKey, setSearchKey] = useState<string>('');
  const [commentPage, setCommentPage] = useState<number>(0);
  const [commentRequest, setCommentRequest] = useState<
    Pick<UserPostCommentRequest, 'userName' | 'content'>
  >({
    userName: '',
    content: '',
  });
  const commentQuery = useQuery({
    queryKey: [QUERY_KEY.SCHOOL_ATTACK_COMMENT, commentPage],
    queryFn: async () => (await getUserPostComment(commentPage)).data,
    refetchOnMount: true,
  });
  const commentMutation = useMutation({
    mutationKey: [MUTATION_KEY.SCHOOL_ATTACK_COMMENT],
    mutationFn: postUserPostComment,
    onSuccess: (data, variables, context) => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEY.SCHOOL_ATTACK_COMMENT],
      });
      alert('댓글이 작성되었습니다!');
      setCommentRequest({
        userName: '',
        content: '',
      });
    },
  });
  const statisticsQuery = useInfiniteQuery({
    queryKey: [QUERY_KEY.SCHOOL_ATTACK_STATISTICS],
    queryFn: async ({ pageParam }) =>
      (await getSchoolAttackStatistics(pageParam)).data,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      if (lastPage.data.statisticsList.length === 0) return undefined;
      return lastPageParam + 1;
    },
  });
  const statisticsDetailQuery = useQuery({
    queryKey: [QUERY_KEY.SCHOOL_ATTACK_STATISTICS_DETAIl, groupId],
    queryFn: async () => {
      return (await getSchoolAttackStatisticsDetail(groupId as string)).data;
    },
    enabled: !!groupId,
  });
  const searchQuery = useInfiniteQuery({
    queryKey: [QUERY_KEY.SCHOOL_ATTACK_SEARCH, searchKey],
    queryFn: async ({ pageParam }) => {
      return (
        await getSchoolAttackStatisticsLikeGroupName(searchKey, pageParam)
      ).data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      if (lastPage.data.statisticsList.length === 0) return undefined;
      return lastPageParam + 1;
    },
    enabled: !!searchKey,
  });
  const firstRankingGroup =
    statisticsQuery.data?.pages[0].data.statisticsList[0];

  const observer = useRef<IntersectionObserver>();
  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          searchQuery.hasNextPage && searchQuery.fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [searchQuery],
  );

  const handleCommentSubmit = () => {
    if (!commentRequest.userName) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    if (!commentRequest.content) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    if (commentRequest.content.length > 70) {
      alert('댓글이 70자가 넘습니다.');
      return;
    }

    if (confirm('댓글을 작성하시겠습니까?')) {
      commentMutation.mutate(commentRequest as UserPostCommentRequest);
    }
  };

  return (
    <ThemeProvider colorMode='dark' preventSSRMismatch>
      <SystemLayout>
        <MainLayout maxWidth={maxWidth}>
          <div
            className='sticky z-10 flex flex-row w-full h-20'
            style={{
              maxWidth: maxWidth,
              top: 'calc(100vh - 5rem)',
              background:
                'linear-gradient(180deg, rgba(25, 25, 25, 0) 0%, #191919 100%)',
            }}
          >
            <Button
              className='flex flex-row w-2/6 h-14 mr-2 rounded-3xl justify-center items-center text-white'
              size='None'
              backgroundColor={pallete['grayscales-700']}
              onClick={async () => {
                await navigator.clipboard.writeText(window.location.href);
                alert('링크가 복사되었습니다!');
              }}
            >
              <Image className='mr-2' src={share_svg} alt='share' />
              {'공유'}
            </Button>
            <Button
              className='w-4/6 h-14 rounded-3xl'
              size='None'
              backgroundColor={pallete['yello-main-500']}
              onClick={() => router.push('/event/university/Booth')}
            >
              {'나도 대항전 참여하기'}
            </Button>
          </div>
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: '-1',
            }}
          >
            <Image
              alt='background_main'
              src={background_main}
              quality={100}
              style={{
                position: 'relative',
                width: '100vw',
                maxWidth: `${maxWidth}px`,
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
          <MoveUpDownWrapper
            style={{
              position: 'absolute',
              top: '100px',
              left: '16%',
              transform: 'translateX(-50%)',
              zIndex: '-1',
            }}
          >
            <Image
              alt='main_logo'
              src={main_logo}
              quality={100}
              style={{
                position: 'relative',
                width: '70vw',
                maxWidth: `${270}px`,
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </MoveUpDownWrapper>
          <section className='px-5 mt-64'>
            {groupId ? (
              <div className='flex flex-col items-center'>
                <div className='flex gap-2'>
                  <Headline_01 className='text-white'>{`${
                    statisticsDetailQuery.data?.data.userGroupName || ''
                  }`}</Headline_01>
                  <Headline_02_Light className='text-white'>
                    {'는'}
                  </Headline_02_Light>
                </div>
                <div className='flex gap-2'>
                  <Headline_02_Light className='text-white'>
                    {'현재'}
                  </Headline_02_Light>
                  <Headline_01 className='text-yello-main-500'>
                    {statisticsDetailQuery.data?.data.rankNumber || 0}
                  </Headline_01>
                  <Headline_01 className='text-yello-main-500'>
                    {'위'}
                  </Headline_01>
                </div>
              </div>
            ) : (
              <div className='flex flex-col items-center'>
                <div className='flex gap-2'>
                  <Headline_02_Light className='text-white'>
                    {'현재'}
                  </Headline_02_Light>
                  <Headline_01 className='text-yello-main-500'>{1}</Headline_01>
                  <Headline_01 className='text-yello-main-500'>
                    {'위'}
                  </Headline_01>
                  <Headline_02_Light className='text-white'>
                    {'학교는'}
                  </Headline_02_Light>
                </div>
                <div className='flex gap-2'>
                  <Headline_01 className='text-white'>{`${firstRankingGroup?.userGroupName}`}</Headline_01>
                  <Headline_02_Light className='text-white'>
                    {'입니다 🔥'}
                  </Headline_02_Light>
                </div>
              </div>
            )}
            <Spacing size={12} />
            <LabelMedium className='text-center text-grayscales-600'>
              {statisticsQuery.isFetching
                ? ''
                : `${new Intl.DateTimeFormat('ko-KR', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                  }).format(
                    new Date(
                      statisticsQuery.data?.pages.at(0)?.data.updatedAt ||
                        '2024-01-01',
                    ),
                  )} 기준`}
            </LabelMedium>
            <Spacing size={20} />
            {groupId ? (
              <ListItem
                groupName={statisticsDetailQuery.data?.data.userGroupName || ''}
                rank={statisticsDetailQuery.data?.data.rankNumber || 0}
                title={statisticsDetailQuery.data?.data.userGroupName || ''}
                score={statisticsDetailQuery.data?.data.score || 0}
              />
            ) : (
              <ListItem
                groupName={firstRankingGroup?.userGroupName || ''}
                rank={firstRankingGroup?.rankNumber || 0}
                title={firstRankingGroup?.userGroupName || ''}
                score={firstRankingGroup?.score || 0}
              />
            )}
          </section>
          <section className='bg-black'>
            <Collapse
              className='flex flex-col items-center justify-start'
              title={
                <Subtitle_02 className='text-grayscales-400'>
                  {'점수 얻는 방법'}
                </Subtitle_02>
              }
            >
              <Subtitle_02 className='text-white mt-6'>
                {'옐로 학교대항전은 점수제로 진행돼요.'}
              </Subtitle_02>
              <div className='flex flex-col bg-graysacles-900 w-full mt-3 pt-5 pb-5'>
                <div className='flex w-full mt-3 mb-3 justify-center'>
                  <Image
                    className='mr-1 ml-5'
                    src={message_square_svg}
                    alt='message_square'
                  />
                  <div className='flex flex-col ml-8'>
                    <BodySmall className='text-grayscales-400 flex'>
                      {'옐로로 쪽지를 보내면 1개 당'}
                      <BodySmall className='text-yello-main-500'>
                        {' 2점'}
                      </BodySmall>
                    </BodySmall>
                    <LabelSmall className='text-grayscales-600'>
                      {'(대항전 진행기간 내)'}
                    </LabelSmall>
                  </div>
                </div>
                <div className='flex w-full mt-3 mb-3 justify-center'>
                  <Image src={add_and_share_svg} alt='add_and_share' />
                  <div className='flex flex-col ml-3'>
                    <BodySmall className='text-grayscales-400'>
                      {`학교 친구가 신규 가입 또는`}
                    </BodySmall>
                    <BodySmall className='text-grayscales-400 flex'>
                      {'대항전 링크를 공유하면'}
                      <BodySmall className='text-yello-main-500 ml-1'>
                        {'1점'}
                      </BodySmall>
                    </BodySmall>
                  </div>
                </div>
              </div>
            </Collapse>
          </section>
          <section className='bg-black px-5 mt-4 mb-10'>
            <TextInput
              className='w-full'
              sx={{
                backgroundColor: pallete.black,
                color: pallete.white,
              }}
              aria-label='groupName'
              name='groupName'
              placeholder='학교를 검색해보세요!'
              autoComplete='groupName'
              size='large'
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
              trailingAction={
                <Button
                  style={{
                    width: '48px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    top: '-4px',
                  }}
                  size='XS'
                  backgroundColor={pallete.black}
                  onClick={(e) => {}}
                >
                  <Image src={search_white_svg} alt='search' />
                </Button>
              }
            />
            {searchKey && (
              <div className='gap-2 w-full h-60 my-2 overflow-y-scroll'>
                {searchQuery.data?.pages.map((page, index) => (
                  <Fragment key={index}>
                    {page.data.statisticsList.map((statistics, index) => {
                      return (
                        <>
                          <ListItem
                            key={index}
                            groupName={statistics.userGroupName}
                            rank={statistics.rankNumber}
                            diffRank={
                              statistics.prevRankNumber - statistics.rankNumber
                            }
                            title={statistics.userGroupName}
                            score={statistics.score}
                            onClick={() => {
                              router.push(
                                `/school-attack/${statistics.userGroupName}`,
                              );
                            }}
                          />
                          <Spacing size={10} />
                        </>
                      );
                    })}
                  </Fragment>
                ))}
                <div ref={lastItemRef} />
              </div>
            )}
          </section>
          <section className='px-5 flex flex-col items-center my-3'>
            <Subtitle_01 className='text-white'>
              {'전국 중/고등학교 TOP 10'}
            </Subtitle_01>
            <div className='flex flex-col w-full mt-5'>
              <div className='flex'>
                <LabelSmall className='text-grayscales-500 ml-4'>
                  {'순위'}
                </LabelSmall>
                <LabelSmall className='text-grayscales-500 ml-4'>
                  {'학교 이름'}
                </LabelSmall>
                <LabelSmall className='text-grayscales-500 ml-auto mr-4'>
                  {'총점'}
                </LabelSmall>
              </div>
            </div>
            <div className='flex flex-col gap-2 w-full mt-2'>
              {statisticsQuery.data?.pages.map((page, index) => (
                <Fragment key={index + page.data.pageCount}>
                  {page.data.statisticsList.map((statistics, index) => {
                    return (
                      <>
                        <ListItem
                          groupName={statistics.userGroupName}
                          rank={statistics.rankNumber}
                          diffRank={
                            statistics.prevRankNumber - statistics.rankNumber
                          }
                          title={statistics.userGroupName}
                          score={statistics.score}
                          onClick={() => {
                            router.push(
                              `/school-attack/${statistics.userGroupName}`,
                            );
                          }}
                        />
                      </>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </section>
          <section className='px-5 flex flex-col items-center my-3'>
            <div className='flex justify-between w-full'>
              <TextInput
                className='w-40'
                sx={{
                  backgroundColor: pallete.black,
                  color: pallete.white,
                  border: 0,
                }}
                aria-label='userName'
                name='userName'
                placeholder='닉네임을 입력해주세요'
                autoComplete='userName'
                size='large'
                value={commentRequest.userName!}
                onChange={(e) => {
                  setCommentRequest({
                    ...commentRequest,
                    userName: e.target.value,
                  });
                }}
              />
              <Button
                size='None'
                backgroundColor={pallete['yello-main-500']}
                className='w-16'
                onClick={handleCommentSubmit}
              >
                {'등록'}
              </Button>
            </div>
            <Textarea
              sx={{
                width: '100%',
                height: '96px',
                backgroundColor: pallete.black,
                color: pallete.white,
                border: 0,
                marginTop: '12px',
              }}
              aria-label='content'
              name='content'
              placeholder='비하 및 욕설은 자제해주세요! (최대 70자)'
              autoComplete='content'
              value={commentRequest.content!}
              onChange={(e) => {
                setCommentRequest({
                  ...commentRequest,
                  content: e.target.value,
                });
              }}
            />
          </section>
          <section className='px-5 flex flex-col items-center my-3'>
            {commentQuery.isFetching ? (
              <Spinner />
            ) : (
              <>
                {commentQuery.data?.data.postCommentList?.map(
                  (comment, index) => {
                    return (
                      <div
                        className='w-full p-3 bg-graysacles-900 mb-2'
                        key={index + 20}
                      >
                        <div className='flex justify-between mb-2'>
                          <BodySmall className='text-gray-600'>
                            {comment.userName}
                          </BodySmall>
                          <LabelSmall className='text-gray-600'>
                            {new Intl.DateTimeFormat('ko-KR', {
                              year: 'numeric',
                              month: 'numeric',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                              second: 'numeric',
                            }).format(
                              new Date(comment.createdAt || '2024-01-01'),
                            )}
                          </LabelSmall>
                        </div>
                        <BodySmall className='text-gray-100'>
                          {comment.content}
                        </BodySmall>
                      </div>
                    );
                  },
                )}
              </>
            )}
          </section>
          <div className='w-full mb-28'>
            {commentQuery.isFetching ? (
              <Spinner />
            ) : (
              <Pagination
                marginPageCount={0}
                pageCount={commentQuery.data?.data.pageCount as number}
                currentPage={commentPage + 1}
                onPageChange={(e, n) => {
                  const next = n - 1;

                  if (
                    next < 0 ||
                    next > (commentQuery.data?.data.totalCount as number)
                  )
                    return;
                  setCommentPage(next);
                }}
                showPages={{
                  narrow: true,
                }}
              />
            )}
          </div>
        </MainLayout>
      </SystemLayout>
    </ThemeProvider>
  );
}

const ListItem = ({
  groupName,
  rank,
  diffRank,
  title,
  score,
  onClick,
}: {
  groupName: string;
  rank: number;
  diffRank?: number;
  title: string;
  score: number;
  onClick?: (groupName: string) => void;
}) => {
  const getRankingImage = () => {
    if (rank === 1) return ranking_1_svg;
    else if (rank === 2) return ranking_2_svg;
    else if (rank === 3) return ranking_3_svg;
  };
  return (
    <div
      className='flex items-center bg-white h-14 w-full cursor-pointer'
      onClick={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick(groupName);
        }
      }}
    >
      <div className='flex flex-col ml-5'>
        {rank === 1 || rank === 2 || rank === 3 ? (
          <Image src={getRankingImage()} alt='rank' />
        ) : (
          <div className='flex flex-col'>
            <Subtitle_02 className='text-yello-sub-500 font-bold'>
              {rank}
            </Subtitle_02>
            {diffRank !== undefined && diffRank !== 0 && (
              <div className='flex'>
                <Image
                  src={diffRank > 0 ? ranking_up_svg : ranking_down_svg}
                  alt='rank-diff'
                />
                <LabelSmall>{diffRank}</LabelSmall>
              </div>
            )}
          </div>
        )}
      </div>
      <BodyMedium className='font-semibold ml-6'>{title}</BodyMedium>
      <div className='flex ml-auto mr-5'>
        <BodyMedium className='text-yello-sub-500 font-bold'>
          {score}
        </BodyMedium>
        <BodyMedium className='text-yello-sub-500'>{'점'}</BodyMedium>
      </div>
    </div>
  );
};
