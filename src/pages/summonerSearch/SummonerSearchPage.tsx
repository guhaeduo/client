import { useEffect } from 'react';
import styles from './summonerSearchPage.module.scss';
import classNames from 'classnames/bind';
import SummonerInfoContainer from './summonerInfoContainer/SummonerInfoContainer';
import SummonerSearchErrorContainer from './summonerSearchErrorContainer/SummonerSearchErrorContainer';
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
const cn = classNames.bind(styles);

export default function SummonerSearchPage() {
  const { country, name, tag } = usePathSummonerData();
  const { summonerInfo, summonerInfoError } = useSummonerInfo({
    country,
    name,
    tag,
  });
  const { summonerRankInfo, summonerRankInfoError } = useSummonerRankInfo({
    summonerInfo,
    country,
    name,
    tag,
  });
  const {
    summonerGameSummary,
    summaryQueueType,
    setSummaryQueueType,
    summonerGameSummaryError,
  } = useSummonerGameSummary({ summonerInfo, country, name, tag });
  const {
    summonerMatchData,
    matchQueueType,
    setMatchQueueType,
    summonerMatchDataError,
  } = useSummonerMatchData({ summonerInfo, country, name, tag });

  useEffect(() => {
    return () => setSummaryQueueType('ALL');
  }, [country, name, tag]);

  const errorMessage =
    summonerInfoError ||
    summonerRankInfoError ||
    summonerGameSummaryError ||
    summonerMatchDataError;
  if (errorMessage && typeof errorMessage === 'string') {
    return <SummonerSearchErrorContainer errorMessage={errorMessage} />;
  }

  return (
    <main className={cn('main', 'container')}>
      {summonerInfo && summonerRankInfo ? (
        <SummonerInfoContainer
          summonerInfo={summonerInfo}
          summonerRankInfo={summonerRankInfo}
        />
      ) : (
        <SummonerInfoContainerSkeleton />
      )}
      {summonerGameSummary ? (
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
      {summonerMatchData ? (
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
    </main>
  );
}
