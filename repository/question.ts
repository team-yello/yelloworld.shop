import { BASE_URL } from '@/util/string';
import axios from 'axios';
import { BaseResponse, QuestionDetail, QuestionResponse } from './schema';

// eslint-disable-next-line
export const questionFetcher = async ({ queryKey }: { queryKey: any }) => {
  const [_key, { page, field, value }] = queryKey;

  // eslint-disable-next-line
  const params: any = { page };

  if (field !== '' && value !== '') {
    params.field = field;
    params.value = value;
  }

  return await axios
    .get<BaseResponse<QuestionResponse>>(`${BASE_URL}/api/v1/admin/question`, {
      params: params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    .then((res) => res.data);
};

export const questionDetailFetcher = async ({
  queryKey,
}: {
  // eslint-disable-next-line
  queryKey: any;
}) => {
  const [_key, { questionId }] = queryKey;
  return await axios
    .get<BaseResponse<QuestionDetail>>(
      `${BASE_URL}/api/v1/admin/question/${questionId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    )
    .then((res) => {
      return res.data;
    });
};

export const deleteQuestion = async (questionId: number) => {
  return await axios.delete<BaseResponse<undefined>>(
    `${BASE_URL}/api/v1/admin/question`,
    {
      params: {
        questionId: questionId,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  );
};
