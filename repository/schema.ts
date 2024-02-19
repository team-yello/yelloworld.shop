export interface BaseResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface SchoolAttackStatistics {
  userGroupName: string;
  userCount: number;
  voteCount: number;
  score: number;
  rankNumber: number;
  prevUserCount: number;
  prevVoteCount: number;
  prevScore: number;
  prevRankNumber: number;
}

export interface GetSchoolAttackStatistics {
  pageCount: number;
  totalCount: number;
  updatedAt: string;
  statisticsList: SchoolAttackStatistics[];
}
