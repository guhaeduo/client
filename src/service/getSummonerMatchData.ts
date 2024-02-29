import {
  MatchDataRes,
  MatchData,
  MatchDataQueueType,
} from './../types/summoner';
import { ServerAPIErrorResponse } from 'types/Api';
import axiosInstance from './instance';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import axios from 'axios';

export default async function getSummonerMatchData(
  puuid: string,
  queueType: MatchDataQueueType,
  region: string,
): Promise<MatchData[]> {
  try {
    const matchDataRes = await axiosInstance.get<MatchDataRes>(
      `/api/matches/list`,
      {
        headers: {
          puuid,
          queueType,
          region,
        },
      },
    );
    return matchDataRes.data.matchDataList;
  } catch (err) {
    if (axios.isAxiosError<ServerAPIErrorResponse>(err) && err.response) {
      throw err.response.data.error;
    }
    throw UNKNOWN_NET_ERROR_MESSAGE;
  }
}
