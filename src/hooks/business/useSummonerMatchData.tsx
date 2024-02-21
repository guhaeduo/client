import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getSummonerMatchData from 'service/getSummonerMatchData';
import { SummonerInfo, MatchData } from 'types/summoner';
import { MatchDataQueueType } from 'types/summoner';
import { SUMMONER_DATA_STALE_TIME } from 'constants/api';
type Props = {
  summonerInfo: SummonerInfo | undefined;
  country: string;
  name: string;
  tag: string;
};

export default function useSummonerMatchData({
  summonerInfo,
  country,
  name,
  tag,
}: Props) {
  const [matchQueueType, setMatchQueueType] =
    useState<MatchDataQueueType>('ALL');
  const puuid = summonerInfo?.puuid || '';
  const region = summonerInfo?.region || '';

  const {
    data: summonerMatchData,
    isLoading: isSummonerMatchDataLoading,
    error: summonerMatchDataError,
  } = useQuery<MatchData[]>({
    queryKey: [
      'summoner',
      'info',
      'matchData',
      {
        country,
        name,
        tag,
        queueType: matchQueueType,
      },
    ],
    queryFn: () => getSummonerMatchData(puuid, matchQueueType, region),
    enabled: !!summonerInfo,
    staleTime: SUMMONER_DATA_STALE_TIME,
  });

  return {
    summonerMatchData,
    isSummonerMatchDataLoading,
    matchQueueType,
    setMatchQueueType,
    summonerMatchDataError,
  };
}
