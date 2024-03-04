import { BASE_URL } from '@/util/string';
import axios from 'axios';
import { BaseError, BaseResponse, UserDetail, UserResponse } from './schema';

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
