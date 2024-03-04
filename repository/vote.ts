import axios from 'axios';
import { BaseResponse, VoteSendContent } from './schema';
import { BASE_URL } from '@/util/string';

export const sendVote = async (
  questionId: number,
  voteContentList: VoteSendContent[],
) => {
  return await axios.post<BaseResponse<undefined>>(
    `${BASE_URL}/api/v1/admin/question/${questionId}`,
    {
      voteContentList: voteContentList,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  );
};
