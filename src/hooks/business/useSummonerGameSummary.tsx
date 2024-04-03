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
 * 소환사 전적 요약을 가져오는 훅입니다.
 * @param {SummonerInfo | undefined} summonerInfo - 소환사 정보입니다.
 * @param {string} country - 소환사 검색 국가입니다.
 * @param {string} name - 소환사 이름입니다.
 * @param {string} tag - 소환사 태그입니다.
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

  const {
    data: summonerGameSummary,
    isLoading: isSummonerGameSummaryLoading,
    error: summonerGameSummaryError,
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
    isSummonerGameSummaryLoading,
    summaryQueueType,
    setSummaryQueueType,
    isSummonerGameSummaryFetching,
    summonerGameSummaryError,
  };
}
