import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getSummonerGameSummary from 'service/getSummonerGameSummary';
import {
  SummonerInfo,
  SummonerGameSummary,
  SummaryQueueType,
} from 'types/summoner';
import { SUMMONER_DATA_STALE_TIME } from 'constants/api';

type Props = {
  summonerInfo: SummonerInfo | undefined;
  country: string;
  name: string;
  tag: string;
};

/**
 * 소환사 전적 요약 데이터와 관련된 데이터를 반환하는 훅입니다.
 * @param {SummonerInfo | undefined} summonerInfo - 소환사 정보
 * @param {string} country - 소환사 검색 국가
 * @param {string} name - 소환사 이름
 * @param {string} tag - 소환사 태그
 *
 * @return {SummonerGameSummary | undefined} summonerGameSummary - 소환사 전적 요약 데이터
 * @return {SummaryQueueType} summaryQueueType - 소환사 전적 검색 게임 타입 필터 옵션
 * @return {Dispatch<SetStateAction<SummaryQueueType>>} setSummaryQueueType - 소환사 전적 검색 게임 타입 필터 옵션 변경 함수
 * @return {boolean} isSummonerGameSummaryFetching - 소환사 전적 검색 패칭 여부
 * @return {string | undefined} summonerGameSummaryError - 소환사 전적 검색 에러
 */

export default function useSummonerGameSummary({
  summonerInfo,
  country,
  name,
  tag,
}: Props) {
  // 소환사 전적 요약 게임 타입 상태입니다.
  const [summaryQueueType, setSummaryQueueType] =
    useState<SummaryQueueType>('ALL');
  // 소환사의 puuid를 변수로 저장합니다.
  const puuid = summonerInfo?.puuid || '';
  // 소환사의 대륙을 변수로 저장합니다.
  const region = summonerInfo?.region || '';

  // 소환사 정보와 필터 옵션을 기반으로 소환사 게임 요약 데이터를 받아옵니다.
  const {
    data: summonerGameSummary,
    error,
    isFetching: isSummonerGameSummaryFetching,
  } = useQuery<SummonerGameSummary>({
    queryKey: [
      'summoner',
      'info',
      'gameSummary',
      country,
      name,
      tag,
      summaryQueueType,
    ],
    queryFn: () => getSummonerGameSummary(puuid, summaryQueueType, region),
    enabled: !!summonerInfo,
    staleTime: SUMMONER_DATA_STALE_TIME,
  });

  return {
    summonerGameSummary,
    summaryQueueType,
    setSummaryQueueType,
    isSummonerGameSummaryFetching,
    summonerGameSummaryError: error?.message,
  };
}
