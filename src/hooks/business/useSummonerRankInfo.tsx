import { useState } from 'react';
import { useQuery } from 'react-query';
import getSummonerRankInfo from 'service/getSummonerRankInfo';
import { SummonerInfo, SummonerRankInfo } from 'types/summoner';
import { SUMMONER_DATA_STALE_TIME } from 'constants/api';

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
      () => {
        console.log('rankInfo 가져오기');
        return getSummonerRankInfo(puuid, region);
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
    summonerRankInfo,
    isSummonerRankInfoLoading,
  };
}
