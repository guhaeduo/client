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

export type SummaryChampionStats = {
  championName: string;
  championIconNumber: number;
  winningRate: string;
  csPerMinute: string;
  visionScorePerMinute: string;
  kda: string;
  cntGame: number;
  totalKillParticipation: string;
};

type SummaryLaneStats = {
  cntGame: number;
  winningRate: number;
  mostChampionlist: SummaryChampionStats[];
};

export type SummonerGameSummary = {
  info: {
    winningRate: string;
    wins: number;
    loses: number;
    kda: string;
    killAvg: string;
    deathAvg: string;
    assistAvg: string;
    mostLane: Lane;
    subLane: Lane;
  };
  lane: {
    ALL: SummaryLaneStats;
    TOP: SummaryLaneStats;
    JUG: SummaryLaneStats;
    MID: SummaryLaneStats;
    ADC: SummaryLaneStats;
    SUP: SummaryLaneStats;
  };
};

export type SearchHistory = {
  country: string;
  name: string;
  tag: string;
  isFavorite: boolean;
};

export type SummaryQueueType = 'ALL' | 'SOLO' | 'FREE';

export type Lane = 'ALL' | 'TOP' | 'JUG' | 'MID' | 'ADC' | 'SUP';
