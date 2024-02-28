import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { TextInput } from '@primer/react';

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

import { MainLayout, SystemLayout } from '../../styles/SchoolAttack.styled';

import background_main from '@/public/background_main.svg';
import message_square_svg from '@/component/Icon/asset/message-square.svg';
import add_and_share_svg from '@/component/Icon/asset/add-and-share.svg';
import search_white_svg from '@/component/Icon/asset/search-white.svg';
import ranking_1_svg from '@/component/Icon/asset/ranking-1.svg';
import ranking_2_svg from '@/component/Icon/asset/ranking-2.svg';
import ranking_3_svg from '@/component/Icon/asset/ranking-3.svg';
import ranking_up_svg from '@/component/Icon/asset/ranking-up.svg';
import ranking_down_svg from '@/component/Icon/asset/ranking-down.svg';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/util/string';
import {
  getSchoolAttackStatistics,
  getSchoolAttackStatisticsDetail,
  getSchoolAttackStatisticsLikeGroupName,
} from '@/repository/statistics';

const maxWidth = 425;

export default function SchoolAttack() {
  const router = useRouter();
  const { groupId } = router.query;

  const [searchKey, setSearchKey] = useState<string>('');
  const statisticsQuery = useInfiniteQuery({
    queryKey: [QUERY_KEY.SCHOOL_ATTACK_STATISTICS],
    queryFn: async ({ pageParam }) => getSchoolAttackStatistics(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      if (lastPage.data.data.statisticsList.length === 0) return undefined;
      return lastPageParam + 1;
    },
  });
  const statisticsDetailQuery = useQuery({
    queryKey: [QUERY_KEY.SCHOOL_ATTACK_STATISTICS_DETAIl, groupId],
    queryFn: async () => {
      return await getSchoolAttackStatisticsDetail(groupId as string);
    },
    enabled: !!groupId,
  });
  const searchQuery = useInfiniteQuery({
    queryKey: [QUERY_KEY.SCHOOL_ATTACK_SEARCH, searchKey],
    queryFn: async ({ pageParam }) => {
      return await getSchoolAttackStatisticsLikeGroupName(searchKey, pageParam);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      if (lastPage.data.data.statisticsList.length === 0) return undefined;
      return lastPageParam + 1;
    },
    enabled: !!searchKey,
  });
  const firstRankingGroup =
    statisticsQuery.data?.pages[0].data.data.statisticsList[0];

  return (
    <>
      <SystemLayout>
        <MainLayout maxWidth={maxWidth}>
          <section className='px-5'>
            <div
              css={css`
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                z-index: -1;
              `}
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
            <div style={{ height: '70vw', maxHeight: '300px' }} />
            {groupId ? (
              <div className='flex flex-col items-center'>
                <div className='flex gap-2'>
                  <Headline_01 className='text-white'>{`${
                    statisticsDetailQuery.data?.data.data.userGroupName || ''
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
                    {statisticsDetailQuery.data?.data.data.rankNumber || 0}
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
            <LabelMedium className='text-center text-grayscales-600'>{`${new Intl.DateTimeFormat(
              'ko-KR',
              {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
              },
            ).format(
              new Date(
                statisticsQuery.data?.pages.at(0)?.data.data.updatedAt ||
                  '2024-01-01',
              ),
            )} 기준`}</LabelMedium>
            <Spacing size={20} />
            {groupId ? (
              <ListItem
                groupName={
                  statisticsDetailQuery.data?.data.data.userGroupName || ''
                }
                rank={statisticsDetailQuery.data?.data.data.rankNumber || 0}
                title={
                  statisticsDetailQuery.data?.data.data.userGroupName || ''
                }
                score={statisticsDetailQuery.data?.data.data.score || 0}
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
              <div className='flex flex-col gap-2 w-full h-60 my-2 overflow-y-scroll'>
                {searchQuery.data?.pages.map((page, index) => (
                  <Fragment key={index}>
                    {page.data.data.statisticsList.map((statistics, index) => {
                      return (
                        <ListItem
                          key={index}
                          groupName={statistics.userGroupName}
                          rank={statistics.rankNumber}
                          diffRank={
                            statistics.prevRankNumber - statistics.rankNumber
                          }
                          title={statistics.userGroupName}
                          score={statistics.score}
                        />
                      );
                    })}
                  </Fragment>
                ))}
              </div>
            )}
          </section>
          <section className='px-5 flex flex-col items-center my-3 mb-10'>
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
                <Fragment key={index + page.data.data.pageCount}>
                  {page.data.data.statisticsList.map((statistics, index) => {
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
                        />
                      </>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </section>
        </MainLayout>
      </SystemLayout>
    </>
  );
}

const ListItem = ({
  groupName,
  rank,
  diffRank,
  title,
  score,
}: {
  groupName: string;
  rank: number;
  diffRank?: number;
  title: string;
  score: number;
}) => {
  const router = useRouter();
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
        router.push(`/school-attack/${groupName}`);
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
            {diffRank && (
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
