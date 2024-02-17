import { SummonerRankInfo } from 'types/summoner';
import axiosInstance from './instance';

export default async function getSummonerRankInfo(id: string, region: string) {
  const res = await axiosInstance.get<SummonerRankInfo>(`/api/summoner`, {
    headers: {
      summonerId: id,
      region,
    },
  });
  return res.data;
}
