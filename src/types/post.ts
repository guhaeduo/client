// 듀오 게시글의 타입
export interface PostContent {
  isGuestPost: boolean;
  postId: number;
  createdAt: number;
  summonerIconNumber: number;
  riotGameName: string;
  riotGameTag: string;
  needPosition: string;
  queueType: string;
  myMainLane: string;
  myMainChampionName: string;
  mySubLane: string;
  mySubChampionName: string;
  soloRankTier: string;
  soloRankLevel: string;
  freeRankTier: string;
  freeRankLevel: string;
  memo: string;
  isMicOn: boolean;
  isRiotVerified: boolean;
  puuid: string;
  memberId?: number;
}

// 게시글 데이터 응답 타입
export interface PostsDataRes {
  content: PostContent[];
  hasNextPage: boolean;
  nextPageNumber: number;
}

// 듀오 게시글 작성 데이터 타입
export interface PostWriteForm {
  region: string;
  riotGameName: string;
  riotGameTag: string;
  needPosition: string;
  queueType: string;
  myMainLane: string;
  myMainChampionName: string;
  mySubLane: string;
  mySubChampionName: string;
  isRiotVerified: boolean;
  isMicOn: boolean;
  memo: string;
  password?: string;
  isGuestPost: boolean;
  passwordCheck?: string;
}
