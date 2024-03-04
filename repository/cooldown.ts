import axios from 'axios';
import { BaseError, BaseResponse, CooldownResponse } from './schema';
import { BASE_URL } from '@/util/string';

// eslint-disable-next-line
export const cooldownFetcher = async ({ queryKey }: { queryKey: any }) => {
  const [_key, { page, yelloId }] = queryKey;
  return axios
    .get<BaseResponse<CooldownResponse>>(`${BASE_URL}/api/v1/admin/cooldown`, {
      params: {
        page: page,
        yelloId: yelloId,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    .then((res) => res.data);
};

export const deleteCooldown = async (cooldownId: number) => {
  return axios.delete<BaseResponse<undefined>>(
    `${BASE_URL}/api/v1/admin/cooldown`,
    {
      params: {
        cooldownId: cooldownId,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  );
};
