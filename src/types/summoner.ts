export type SummonerAcountData = {
  gameName: string;
  tagLine: string;
  puuid: string;
};

export type SummonerBasicData = {
  accountId: string;
  id: string;
  name: string;
  profileIconId: number;
  puuid: string;
  revisionDate: number;
  summonerLevel: number;
};

export type SummonerInfo = {
  region: string;
} & SummonerAcountData &
  SummonerBasicData;

type Tier =
  | 'IRON'
  | 'BRONZE'
  | 'SILVER'
  | 'GOLD'
  | 'PLATINUM'
  | 'EMERALD'
  | 'MASTER'
  | 'GRANDMASTER'
  | 'CHALLENGER'
  | 'unRanked';

type RankData = {
  tier: Tier;
  level: number;
  point: number;
  win: number;
  lose: number;
};

export type SummonerRankInfo = {
  freeRank: RankData;
  soloRank: RankData;
};

type ChampionStats = {
  championName: string;
  championIconNumber: number;
  winningRate: number;
  csPerMinute: number;
  visionScorePerMinute: number;
  kda: number;
  totalKillParticipation: number;
};

type LaneStats = {
  winningRate: number;
  mostChampionlist: ChampionStats[];
};

export type SummonerGameSummary = {
  info: {
    winningRate: number;
    wins: number;
    loses: number;
    kda: number;
    killAvg: number;
    deathAvg: number;
    assistAvg: number;
  };
  lane: {
    all: LaneStats;
    top: LaneStats;
    jug: LaneStats;
    mid: LaneStats;
    adc: LaneStats;
    sup: LaneStats;
  };
};

export type SearchHistory = {
  country: string;
  name: string;
  tag: string;
  isFavorite: boolean;
};

export type SummaryQueueType = 'ALL' | 'SOLO' | 'FREE';
