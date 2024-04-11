import { useQuery } from '@tanstack/react-query';
import getSummonerRankInfo from 'service/getSummonerRankInfo';
import { SummonerInfo, SummonerRankInfo } from 'types/summoner';
import { SUMMONER_DATA_STALE_TIME } from 'constants/api';

type Props = {
  summonerInfo: SummonerInfo | undefined;
  country: string;
  name: string;
  tag: string;
};

/**
 * 소환사의 랭크 정보를 반환하는 훅입니다.
 * @param {SummonerInfo | undefined} summonerInfo - 소환사 정보입니다.
 * @param {string} country - 소환사 검색 국가입니다.
 * @param {string} name - 소환사 이름입니다.
 * @param {string} tag - 소환사 태그입니다.
 *
 * @return {SummonerRankInfo | undefined} summonerRankInfo - 소환사 랭크 정보
 * @return {boolean} isSummonerRankInfoFetching - 소환사 랭크 정보 패칭 여부
 * @return {string | undefined} summonerRankInfoError - 소환사 랭크 정보 에러
 */

export default function useSummonerRankInfo({
  summonerInfo,
  country,
  name,
  tag,
}: Props) {
  // 소환사의 summonerId를 변수로 저장합니다.
  const summonerId = summonerInfo?.summonerId || '';
  // 소환사의 region을 변수로 저장합니다.
  const region = summonerInfo?.region || '';

  // 소환사 정보를 기반으로 소환사의 랭크 정보 데이터를 받아옵니다.
  const {
    data: summonerRankInfo,
    error,
    isFetching: isSummonerRankInfoFetching,
  } = useQuery<SummonerRankInfo>({
    queryKey: ['summoner', 'info', 'rankInfo', country, name, tag],
    queryFn: () => getSummonerRankInfo(summonerId, region),
    enabled: !!summonerInfo,
    staleTime: SUMMONER_DATA_STALE_TIME,
  });

  return {
    summonerRankInfo,
    isSummonerRankInfoFetching,
    summonerRankInfoError: error?.message,
  };
}
