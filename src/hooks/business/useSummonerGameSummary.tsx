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
    useState<SummaryQueueType>('SOLO');
  const puuid = summonerInfo?.puuid || '';
  const { data: summonerRankSummary, isLoading: isSummonerRankSummaryLoading } =
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
        return getSummonerGameSummary(puuid, summaryQueueType);
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
    summonerRankSummary,
    isSummonerRankSummaryLoading,
    summaryQueueType,
    setSummaryQueueType,
  };
}
