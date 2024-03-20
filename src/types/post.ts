interface MyPosition {
  lane: string;
  championName: string;
}

interface RankTier {
  tier: string;
  level: string;
}

export interface PostContent {
  isLogin: boolean;
  postId: number;
  riotGameName: string;
  riotGameTag: string;
  needPosition: string;
  needQueueType: string;
  myPosition: {
    main: MyPosition;
    sub: MyPosition;
  };
  myRankTier: {
    solo: RankTier;
    free: RankTier;
  };
  memo: string;
  puuid: string;
  micOn: boolean;
  riotVerified: boolean;
}

export interface PostsDataRes {
  content: PostContent[];
  last: boolean;
  pageable: {
    pageNumber: number;
  };
}
