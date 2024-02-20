import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getSummonerRankInfo from 'service/getSummonerRankInfo';
import { SummonerInfo, SummonerRankInfo } from 'types/summoner';
import { SUMMONER_DATA_STALE_TIME } from 'constants/api';

type Props = {
  summonerInfo: SummonerInfo | undefined;
  country: string;
  name: string;
  tag: string;
};

export default function useSummonerRankInfo({
  summonerInfo,
  country,
  name,
  tag,
}: Props) {
  useState<boolean>();
  const summonerId = summonerInfo?.id || '';
  const region = summonerInfo?.region || '';
  const {
    data: summonerRankInfo,
    isLoading: isSummonerRankInfoLoading,
    error: summonerRankInfoError,
  } = useQuery<SummonerRankInfo>({
    queryKey: [
      'summoner',
      'info',
      'rankInfo',
      {
        country,
        name,
        tag,
      },
    ],
    queryFn: () => getSummonerRankInfo(summonerId, region),
    enabled: !!summonerInfo,
    staleTime: SUMMONER_DATA_STALE_TIME,
  });

  return {
    summonerRankInfo,
    isSummonerRankInfoLoading,
    summonerRankInfoError,
  };
}
