import { useState, useEffect } from 'react';
import styles from './summonerSearchPage.module.scss';
import classNames from 'classnames/bind';
import SummonerInfoContainer from './component/summonerInfoContainer/SummonerInfoContainer';
import SummonerSearchErrorContainer from './component/summonerSearchErrorContainer/SummonerSearchErrorContainer';
import SummonerGameSummaryContainer from './component/summonerGameSummary/SummonerGameSummaryContainer';
import useSummonerInfo from 'hooks/business/useSummonerInfo';
import useSummonerRankInfo from 'hooks/business/useSummonerRankInfo';
import useSummonerGameSummary from 'hooks/business/useSummonerGameSummary';
import { useParams } from 'react-router-dom';
import SummonerInfoContainerSkeleton from './component/skeleton/SummonerInfoContainerSkeleton';
import SummonerGameSummarySkeleton from './component/skeleton/SummonerGameSummarySkeleton';
const cn = classNames.bind(styles);

export default function SummonerSearchPage() {
  const { country, summonerName } = useParams();
  const [error, setError] = useState<string>();
  const errorHandler = (err: string) => setError(err);
  const { summonerInfo, isSummonerInfoLoading } = useSummonerInfo({
    errorHandler,
  });
  console.log(summonerInfo);
  const { summonerRankInfo, isSummonerRankInfoLoading } = useSummonerRankInfo({
    errorHandler,
    summonerInfo,
  });
  const {
    summonerGameSummary,
    isSummonerGameSummaryLoading,
    summaryQueueType,
    setSummaryQueueType,
  } = useSummonerGameSummary({ errorHandler, summonerInfo });

  useEffect(() => {
    setError('');
    console.log(country);
    return () => setSummaryQueueType('ALL');
  }, [country, summonerName]);

  if (error) {
    return <SummonerSearchErrorContainer errorMessage={error} />;
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
          isSummonerGameSummaryLoading={isSummonerGameSummaryLoading}
          summaryQueueType={summaryQueueType}
          setSummaryQueueType={setSummaryQueueType}
        />
      ) : (
        <SummonerGameSummarySkeleton
          summaryQueueType={summaryQueueType}
          setSummaryQueueType={setSummaryQueueType}
        />
      )}
    </main>
  );
}
