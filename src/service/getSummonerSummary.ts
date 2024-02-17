import { SummonerRankSummary } from 'types/summoner';
import axiosInstance from './instance';

export default async function getSummonerRankSummary(
  puuid: string,
  queueType: 'SOLO' | 'FREE',
) {
  const res = await axiosInstance.get<SummonerRankSummary>(`/api/summoner`, {
    headers: {
      puuid,
      queueType,
    },
  });
  return res.data;
}
