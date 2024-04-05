import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import { MatchDataRes, MatchData, MatchDataQueueType } from '../types/summoner';
import isCustomAxiosError from './isCustomAxiosError';

import instance from './instance';

export default async function getSummonerMatchData(
  puuid: string,
  queueType: MatchDataQueueType,
  region: string,
): Promise<MatchData[]> {
  try {
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
