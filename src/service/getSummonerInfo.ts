import {
  SummonerAcountData,
  SummonerBasicData,
  SummonerInfo,
} from 'types/summoner';
import { RIOT_API_ERROR_MESSAGE } from 'constants/riotApi';
import { RiotAPIErrorResponse } from 'types/riotApi';
import axios, { AxiosResponse } from 'axios';
import COUNTRY from 'constants/country';

/**
 * 소환사 기본 데이터를 받아오는 함수입니다.
 * @param {string} name - 소환사 이름입니다.
 * @param {string} tag - 소환사 태그입니다.
 * @param {string} country - 소환사 국가입니다.
 */

export default async function getSummonerInfo(
  name: string,
  tag: string,
  country: string,
) {
  try {
    // 소환사 계정 정보입니다.
    const accountRes: AxiosResponse<SummonerAcountData> = await axios.get(
      `/asia/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`,
    );
    console.log(accountRes);
    // 소환사 puuid입니다.
    const puuid = accountRes.data.puuid;
    // 소환사 검색 지역입니다.
    const region = COUNTRY.find((c) => c.key === country)?.region || '';
    // 소환사 기본정보 입니다.
    const basicRes: AxiosResponse<SummonerBasicData> = await axios.get(
      `/${region}/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`,
    );
    const summonerInfo: SummonerInfo = {
      ...accountRes.data,
      ...basicRes.data,
      region,
    };
    return summonerInfo;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError<RiotAPIErrorResponse>(err) && err.response) {
      const { status } = err.response.data;
      const errorMessage = RIOT_API_ERROR_MESSAGE[status.status_code];
      throw errorMessage;
    }
  }
}
