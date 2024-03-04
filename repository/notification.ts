import { BASE_URL } from '@/util/string';
import { BaseResponse, User } from './schema';
import axios from 'axios';

export const sendNotification = async (
  userIdList: number[],
  title: string,
  message: string,
) => {
  const res = await axios.post<BaseResponse<undefined>>(
    `${BASE_URL}/api/v1/admin/notification`,
    {
      userIdList: userIdList,
      title: title,
      message: message,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  );
  return res.data;
};
