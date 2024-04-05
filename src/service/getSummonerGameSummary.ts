import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import { SummonerGameSummary, SummaryQueueType } from '../types/summoner';
import isCustomAxiosError from './isCustomAxiosError';
import instance from './instance';

export default async function getSummonerGameSummary(
  puuid: string,
  queueType: SummaryQueueType,
  region: string,
): Promise<SummonerGameSummary> {
  try {
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
