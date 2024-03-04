export interface BaseResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface BaseError {
  message: string;
  response: BaseResponse<undefined>;
}

// School-Attack
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

// User
export interface User {
  id: number;
  name: string;
  yelloId: string;
  group: string;
  imageUrl: string;
  createdAt: string;
  deletedAt: string;
}

export interface UserResponse {
  pageCount: number;
  totalCount: number;
  userList: User[];
}

export interface UserDetail {
  id?: number;
  recommendCount: number;
  name: string;
  yelloId: string;
  gender: string;
  point: number;
  social: string;
  profileImage: string;
  uuid: string;
  deletedAt?: string;
  group?: string;
  groupAdmissionYear: number;
  email: string;
  ticketCount: number;
  deviceToken: string;
  subscribe: string;
}

// Cooldown
export interface Cooldown {
  id: number;
  name: string;
  yelloId: string;
  createdAt: string;
}

export interface CooldownResponse {
  pageCount: number;
  totalCount: number;
  userList: Cooldown[];
}

// Question
export interface QuestionDetail {
  id: number;
  nameHead: string;
  nameFoot: string;
  keywordHead: string;
  keywordFoot: string;
  keywordList: string[];
}

export interface Question {
  id: number;
  nameHead: string;
  nameFoot: string;
  keywordHead: string;
  keywordFoot: string;
}

export interface QuestionResponse {
  pageCount: number;
  totalCount: number;
  questionList: Question[];
}

// Vote
export interface Vote {
  sender?: User;
  receiver?: User;
  keyword?: string;
  colorIndex: number;
}

export interface VoteSendContent {
  senderId: number;
  receiverId: number;
  keyword: string;
  colorIndex: number;
}

export interface VoteSendRequest {
  voteContentList: VoteSendContent[];
}
