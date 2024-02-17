import { ServerAPIErrorResponse } from './../types/Api';
import { SummonerRankInfo } from 'types/summoner';
import axiosInstance from './instance';
import axios from 'axios';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';

export default async function getSummonerRankInfo(
  id: string,
  region: string,
): Promise<SummonerRankInfo> {
  try {
    const res = await axiosInstance.get<SummonerRankInfo>(
      `${process.env.REACT_APP_SERVER_URL}/api/summoner`,
      {
        headers: {
          summonerId: id,
          region,
        },
      },
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError<ServerAPIErrorResponse>(err) && err.response) {
      throw err.response.data.error;
    }
    throw UNKNOWN_NET_ERROR_MESSAGE;
  }
}
