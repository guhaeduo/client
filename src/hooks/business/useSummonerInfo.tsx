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
 * 소환사 정보와 관련된 데이터를 반환하는 훅입니다.
 * @param {string} country - 소환사 검색 국가
 * @param {string} name - 소환사 이름
 * @param {string} tag - 소환사 태그
 *
 * @return {SummonerInfo | undefined} summonerInfo - 소환사 정보
 * @return {boolean} isSummonerInfoFetching - 소환사 정보 패칭 여부
 * @return {string | undefined} summonerInfoError - 소환사 정보 에러
 */

export default function useSummonerInfo({ country, name, tag }: Props) {
  // 검색 소환사 데이터를 기반으로 소환사 정보를 받아옵니다.
  const {
    data: summonerInfo,
    error,
    isFetching: isSummonerInfoFetching,
  } = useQuery<SummonerInfo>({
    queryKey: ['summoner', 'info', country, name, tag],
    queryFn: () => getSummonerInfo(name, tag, country),
    staleTime: SUMMONER_DATA_STALE_TIME,
  });

  return {
    summonerInfo,
    isSummonerInfoFetching,
    summonerInfoError: error?.message,
  };
}
