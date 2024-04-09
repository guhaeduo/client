import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import { SummonerGameSummary, SummaryQueueType } from '../types/summoner';
import isCustomAxiosError from './isCustomAxiosError';
import instance from './instance';

/**
 * 소환사의 게임 요약 정보를 가져오는 함수입니다.
 * @param {string} puuid - 검색할 소환사의 puuid 입니다.
 * @param {SummaryQueueType} queueType - 게임 타입 옵션입니다.
 * @param {string} region - 검색을 진행할 region 입니다.
 */

export default async function getSummonerGameSummary(
  puuid: string,
  queueType: SummaryQueueType,
  region: string,
): Promise<SummonerGameSummary> {
  try {
    // 소환사의 게임 요약 정보를 가져옵니다.
    const summaryRes = await instance.get<SummonerGameSummary>(
      `/api/matches/summary`,
      {
        headers: {
          puuid,
          queueType,
          region,
        },
      },
    );

    return summaryRes.data;
  } catch (err) {
    if (isCustomAxiosError(err)) {
      throw new Error(err.response?.data.message);
    }
    throw new Error(UNKNOWN_NET_ERROR_MESSAGE);
  }
}
