import { SummonerRankInfo } from 'types/summoner';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import isCustomAxiosError from './customAxiosError';
import instance from './instance';

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
    if (isCustomAxiosError(err) && err.response) {
      throw Object.assign(new Error(), err.response.data.error);
    }
    throw Object.assign(new Error(), UNKNOWN_NET_ERROR_MESSAGE);
  }
}
