import { useQuery } from '@tanstack/react-query';

import getSummonerInfo from 'service/getSummonerInfo';
import { SummonerInfo } from 'types/summoner';
import { SUMMONER_DATA_STALE_TIME } from 'constants/api';
type Props = {
  country: string;
  name: string;
  tag: string;
};
export default function useSummonerInfo({ country, name, tag }: Props) {
  const {
    data: summonerInfo,
    isLoading: isSummonerInfoLoading,
    error: summonerInfoError,
    isFetching: isSummonerInfoFetching,
  } = useQuery<SummonerInfo>({
    queryKey: ['summoner', 'info', country, name, tag],
    queryFn: () => getSummonerInfo(name, tag, country),
    staleTime: SUMMONER_DATA_STALE_TIME,
  });
  return {
    summonerInfo,
    isSummonerInfoFetching,
    isSummonerInfoLoading,
    summonerInfoError,
  };
}
