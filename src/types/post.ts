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
}

export interface PostsDataRes {
  content: PostContent[];
  last: boolean;
  pageable: {
    pageNumber: number;
  };
}
