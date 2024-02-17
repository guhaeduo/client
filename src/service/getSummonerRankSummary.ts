import { SummonerRankSummary } from 'types/summoner';
import { ServerAPIErrorResponse } from 'types/Api';
import axiosInstance from './instance';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import axios from 'axios';

export default async function getSummonerRankSummary(
  puuid: string,
  queueType: 'ALL' | 'SOLO' | 'FREE',
): Promise<SummonerRankSummary> {
  try {
    const rankRes = await axiosInstance.get<SummonerRankSummary>(
      `${process.env.REACT_APP_SERVER_URL}/api/summoner/summary`,
      {
        headers: {
          puuid,
          queueType,
        },
      },
    );
    return rankRes.data;
  } catch (err) {
    if (axios.isAxiosError<ServerAPIErrorResponse>(err) && err.response) {
      throw err.response.data.error;
    }
    throw UNKNOWN_NET_ERROR_MESSAGE;
  }
}
