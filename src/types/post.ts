export interface PostContent {
  isLogin: boolean;
  postId: number;
  riotGameName: string;
  riotGameTag: string;
  needPosition: string;
  needQueueType: string;
  mainLane: string;
  mainChampion: string;
  subLane: string;
  subChampion: string;
  soloRankTier: string;
  freeRankTier: string;
  memo: string;
  puuid: string;
  micOn: boolean;
  riotVerified: boolean;
  isGuestPost: boolean;
}

export interface PostsDataRes {
  content: PostContent[];
  last: boolean;
  pageable: {
    pageNumber: number;
  };
}
