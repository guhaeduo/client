// 소환사 계정 정보 타입
export type SummonerAcountData = {
  gameName: string;
  tagLine: string;
  puuid: string;
};

// 소환사 기본 타입
export type SummonerBasicData = {
  accountId: string;
  id: string;
  name: string;
  profileIconId: number;
  puuid: string;
  revisionDate: number;
  summonerLevel: number;
};

// 소환사 종합 타입
export type SummonerInfo = {
  region: string;
} & SummonerAcountData &
  SummonerBasicData;

// 티어 타입
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

// 랭크 티어 데이터 타입
type RankData = {
  tier: Tier;
  level: number;
  point: number;
  win: number;
  lose: number;
};

// 소환사 랭크 티어 데이터 객체 타입
export type SummonerRankInfo = {
  freeRank: RankData;
  soloRank: RankData;
};

// 게임 요약 챔피언 타입
export type SummaryChampionStats = {
  championName: string;
  championIconNumber: number;
  winningRate: string;
  csPerMinute: string;
  visionScorePerMinute: string;
  kda: string;
  cntGame: number;
  killParticipation: string;
};

// 게임 요약 라인 타입
type SummaryLaneStats = {
  cntGame: number;
  winningRate: number;
  mostChampionlist: SummaryChampionStats[];
};

// 게임 요약 타입
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

// 게임 요약 큐타입
export type SummaryQueueType = 'ALL' | 'SOLO' | 'FREE';

// 검색기록 타입
export type SearchHistory = {
  country: string;
  name: string;
  tag: string;
  isFavorite: boolean;
};

// 라인 타입
export type Lane = 'ALL' | 'TOP' | 'JUG' | 'MID' | 'ADC' | 'SUP';

// 매치 데이터 큐타입
export type MatchDataQueueType = 'ALL' | 'SOLO' | 'FREE' | 'NORMAL';

/// 룬 정보
export interface Perks {
  main: {
    perkStyle: number;
    perkIdList: number[];
  };
  sub: {
    perkStyle: number;
    perkIdList: number[];
  };
}

// 참여자 타입
export interface Participant {
  lane: Lane;
  kill: number;
  death: number;
  assists: number;
  minionKill: number;
  championName: string;
  championIconNumber: number;
  championLevel: number;
  riotGameName: string;
  riotGameTag: string;
  totalDamage: number;
  totalGold: number;
  itemNumberList: number[];
  perks: Perks;
  visionWards: number;
  visionScore: number;
  wardPlaced: number;
  spell1Id: number;
  spell2Id: number;
  puuid: string;
  bot: boolean;
  win: boolean;
}

// 팀 데이터
export interface Team {
  totalKills: number;
  totalDeaths: number;
  totalAssists: number;
  totalGold: number;
  teamMaxDamage: number;
  objectives: {
    baron: number;
    dragon: number;
    horde: number;
    inhibitor: number;
    riftHerald: number;
    tower: number;
  };
  participants: Participant[];
  grade: null;
  win: boolean;
}

// 매치 데이터 타입
export interface MatchData {
  matchId: string;
  info: {
    timeStamp: number;
    gameDuration: number;
    queueType: string;
    quickShutdown: boolean;
    maxDamage: {
      damage: number;
      championName: string;
      championIconNumber: number;
      riotGameName: string;
      riotGameTag: string;
    };
  };
  currentSummonerMatchData: Participant;
  red: Team;
  blue: Team;
}

export interface MatchDataRes {
  queueType: Lane;
  totalGameCnt: number;
  matchDataList: MatchData[];
}
