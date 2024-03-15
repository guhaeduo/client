import { SummonerGameSummary, SummaryQueueType } from './../types/summoner';
import isCustomAxiosError from './customAxiosError';
import instance from './instance';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';

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
    if (isCustomAxiosError(err) && err.response) {
      throw err.response.data.error;
    }
    throw UNKNOWN_NET_ERROR_MESSAGE;
  }
}
