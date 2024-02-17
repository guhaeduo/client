'use client';

import React, { useEffect, useState } from 'react';
import styles from './summonerSearchPage.module.scss';
import classNames from 'classnames/bind';
import getSummonerInfo from 'service/getSummonerInfo';
import getUserInfoFromParams from 'hooks/usePathSummonerData';
import usePathSummonerData from 'hooks/usePathSummonerData';
import SummonerSearchSkeleton from './component/skeleton/SummonerSearchSkeleton';
import SummonerInfoContainer from './component/SummonerInfoContainer';
import { SummonerInfo } from 'types/summoner';
import axios from 'axios';
import { RIOT_API_ERROR_MESSAGE } from 'constants/riotApi';
import { RiotAPIErrorResponse } from 'types/riotApi';
import SummonerSearchErrorContainer from './component/SummonerSearchErrorContainer';
import SummonerRankSummaryContainer from './component/SummonerRankSummaryContainer';

const cn = classNames.bind(styles);

export default function SummonerSearchPage() {
  const [summonerInfo, setSummonerInfo] = useState<SummonerInfo>();
  const [error, setError] = useState<string>();
  const { name, tag, country } = usePathSummonerData();

  useEffect(() => {
    const updateSummonerInfo = async () => {
      try {
        const summonerInfo = await getSummonerInfo(name, tag, country);
        setSummonerInfo(summonerInfo);
      } catch (err) {
        if (axios.isAxiosError<RiotAPIErrorResponse>(err) && err.response) {
          const { status } = err.response.data;
          const errorMessage = RIOT_API_ERROR_MESSAGE[status.status_code];
          console.log(errorMessage);
          setError(errorMessage);
        }
      }
    };
    updateSummonerInfo();
  }, [name, tag, country]);

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
          <SummonerRankSummaryContainer summonerInfo={summonerInfo} />
        </>
      )}
    </main>
  );
}
