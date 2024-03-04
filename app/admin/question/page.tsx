/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { pallete } from '@/styles/Color';
import {
  Menu,
  TopBar,
  BodyMedium,
  BodySmall,
  Headline_00,
  Headline_01,
  Headline_02,
  Subtitle_01,
  Subtitle_02,
} from '@/component';
import { SearchIcon, TrashIcon } from '@primer/octicons-react';
import {
  ActionList,
  Avatar,
  Box,
  Button,
  FormControl,
  Pagination,
  Select,
  SelectPanel,
  Spinner,
  TextInput,
} from '@primer/react';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteQuestion, questionFetcher } from '@/repository/question';

const UserPagination = ({ field, value }: { field: string; value: string }) => {
  const router = useRouter();
  const [requestParams, setRequestParam] = useState({
    page: 0,
    field: '',
    value: '',
  });

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['question', { ...requestParams, field, value }],
    queryFn: questionFetcher,
    retry: false,
  });

  if (isLoading) {
    return (
      <Spinner size={'large'} sx={{ padding: '100px 150px 100px 150px' }} />
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

  const onClickDelete = async (questionId: number) => {
    if (confirm(questionId + '를 삭제하시겠습니까?')) {
      await deleteQuestion(questionId)
        .then((res) => alert(res.data.message))
        .catch((reason) => {
          alert(reason.response.data.message);
        });
    }
  };

  return (
    <>
      <ActionList className='bg-white'>
        <ActionList.Item
          sx={{
            width: '1000px',
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
            <Subtitle_01 style={{ marginLeft: '50px', width: '150px' }}>
              {'질문'}
            </Subtitle_01>
          </div>
        </ActionList.Item>
        {data?.data.questionList.length === 0 ? (
          <ActionList.Item>
            <ActionList.LeadingVisual>
              <TrashIcon size={24} />
            </ActionList.LeadingVisual>
            <ActionList.Description>
              {'검색 결과가 없습니다.'}
            </ActionList.Description>
          </ActionList.Item>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className='oddList'>
              {data?.data.questionList.map((question, index) => {
                if (index % 2 === 0) {
                  return (
                    <ActionList.Item
                      key={question.id + index}
                      sx={{
                        width: '500px',
                        height: '100px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      onClick={() => {
                        router.push(`/admin/question/${question.id}`);
                      }}
                    >
                      <ActionList.LeadingVisual>
                        <Headline_02>{question.id}</Headline_02>
                      </ActionList.LeadingVisual>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          <BodyMedium
                            style={{
                              marginLeft: '50px',
                              width: '90px',
                              textAlign: 'right',
                            }}
                          >
                            {question.nameHead}
                          </BodyMedium>
                          <BodyMedium
                            style={{ marginLeft: '50px', width: '70px' }}
                          >
                            {'???'}
                          </BodyMedium>
                          <BodyMedium
                            style={{ marginLeft: '12px', width: '150px' }}
                          >
                            {question.nameFoot}
                          </BodyMedium>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          <BodyMedium
                            style={{
                              marginLeft: '50px',
                              width: '90px',
                              textAlign: 'right',
                            }}
                          >
                            {''}
                          </BodyMedium>
                          <BodyMedium
                            style={{ marginLeft: '50px', width: '70px' }}
                          >
                            {question.keywordHead === null
                              ? '???'
                              : question.keywordHead}
                          </BodyMedium>
                          <BodyMedium
                            style={{ marginLeft: '12px', width: '120px' }}
                          >
                            {question.keywordFoot}
                          </BodyMedium>
                        </div>
                      </div>
                      <ActionList.TrailingVisual sx={{ marginLeft: '0px' }}>
                        <Button onClick={() => onClickDelete(question.id)}>
                          {'삭제'}
                        </Button>
                      </ActionList.TrailingVisual>
                    </ActionList.Item>
                  );
                }
              })}
            </div>
            <div className='evenList'>
              {data?.data.questionList.map((question, index) => {
                if (index % 2 !== 0) {
                  return (
                    <ActionList.Item
                      key={question.id + index}
                      sx={{
                        width: '500px',
                        height: '100px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      onClick={() => {
                        router.push(`/admin/question/${question.id}`);
                      }}
                    >
                      <ActionList.LeadingVisual>
                        <Headline_02>{question.id}</Headline_02>
                      </ActionList.LeadingVisual>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          <BodyMedium
                            style={{
                              marginLeft: '50px',
                              width: '90px',
                              textAlign: 'right',
                            }}
                          >
                            {question.nameHead}
                          </BodyMedium>
                          <BodyMedium
                            style={{ marginLeft: '50px', width: '70px' }}
                          >
                            {'???'}
                          </BodyMedium>
                          <BodyMedium
                            style={{ marginLeft: '12px', width: '150px' }}
                          >
                            {question.nameFoot}
                          </BodyMedium>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          <BodyMedium
                            style={{
                              marginLeft: '50px',
                              width: '90px',
                              textAlign: 'right',
                            }}
                          >
                            {''}
                          </BodyMedium>
                          <BodyMedium
                            style={{ marginLeft: '50px', width: '70px' }}
                          >
                            {question.keywordHead === null
                              ? '???'
                              : question.keywordHead}
                          </BodyMedium>
                          <BodyMedium
                            style={{ marginLeft: '12px', width: '150px' }}
                          >
                            {question.keywordFoot}
                          </BodyMedium>
                        </div>
                      </div>
                      <ActionList.TrailingVisual>
                        <Button onClick={() => onClickDelete(question.id)}>
                          {'삭제'}
                        </Button>
                      </ActionList.TrailingVisual>
                    </ActionList.Item>
                  );
                }
              })}
            </div>
          </div>
        )}
      </ActionList>
      <Pagination
        pageCount={
          data?.data.pageCount === 0 ? 1 : (data?.data.pageCount as number)
        }
        currentPage={requestParams.page + 1}
        onPageChange={(e, page) => {
          setRequestParam({ ...requestParams, page: page - 1 });
        }}
      />
    </>
  );
};

export default function Page() {
  const [searchField, setSearchField] = useState<string>('yelloId');
  const [searchValue, setSearchValue] = useState<string>('');

  const inputField = useRef<string>('');

  return (
    <>
      <Headline_00>{'질문'}</Headline_00>
      <UserPagination
        field={searchField}
        value={searchValue}
        // router={router}
      />
      {/* <div style={{ display: "flex" }}>
            <FormControl>
              <FormControl.Label />
              <Select
                size="large"
                onChange={(e) => {
                  setSearchField(e.target.value);
                }}
              >
                <Select.Option value="yelloId">옐로 아이디</Select.Option>
                <Select.Option value="name">이름</Select.Option>
              </Select>
            </FormControl>
            <TextInput
              aria-label="yelloId"
              name="yelloId"
              placeholder={"선택한 값으로 검색하기"}
              autoComplete="yelloId"
              size="large"
              onChange={(e) => {
                inputField.current = e.target.value;
              }}
              trailingAction={
                <TextInput.Action
                  onClick={(e) => {
                    setSearchValue(inputField.current);
                  }}
                  icon={SearchIcon}
                />
              }
              sx={{ marginTop: "4px" }}
            />
          </div> */}
    </>
  );
}
