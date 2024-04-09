import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import { MatchDataRes, MatchData, MatchDataQueueType } from '../types/summoner';
import isCustomAxiosError from './isCustomAxiosError';
import instance from './instance';

/**
 * 소환사의 게임 전적을 가져오는 함수입니다.
 * @param {string} puuid - 검색할 소환사의 puuid 입니다.
 * @param {MatchDataQueueType} queueType - 게임 타입 옵션입니다.
 * @param {string} region - 검색을 진행할 region 입니다.
 */

export default async function getSummonerMatchData(
  puuid: string,
  queueType: MatchDataQueueType,
  region: string,
): Promise<MatchData[]> {
  try {
    // 게임 전적 데이터를 가져옵니다.
    const matchDataRes = await instance.get<MatchDataRes>(`/api/matches/list`, {
      headers: {
        puuid,
        queueType,
        region,
      },
    });
    return matchDataRes.data.matchDataList;
  } catch (err) {
    if (isCustomAxiosError(err)) {
      throw new Error(err.response?.data.message);
    }
    throw new Error(UNKNOWN_NET_ERROR_MESSAGE);
  }
}
