import { useState } from 'react';
import { useQuery } from 'react-query';
import getSummonerRankSummary from 'service/getSummonerRankSummary';
import { SummonerInfo, SummonerRankSummary } from 'types/summoner';
type Props = {
  errorHandler: (err: string) => void;
  summonerInfo: SummonerInfo | undefined;
};

type QueueType = 'ALL' | 'SOLO' | 'FREE';

export default function useSummonerRankSummary({
  errorHandler,
  summonerInfo,
}: Props) {
  const [queueType, setQueueType] = useState<QueueType>('SOLO');
  const puuid = summonerInfo?.puuid || '';
  const { data: summonerRankSummary, isLoading: isSummonerRankSummaryLoading } =
    useQuery<SummonerRankSummary>(
      [
        'summoner',
        'info',
        'rankSummary',
        {
          name: summonerInfo?.name,
          tag: summonerInfo?.tagLine,
          queueType,
        },
      ],
      () => getSummonerRankSummary(puuid, queueType),
      {
        onError: (err) => {
          if (typeof err === 'string') errorHandler(err);
        },
        enabled: !!summonerInfo,
      },
    );

  return {
    summonerRankSummary,
    isSummonerRankSummaryLoading,
    queueType,
    setQueueType,
  };
}
