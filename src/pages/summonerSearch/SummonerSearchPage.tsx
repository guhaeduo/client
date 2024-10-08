import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import ErrorComponent from 'components/common/errorComponent/ErrorComponent';
import useSummonerInfo from 'hooks/business/useSummonerInfo';
import useSummonerRankInfo from 'hooks/business/useSummonerRankInfo';
import useSummonerGameSummary from 'hooks/business/useSummonerGameSummary';
import usePathSummonerData from 'hooks/usePathSummonerData';
import useSummonerMatchData from 'hooks/business/useSummonerMatchData';
import LoadingButton from 'pages/summonerSearch/components/loadingButton/LoadingButton';
import { useQueryClient } from '@tanstack/react-query';
import SEOMeta from 'components/SEOMeta';
import SEO_DATA from 'constants/seoData';
import SummonerMatchListContainer from './summonerMatchListContainer/SummonerMatchListContainer';
import SummonerMatchListContainerSkeleton from './skeleton/SummonerMatchListContainerSkeleton';
import SummonerGameSummarySkeleton from './skeleton/SummonerGameSummarySkeleton';
import SummonerInfoContainerSkeleton from './skeleton/SummonerInfoContainerSkeleton';
import SummonerGameSummaryContainer from './summonerGameSummary/SummonerGameSummaryContainer';
import SummonerInfoContainer from './summonerInfoContainer/SummonerInfoContainer';
import styles from './summonerSearchPage.module.scss';

const cn = classNames.bind(styles);

export default function SummonerSearchPage() {
  const { country, name, tag } = usePathSummonerData();
  const [firstLoading, setFirstLoading] = useState(true);
  const queryClient = useQueryClient();
  const seoTitle = `${name}#${tag} - 게임 전적`;

  const onUpdateClickHandler = () => {
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
      setFirstLoading(false);
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
      setFirstLoading(true);
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
    <>
      <SEOMeta pageData={{ ...SEO_DATA.summonerSearch, title: seoTitle }} />
      <div className={cn('summonerSearch', 'container')}>
        {summonerInfo && summonerRankInfo && !firstLoading ? (
          <SummonerInfoContainer
            summonerInfo={summonerInfo}
            summonerRankInfo={summonerRankInfo}
          />
        ) : (
          <SummonerInfoContainerSkeleton />
        )}
        {!firstLoading && (
          <LoadingButton
            name={`${country}_${name}_${tag}`}
            onClickHandler={onUpdateClickHandler}
            className={cn('summonerDataRefetchButton')}
            isFetching={isDataRefetching}
            clickLimitTime={120}
          >
            전적 갱신
          </LoadingButton>
        )}
        {summonerGameSummary && !firstLoading ? (
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
        {summonerMatchData && !firstLoading ? (
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
    </>
  );
}
