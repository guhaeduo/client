import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getSummonerMatchData from 'service/getSummonerMatchData';
import { SummonerInfo, MatchData, MatchDataQueueType } from 'types/summoner';
import { SUMMONER_DATA_STALE_TIME } from 'constants/api';

type Props = {
  summonerInfo: SummonerInfo | undefined;
  country: string;
  name: string;
  tag: string;
};

/**
 * 소환사의 매치 전적 정보와 관련된 데이터를 반환하는 훅입니다.
 * @param {SummonerInfo | undefined} summonerInfo - 소환사 정보
 * @param {string} country - 소환사 검색 국가
 * @param {string} name - 소환사 이름
 * @param {string} tag - 소환사 태그
 *
 * @return {MatchData[] | undefined} summonerMatchData - 소환사 매치 전적 데이터
 * @return {MatchDataQueueType} matchQueueType - 소환사 매치 전적 게임 타입 필터 옵션
 * @return {Dispatch<SetStateAction<MatchDataQueueType>>} setMatchQueueType - 소환사 매치 전적 게임 타입 필터 옵션 변경 함수
 * @return {boolean} isSummonerMatchDataFetching - 소환사 매치 전적 패칭 여부
 * @return { string | undefinedstring | undefined} summonerMatchDataError - 소환사 매치 전적 에러
 */

export default function useSummonerMatchData({
  summonerInfo,
  country,
  name,
  tag,
}: Props) {
  // 소환사 매치데이터 게임 타입 상태입니다.
  const [matchQueueType, setMatchQueueType] =
    useState<MatchDataQueueType>('ALL');
  // 소환사의 puuid를 변수로 저장합니다.
  const puuid = summonerInfo?.puuid || '';
  // 소환사의 대륙을 변수로 저장합니다.
  const region = summonerInfo?.region || '';

  // 소환사 정보와 필터 옵션을 기반으로 매치 정보 데이터를 받아옵니다.
  const {
    data: summonerMatchData,
    error,
    isFetching: isSummonerMatchDataFetching,
  } = useQuery<MatchData[]>({
    queryKey: [
      'summoner',
      'info',
      'matchData',
      country,
      name,
      tag,
      matchQueueType,
    ],
    queryFn: () => getSummonerMatchData(puuid, matchQueueType, region),
    enabled: !!summonerInfo,
    staleTime: SUMMONER_DATA_STALE_TIME,
  });

  return {
    summonerMatchData,
    matchQueueType,
    setMatchQueueType,
    isSummonerMatchDataFetching,
    summonerMatchDataError: error?.message,
  };
}
