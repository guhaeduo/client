import { useEffect, useState } from 'react';
import styles from './summonerSearchPage.module.scss';
import classNames from 'classnames/bind';
import SummonerInfoContainer from './summonerInfoContainer/SummonerInfoContainer';
import ErrorComponent from 'components/errorComponent/ErrorComponent';
import SummonerGameSummaryContainer from './summonerGameSummary/SummonerGameSummaryContainer';
import useSummonerInfo from 'hooks/business/useSummonerInfo';
import useSummonerRankInfo from 'hooks/business/useSummonerRankInfo';
import useSummonerGameSummary from 'hooks/business/useSummonerGameSummary';
import usePathSummonerData from 'hooks/usePathSummonerData';
import SummonerInfoContainerSkeleton from './skeleton/SummonerInfoContainerSkeleton';
import SummonerGameSummarySkeleton from './skeleton/SummonerGameSummarySkeleton';
import useSummonerMatchData from 'hooks/business/useSummonerMatchData';
import SummonerMatchListContainerSkeleton from './skeleton/SummonerMatchListContainerSkeleton';
import SummonerMatchListContainer from './summonerMatchListContainer/SummonerMatchListContainer';
import LoadingButton from 'components/loadingButton/LoadingButton';
import { useQueryClient } from '@tanstack/react-query';
const cn = classNames.bind(styles);

export default function SummonerSearchPage() {
  const { country, name, tag } = usePathSummonerData();
  const [firstLoading, setFirstLoading] = useState(false);
  const queryClient = useQueryClient();
  const handleClick = () => {
    const queryKeys = [
      ['summoner', 'info', country, name, tag],
      ['summoner', 'info', 'rankInfo', country, name, tag],
      ['summoner', 'info', 'matchData', country, name, tag],
      ['summoner', 'info', 'gameSummary', country, name, tag],
    ];
    queryKeys.forEach((queryKey) =>
      queryClient.invalidateQueries({
        queryKey,
      }),
    );
  };

  const { summonerInfo, isSummonerInfoFetching, summonerInfoError } =
    useSummonerInfo({
      country,
      name,
      tag,
    });
  const {
    summonerRankInfo,
    isSummonerRankInfoFetching,
    summonerRankInfoError,
  } = useSummonerRankInfo({
    summonerInfo,
    country,
    name,
    tag,
  });
  const {
    summonerGameSummary,
    isSummonerGameSummaryFetching,
    summaryQueueType,
    setSummaryQueueType,
    summonerGameSummaryError,
  } = useSummonerGameSummary({ summonerInfo, country, name, tag });
  const {
    summonerMatchData,
    matchQueueType,
    isSummonerMatchDataFetching,
    setMatchQueueType,
    summonerMatchDataError,
  } = useSummonerMatchData({ summonerInfo, country, name, tag });

  useEffect(() => {
    if (summonerInfo && summonerGameSummary && summonerMatchData) {
      setFirstLoading(true);
    }
  }, [summonerInfo, summonerGameSummary, summonerMatchData]);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    return () => {
      setSummaryQueueType('ALL');
      setMatchQueueType('ALL');
      setFirstLoading(false);
    };
  }, [country, name, tag]);

  const errorMessage =
    summonerInfoError ||
    summonerRankInfoError ||
    summonerGameSummaryError ||
    summonerMatchDataError;

  if (errorMessage && typeof errorMessage === 'string') {
    return <ErrorComponent errorMessage={errorMessage} />;
  }

  const isDataRefetching =
    isSummonerInfoFetching ||
    isSummonerMatchDataFetching ||
    isSummonerGameSummaryFetching ||
    isSummonerRankInfoFetching;

  return (
    <div className={cn('summonerSearch', 'container')}>
      {summonerInfo && summonerRankInfo && firstLoading ? (
        <SummonerInfoContainer
          summonerInfo={summonerInfo}
          summonerRankInfo={summonerRankInfo}
        />
      ) : (
        <SummonerInfoContainerSkeleton />
      )}
      {firstLoading && (
        <LoadingButton
          name={`${country}_${name}_${tag}`}
          onClickHandler={handleClick}
          className={cn('summonerDataRefetchButton')}
          isFetching={isDataRefetching}
          clickLimitTime={120}
        >
          전적 갱신
        </LoadingButton>
      )}
      {summonerGameSummary && firstLoading ? (
        <SummonerGameSummaryContainer
          summonerGameSummary={summonerGameSummary}
          summaryQueueType={summaryQueueType}
          setSummaryQueueType={setSummaryQueueType}
        />
      ) : (
        <SummonerGameSummarySkeleton
          summaryQueueType={summaryQueueType}
          setSummaryQueueType={setSummaryQueueType}
        />
      )}
      {summonerMatchData && firstLoading ? (
        <SummonerMatchListContainer
          summonerMatchData={summonerMatchData}
          matchQueueType={matchQueueType}
          setMatchQueueType={setMatchQueueType}
        />
      ) : (
        <SummonerMatchListContainerSkeleton
          matchQueueType={matchQueueType}
          setMatchQueueType={setMatchQueueType}
        />
      )}
    </div>
  );
}
