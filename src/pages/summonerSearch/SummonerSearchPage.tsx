'use client';

import React, { useEffect, useState } from 'react';
import styles from './summonerSearchPage.module.scss';
import classNames from 'classnames/bind';
import getSummonerInfo from 'service/getSummonerInfo';
import getUserInfoFromParams from 'utils/getUserInfoFromParams';
import SummonerSearchSkeleton from './component/skeleton/SummonerSearchSkeleton';
import SummonerInfoContainer from './component/SummonerInfoContainer';
import { SummonerInfo } from 'types/summoner';
import axios from 'axios';
import { RIOT_API_ERROR_MESSAGE } from 'constants/riotApi';
import { RiotAPIErrorResponse } from 'types/riotApi';
import SummonerSearchErrorContainer from './component/SummonerSearchErrorContainer';
import SummonerRankSummary from './component/SummonerRankSummary';
const cn = classNames.bind(styles);

type Props = {
  params: { country: string; summonerName: string };
};

/**
 * 미리 스타일을 지정해둔 라인선택 컴포넌트 입니다.
 * @param {{country : string , summonerName : string}} params - 현재 주소 정보를 받습니다.
 */

export default function SummonerSearchPage({ params }: Props) {
  const [summonerInfo, setSummonerInfo] = useState<SummonerInfo>();
  const [error, setError] = useState<string>();
  const { name, tag, country } = getUserInfoFromParams(params);

  useEffect(() => {
    const updateSummonerInfo = async () => {
      try {
        const summonerInfo = await getSummonerInfo(name, tag, country);
        setSummonerInfo(summonerInfo);
      } catch (err) {
        if (axios.isAxiosError<RiotAPIErrorResponse>(err) && err.response) {
          const { status } = err.response.data;
          const errorMessage = RIOT_API_ERROR_MESSAGE[status.status_code];
          setError(errorMessage);
        }
      }
    };
    updateSummonerInfo();
  }, []);

  if (error) {
    return <SummonerSearchErrorContainer errorMessage={error} />;
  }

  return (
    <main className={cn('main', 'container')}>
      {/* <button onClick={() => setIsFirstLoading((prev) => !prev)}>
        로딩 변경 버튼
      </button> */}
      {summonerInfo && (
        <>
          <SummonerInfoContainer summonerInfo={summonerInfo} />
          <SummonerRankSummary summonerInfo={summonerInfo} />
        </>
      )}
    </main>
  );
}
