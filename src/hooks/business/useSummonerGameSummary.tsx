import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getSummonerGameSummary from 'service/getSummonerGameSummary';
import { SummonerInfo, SummonerGameSummary } from 'types/summoner';
import { SummaryQueueType } from 'types/summoner';
import { SUMMONER_DATA_STALE_TIME } from 'constants/api';
type Props = {
  summonerInfo: SummonerInfo | undefined;
  country: string;
  name: string;
  tag: string;
};

export default function useSummonerGameSummary({
  summonerInfo,
  country,
  name,
  tag,
}: Props) {
  const [summaryQueueType, setSummaryQueueType] =
    useState<SummaryQueueType>('ALL');
  const summonerId = summonerInfo?.id || '';
  const region = summonerInfo?.region || '';

  const {
    data: summonerGameSummary,
    isLoading: isSummonerGameSummaryLoading,
    error: summonerGameSummaryError,
  } = useQuery<SummonerGameSummary>({
    queryKey: [
      'summoner',
      'info',
      'gameSummary',
      {
        country,
        name,
        tag,
        queueType: summaryQueueType,
      },
    ],
    queryFn: () => getSummonerGameSummary(summonerId, summaryQueueType, region),
    enabled: !!summonerInfo,
    staleTime: SUMMONER_DATA_STALE_TIME,
  });

  return {
    summonerGameSummary,
    isSummonerGameSummaryLoading,
    summaryQueueType,
    setSummaryQueueType,
    summonerGameSummaryError,
  };
}
