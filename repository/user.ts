import { BASE_URL } from '@/util/string';
import axios from 'axios';
import {
  BaseError,
  BaseResponse,
  UserDetail,
  UserPostCommentRequest,
  UserPostCommentResponse,
  UserResponse,
} from './schema';
import { request } from 'http';

// eslint-disable-next-line
export const userFetcher = async ({ queryKey }: { queryKey: any }) => {
  const [_key, { page, field, value }] = queryKey;
  // eslint-disable-next-line
  const params: any = { page };

  if (field !== '' && value !== '') {
    params.field = field;
    params.value = value;
  }

  return axios
    .get<BaseResponse<UserResponse>>(`${BASE_URL}/api/v1/admin/user`, {
      params: params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    .then((res) => res.data);
};

// eslint-disable-next-line
export const userDetailFetcher = async ({ queryKey }: { queryKey: any }) => {
  const [_key, { userId }] = queryKey;
  return axios
    .get<BaseResponse<UserDetail>>(`${BASE_URL}/api/v1/admin/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const editUser = async (
  userId: number,
  request: Omit<UserDetail, 'id' | 'deleteAt' | 'group'>,
) => {
  return await axios.post<BaseResponse<undefined>>(
    `${BASE_URL}/api/v1/admin/user/${userId}`,
    request,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  );
};

export const deleteUser = async (userId: number) => {
  return await axios.delete<BaseResponse<undefined>>(
    `${BASE_URL}/api/v1/admin/user`,
    {
      params: {
        userId: userId,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  );
};

export const getUserPostComment = async (page: number) => {
  return await axios.get<BaseResponse<UserPostCommentResponse>>(
    `${BASE_URL}/api/v1/user/post/comment`,
    {
      params: {
        // 고정...
        postId: 1,
        page,
        sort: 'createdAt,desc',
        size: 10,
      },
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    },
  );
};

export const postUserPostComment = async (request: UserPostCommentRequest) => {
  return await axios.post<BaseResponse<undefined>>(
    `${BASE_URL}/api/v1/user/post/comment`,
    { ...request, postId: 1, status: 'ACTIVE' },
  );
};
