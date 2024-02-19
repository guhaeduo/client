import { useState } from 'react';
import { useQuery } from 'react-query';
import getSummonerGameSummary from 'service/getSummonerGameSummary';
import { SummonerInfo, SummonerGameSummary } from 'types/summoner';
import { SummaryQueueType } from 'types/summoner';
import { SUMMONER_DATA_STALE_TIME } from 'constants/api';
type Props = {
  errorHandler: (err: string) => void;
  summonerInfo: SummonerInfo | undefined;
};

export default function useSummonerGameSummary({
  errorHandler,
  summonerInfo,
}: Props) {
  const [summaryQueueType, setSummaryQueueType] =
    useState<SummaryQueueType>('ALL');
  const summonerId = summonerInfo?.id || '';
  const { data: summonerGameSummary, isLoading: isSummonerGameSummaryLoading } =
    useQuery<SummonerGameSummary>(
      [
        'summoner',
        'info',
        'gameSummary',
        {
          name: summonerInfo?.name,
          tag: summonerInfo?.tagLine,
          queueType: summaryQueueType,
        },
      ],
      () => {
        console.log('summary 가져오기');
        return getSummonerGameSummary(summonerId, summaryQueueType);
      },
      {
        onError: (err) => {
          if (typeof err === 'string') errorHandler(err);
        },
        enabled: !!summonerInfo,
        staleTime: SUMMONER_DATA_STALE_TIME,
      },
    );

  return {
    summonerGameSummary,
    isSummonerGameSummaryLoading,
    summaryQueueType,
    setSummaryQueueType,
  };
}
