import { useState } from 'react';
import { useQuery } from 'react-query';
import getSummonerRankInfo from 'service/getSummonerRankInfo';
import { SummonerInfo, SummonerRankInfo } from 'types/summoner';
type Props = {
  errorHandler: (err: string) => void;
  summonerInfo: SummonerInfo | undefined;
};

export default function useSummonerRankInfo({
  errorHandler,
  summonerInfo,
}: Props) {
  useState<boolean>();
  const puuid = summonerInfo?.puuid || '';
  const region = summonerInfo?.region || '';
  const { data: summonerRankInfo, isLoading: isSummonerRankInfoLoading } =
    useQuery<SummonerRankInfo>(
      [
        'summoner',
        'info',
        'rankInfo',
        {
          region: summonerInfo?.region,
          name: summonerInfo?.name,
          tag: summonerInfo?.tagLine,
        },
      ],
      () => getSummonerRankInfo(puuid, region),
      {
        onError: (err) => {
          if (typeof err === 'string') errorHandler(err);
        },
        enabled: !!summonerInfo,
      },
    );
  console.log(isSummonerRankInfoLoading);

  return {
    summonerRankInfo,
    isSummonerRankInfoLoading,
  };
}
