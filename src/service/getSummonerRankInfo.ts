import { ServerAPIErrorResponse } from './../types/Api';
import { SummonerRankInfo } from 'types/summoner';
import instance from './instance';
import axios from 'axios';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';

export default async function getSummonerRankInfo(
  summonerId: string,
  region: string,
): Promise<SummonerRankInfo> {
  try {
    const rankRes = await instance.get<SummonerRankInfo>(
      `/api/summoner/rank `,
      {
        headers: {
          summonerId,
          region,
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
