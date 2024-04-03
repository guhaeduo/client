import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import { MatchDataRes, MatchData, MatchDataQueueType } from '../types/summoner';
import isCustomAxiosError from './customAxiosError';

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
    if (isCustomAxiosError(err) && err.response) {
      throw Object.assign(new Error(), err.response.data.error);
    }
    throw Object.assign(new Error(), UNKNOWN_NET_ERROR_MESSAGE);
  }
}
