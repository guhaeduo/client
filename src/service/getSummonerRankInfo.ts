import { SummonerRankInfo } from 'types/summoner';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import isCustomAxiosError from './isCustomAxiosError';
import instance from './instance';

/**
 * 소환사의 랭크 정보를 가져오는 함수입니다.
 * @param {string} summonerId - 검색할 소환사의 summonerId 입니다.
 * @param {string} region - 검색을 진행할 region 입니다.
 */
export default async function getSummonerRankInfo(
  summonerId: string,
  region: string,
): Promise<SummonerRankInfo> {
  try {
    // 소환사의 랭크 정보를 가져옵니다.
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
    if (isCustomAxiosError(err)) {
      throw new Error(err.response?.data.message);
    }
    throw new Error(UNKNOWN_NET_ERROR_MESSAGE);
  }
}
