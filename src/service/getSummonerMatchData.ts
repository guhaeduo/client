import {
  MatchDataRes,
  MatchData,
  MatchDataQueueType,
} from './../types/summoner';
import isCustomAxiosError from './customAxiosError';

import instance from './instance';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';

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
      throw err.response.data.error;
    }
    throw UNKNOWN_NET_ERROR_MESSAGE;
  }
}
