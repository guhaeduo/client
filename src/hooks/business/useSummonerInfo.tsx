import { useQuery } from '@tanstack/react-query';
import getSummonerInfo from 'service/getSummonerInfo';
import { SummonerInfo } from 'types/summoner';
import { SUMMONER_DATA_STALE_TIME } from 'constants/api';

type Props = {
  country: string;
  name: string;
  tag: string;
};

/**
 * 소환사의 정보를 받아오는 훅입니다.
 * @param {string} country - 소환사 검색 국가입니다.
 * @param {string} name - 소환사 이름입니다.
 * @param {string} tag - 소환사 태그입니다.
 */

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
